import React from "react";
import styled from "styled-components";
import { AiFillPlayCircle, AiFillHeart } from "react-icons/ai";
import { BiRepost, BiPlay } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { MdChatBubble } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { setNowTrack } from "../redux/action/actionNowTrack";
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
    grid-template-columns: 25px 1fr;
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
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
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
            <button className="track-info-update-button">
              <AiFillHeart />
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
