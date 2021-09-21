import React, { useCallback, useState } from "react";
import Index from ".";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { AiFillPicture } from "react-icons/ai";

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

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setTracks({ audio: acceptedFiles });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Index
      component={
        track ? (
          <Set>
            <div className="box">
              <div className="set-make-center">
                <SetImg>
                  <button className="set-button">
                    <AiFillPicture style={{ marginRight: "5px" }} />
                    Upload Image
                  </button>
                </SetImg>
              </div>
            </div>
          </Set>
        ) : (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Container>
              <div className="box">
                {isDragActive ? (
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
