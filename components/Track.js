import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiFillPlayCircle, AiFillHeart } from "react-icons/ai";
import { BiRepost, BiPlay } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { MdChatBubble } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { setNowTrack } from "../redux/action/actionNowTrack";
import { setSelectedUser, setUser } from "../redux/action/actionUser";
import firebase from "../firebase";
const Container = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  height: 200px;
  width: 100%;
  .track-pic {
    width: 150px;
    height: 150px;
  }
  .track-info {
    width: 100%;
    padding: 10px;
    display: grid;
    grid-template-rows: 50px 1fr;
  }
  .track-info-title {
    display: grid;
    grid-template-columns: 50px 0.7fr 0.3fr;
    column-gap: 5px;
  }
  .track-info-title-playBtn {
    font-size: 45px;
    color: var(--color-logo);
    border: none;
    background-color: transparent;
    padding: 0;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
  }
  .track-info-title-name {
    color: var(--color-nav-border);
  }
  .track-info-title-time {
    display: flex;
    justify-content: flex-end;
    color: var(--color-nav-border);
    opacity: 0.6;
  }

  .track-info-update {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 25px;
  }

  .track-info-update-buttons {
    display: grid;
    grid-template-columns: 50px 50px 50px 50px;
    column-gap: 10px;
    height: 100%;
  }

  .track-info-update-button {
    font-size: 12px;
    color: black;
    border: 1px solid var(--color-nav-border);
    border-radius: 2.5px;
    padding: 0;
    background-color: white;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .track-info-update-readonly {
    color: var(--color-input-color);
    font-size: 5px;
    display: flex;
  }

  .track-info-update-readonly-button {
    border: none;
    background-color: transparent;
    margin-left: 5px;
    font-size: 20px;
    padding: 0;
  }

  .track-chat-grid {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  .track-chat {
    width: 100%;
    border: 1px solid var(--color-nav-border);
    height: 40px;
    padding: 5px;
    display: grid;
    grid-template-columns: 28px 1fr;
    background-color: var(--color-input-background);
    border-radius: 5px;
  }
  .track-chat-input {
    height: 100%;
    width: 100%;
    background-color: white;
    color: black;
    font-size: 15px;
    padding: 5px;
    border: none;
  }
`;

const TrackPic = styled.div`
  background-image: ${(props) => `url(${props.url})`};
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
`;

function Track({ title, value }) {
  useEffect(() => {
    usersListener();
  }, []);
  console.log(value.likes);
  const [liked, setLiked] = useState();

  const currentUser = useSelector((state) => state.user.currentUser);
  const seletedUser = useSelector((state) => state.user.seletedUser);
  const dispatch = useDispatch();

  const userRef = firebase
    .database()
    .ref("users")
    .child(`${value.user}`)
    .child("tracks")
    .child(`${value.title}`);

  const currentUserRef = firebase
    .database()
    .ref("users")
    .child(`${currentUser.displayName}`);

  const usersListener = () => {
    userRef.child("likes").on("value", async (dataSnapshot) => {
      await firebase
        .database()
        .ref("users")
        .child(`${seletedUser.name}`)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            dispatch(setSelectedUser(snapshot.val()));
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });

      await currentUserRef
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            // dispatch(setUser(snapshot.val()));
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });

      //   dispatch(setUser(user));
    });
  };

  const tracksRef = firebase
    .database()
    .ref("tracks")
    .child(`${value.gerne}`)
    .child(`${value.title}`);

  const setLikes = async () => {
    let status = checkLike(value.likes);

    try {
      if (status) {
        //delete user's track likes
        await userRef
          .child("likes")
          .child(`${currentUser.displayName}`)
          .remove();
        await tracksRef
          .child("likes")
          .child(`${currentUser.displayName}`)
          .remove();
      } else {
        //adding user's track likes
        await userRef
          .child("likes")
          .child(`${currentUser.displayName}`)
          .set({ uid: currentUser.uid, img: currentUser.photoURL });

        //adding track's likes
        await tracksRef
          .child("likes")
          .child(`${currentUser.displayName}`)
          .set({ uid: currentUser.uid, img: currentUser.photoURL });
      }
    } catch (e) {
      console.log(e);
    }
    // console.log(value.user);
  };

  const checkLike = (likesList) => {
    console.log(likesList);
    for (const [key, value] of Object.entries(likesList)) {
      if (key == currentUser.displayName) {
        setLiked(true);
        return true;
      }
    }
    setLiked(false);
    return false;
  };

  return (
    <Container>
      <div className="track-pic ">
        <TrackPic url={value.img} />
      </div>
      <div className="track-info">
        <div className="track-info-title ">
          <button
            className="track-info-title-playBtn "
            onClick={() => {
              dispatch(setNowTrack(value.audio));
            }}
          >
            <AiFillPlayCircle />
          </button>
          <div className="track-info-title-name">
            <h5 style={{ fontSize: "8px", margin: "0 0 5px 0 " }}>
              {value.user}
            </h5>
            <strong style={{ color: "black", fontWeight: "400", fontSize: 17 }}>
              <span>{value.title}</span>
            </strong>
          </div>
          <div className="track-info-title-time ">
            <span>{/* time */}</span>
          </div>
        </div>
        <div className="track-chat-grid">
          <div className="track-chat">
            <TrackPic url={currentUser.photoURL} />
            <input className="track-chat-input" />
          </div>
        </div>
        <div className="track-info-update">
          <div className="track-info-update-buttons">
            <button
              className="track-info-update-button"
              onClick={setLikes}
              style={{
                border: `1px solid ${
                  liked && liked
                    ? "var(--color-nav-border)"
                    : "var(--color-logo)"
                }`,
                color: ` ${liked && liked ? "black" : "var(--color-logo)"}`,
              }}
            >
              <AiFillHeart />
              {value.likes ? Object.keys(value.likes).length : 0}
            </button>
            <button className="track-info-update-button">
              <BiRepost />
            </button>
            <button className="track-info-update-button">
              <BsThreeDots />
            </button>
          </div>
          <div className="track-info-update-readonly">
            <span style={{ marginRight: 3, fontSize: "20px" }}>
              <BiPlay />
              3,941
            </span>
            <button
              className="track-info-update-readonly-button"
              style={{ marginRight: 3 }}
            >
              <MdChatBubble />
              28
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Track;
