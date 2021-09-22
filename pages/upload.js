import React, { useCallback, useState, useEffect, useRef } from "react";
import Index from ".";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { AiFillPicture, AiOutlineCheck } from "react-icons/ai";
import { ImWarning } from "react-icons/im";
import { useSelector } from "react-redux";
import mime from "mime-types";
import firebase from "../firebase";
import createHash from "hash-generator";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 50px);
  width: 100%;
  .box {
    width: 800px;
    height: 500px;
    box-shadow: 0 2px 12px -5px rgb(0 0 0 / 10%);
    border: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }
  .upload-button {
    padding: 15px 30px;
    border-radius: 5px;
    background-color: var(--color-logo);
    font-size: 25px;
    color: white;
    border: none;
  }
  .title {
    font-size: 30px;
    color: black;
  }
  .drop {
    border: 5px dashed var(--color-border);
    width: 700px;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Set = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 50px);
  width: 100%;

  .img-set {
    display: none;
  }

  .box {
    width: 800px;
    height: 500px;
    box-shadow: 0 2px 12px -5px rgb(0 0 0 / 10%);
    border: 1px solid var(--color-border);
    display: grid;
    grid-template-columns: 30% 70%;
    overflow-y: scroll;
  }

  .set-make-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
  }
  .set-section {
    margin-bottom: 10px;
    width: 100%;
  }
  .set-label {
    font-size: 15px;
    font-weight: 500;
    color: black;
    display: block;
  }

  .set-input {
    border-radius: 5px;
    border: 1px solid var(--color-nav-border);
    margin-top: 5px;
    font-size: 15px;
    padding: 5px;
    height: 35px;
  }

  .set-input-normal {
    width: 95%;
  }
  .set-input-textarea {
    height: 100px;
  }

  .set-confirm {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 100px;
    padding: 20px;
  }

  .set-confirm-status {
    font-size: 15px;
    color: black;
    display: flex;
    align-items: center;
  }
`;

const SetConfirmBtn = styled.button`
  width: 50px;
  height: 30px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.positive ? "var(--color-logo)" : "transparent"};
  color: ${(props) => (props.positive ? "white" : "black")};
  font-size: 5px;
  padding: 0;
  border: none;
  opacity: ${(props) => (props.status ? 1 : 0.5)};
`;

const SetImg = styled.div`
  width: 190px;
  height: 190px;
  background-color: ${(props) => !props.src && "lightgray"};
  background-image: ${(props) => props.src && `url(${props.src})`};
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  .set-button {
    padding: 5px 6px;
    border-radius: 5px;
    background-color: gray;
    font-size: 10px;
    color: white;
    border: none;
    margin-bottom: 20px;
  }
`;

function Upload() {
  const [track, setTracks] = useState();
  const [trackHash, setTrackHash] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [storage, setStorage] = useState();
  useEffect(() => {
    if (
      track &&
      track.audio &&
      track.title &&
      track.gerne &&
      track.additional &&
      track.description &&
      track.privacy &&
      track.img
    ) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [track]);
  // useEffect(() => {

  // }, []);

  const gerne = useSelector((state) => state.source && state.source.gerne);
  const user = useSelector((state) => state.user.currentUser);

  const imgSet = useRef();
  const userRef = firebase.database().ref("users");
  const trackRef = firebase.database().ref("tracks");

  const router = useRouter();

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const metadata = { contentType: mime.lookup(file.name) };
    const hash = createHash(10);
    console.log(hash);
    setTrackHash(hash);
    try {
      setLoading(true);
      let uploadTaskSnapShot = await firebase
        .storage()
        .ref("user")
        .child(`${user.uid}`)
        .child(`${hash}/track`)
        .put(file, metadata);
      uploadTaskSnapShot &&
        setStorage(
          firebase
            .storage()
            .ref("user")
            .child(`${user.uid}`)
            .child(`${hash}/track`)
        );

      let downloadURL = await uploadTaskSnapShot.ref.getDownloadURL();
      setTracks({
        audio: downloadURL,
        title: acceptedFiles[0].name,
        gerne: "",
        additional: "",
        description: "",
        privacy: "",
        img: "",
        user: user.uid,
        key: hash,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const changeHandler = (e) => {
    setTracks((prevstate) => {
      return { ...prevstate, [e.target.name]: e.target.value };
    });
  };

  const imageSetHandler = async (e) => {
    const file = e.target.files[0];
    const metadata = { contentType: mime.lookup(file.name) };

    try {
      let uploadTaskSnapShot = await firebase
        .storage()
        .ref("user")
        .child(`${user.uid}`)
        .child(`${trackHash}/img`)
        .put(file, metadata);

      let downloadURL = await uploadTaskSnapShot.ref.getDownloadURL();
      setImage(downloadURL);
      setTracks((prevState) => {
        return { ...prevState, img: downloadURL };
      });
    } catch (e) {
      console.log(e);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // await firebase.database().ref("users").child(createdUser.user.uid).set({
      //   name: createdUser.user.displayName,
      //   image: createdUser.user.photoURL,
      // });
      userRef
        .child(`${user.displayName}/tracks`)
        .child(`${track.title}`)
        .set(track);
      trackRef.child(`${track.gerne}`).child(`${track.title}`).set(track);
      router.push(`/${user.displayName}`);
    } catch (e) {
      console.log(e);
    }
  };

  const cancleHandler = async () => {
    storage
      .delete()
      .then(function () {
        // File deleted successfully
        console.log("File deleted successfully");
      })
      .catch(function (error) {
        // Uh-oh, an error occurred!
        console.log("Uh-oh, an error occurred!");
      });

    setTracks(undefined);
  };

  return (
    <Index
      component={
        track ? (
          <Set>
            <div className="box">
              <div className="set-make-center">
                <SetImg src={image && image}>
                  <input
                    type="file"
                    className="img-set"
                    ref={imgSet}
                    onChange={imageSetHandler}
                  />
                  <button
                    className="set-button"
                    onClick={() => imgSet.current.click()}
                  >
                    <AiFillPicture style={{ marginRight: "5px" }} />
                    Upload Image
                  </button>
                </SetImg>
              </div>
              <form
                className="set-make-center"
                style={{ alignItems: "flex-start" }}
                id="myForm"
              >
                <div className="set-section">
                  <label className="set-label">Title</label>
                  <input
                    type="text"
                    className="set-input set-input-normal"
                    value={track.title}
                    name="title"
                    onChange={changeHandler}
                  ></input>
                </div>
                <div className="set-section">
                  <label className="set-label">Gerne</label>
                  <select
                    form="myForm"
                    className="set-input set-input-normal"
                    name="gerne"
                    onChange={changeHandler}
                  >
                    {gerne &&
                      gerne.map((e, idx) => (
                        <option key={idx} value={e == null ? "None" : e}>
                          {e == null ? "None" : e}
                        </option>
                      ))}
                    {/* <option value="americano"></option> */}
                  </select>
                </div>
                <div className="set-section">
                  <label className="set-label">Additional tags</label>
                  <input
                    type="text"
                    className="set-input set-input-normal"
                    name="additional"
                    onChange={changeHandler}
                  ></input>
                </div>
                <div className="set-section">
                  <label className="set-label">Description</label>
                  <textarea
                    type="text"
                    className="set-input set-input-normal set-input-textarea"
                    name="description"
                    onChange={changeHandler}
                  ></textarea>
                </div>
                <div className="set-section">
                  <label className="set-label">Privacy</label>
                  <input
                    type="radio"
                    name="privacy"
                    value="private"
                    onChange={changeHandler}
                  />
                  private
                  <br />
                  <input
                    type="radio"
                    name="privacy"
                    value="public"
                    onChange={changeHandler}
                  />
                  public
                  <br />
                </div>
              </form>
              <div
                className="set-confirm"
                style={{ justifyContent: "flex-start" }}
              >
                <span className="set-confirm-status">
                  {status ? (
                    <>
                      <AiOutlineCheck
                        style={{ marginRight: 10, color: "green" }}
                      />
                      ok! you can do that shit.
                    </>
                  ) : (
                    <>
                      <ImWarning style={{ marginRight: 10, color: "red" }} />
                      Required fields
                    </>
                  )}
                </span>
              </div>
              <div className="set-confirm">
                <SetConfirmBtn
                  positive={false}
                  status={true}
                  onClick={cancleHandler}
                >
                  Cancle
                </SetConfirmBtn>

                <SetConfirmBtn
                  positive={true}
                  status={status}
                  disabled={!status}
                  onClick={submitHandler}
                >
                  Save
                </SetConfirmBtn>
              </div>
            </div>
          </Set>
        ) : (
          <div {...getRootProps()}>
            <input {...getInputProps()} disabled={loading} />
            <Container>
              <div className="box">
                {loading ? (
                  <Set>
                    <div className="box">
                      <div className="set-make-center">
                        <SetImg src={image && image}>
                          <Skeleton />
                        </SetImg>
                      </div>
                      <form
                        className="set-make-center"
                        style={{ alignItems: "flex-start" }}
                        id="myForm"
                      >
                        <div className="set-section">
                          <Skeleton style={{ width: "95%" }} />
                        </div>
                        <div className="set-section">
                          <Skeleton style={{ width: "95%" }} />
                        </div>
                        <div className="set-section">
                          <Skeleton style={{ width: "95%" }} />
                        </div>
                        <div className="set-section">
                          <Skeleton style={{ width: "95%" }} />
                        </div>
                        <div className="set-section">
                          <Skeleton style={{ width: "95%" }} />
                        </div>
                      </form>
                    </div>
                  </Set>
                ) : isDragActive ? (
                  <div className="drop">
                    <h3 className="title">Drop it bitch</h3>
                  </div>
                ) : (
                  <>
                    <h3 className="title">
                      Drag and drop your tracks & albums here
                    </h3>
                    <button className="upload-button">
                      or choose files to upload
                    </button>
                  </>
                )}
              </div>
            </Container>
            )
          </div>
        )
      }
    ></Index>
  );
}
export default Upload;
