import React from "react";
import styled from "styled-components";
import { IoIosPeople } from "react-icons/io";
import { GiSoundWaves } from "react-icons/gi";
import { BsFillPersonCheckFill, BsPersonPlusFill } from "react-icons/bs";

const Container = styled.div`
  display: grid;
  grid-template-columns: 60px 0.7fr 0.3fr;

  height: 100%;
  min-height: 60px;
  width: 100%;
  .user-img {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    background-image: ${(props) => `url(${props.img})`};
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 10%);
  }

  .user-contents-anchors {
    padding-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .user-contents-anchors-user {
    color: #333333;
    font-size: 20px;
    font-weight: 500;
  }

  .user-contents-anchors-FT {
    display: flex;
    align-items: center;
  }
  .user-contents-anchors-FT-one {
    margin-right: 15px;
    display: flex;
    align-items: center;
  }
  .user-contents-buttons {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    width: 20;
  }
  .user-contents-button {
    width: 100%;
    font-size: 11px;
    padding: 2px 9px 2px 8px;
    height: 22px;
    line-height: 16px;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    background-color: #fff;
  }
`;

function UserInfo({ data }) {
  const following = true;
  console.log(data);

  return (
    <Container img={data.value.image}>
      <div className="user-img" />
      <div className="user-contents-anchors">
        <div className="user-contents-anchors-user">
          <span>{data.value.name} </span>
        </div>
        <div className="user-contents-anchors-FT ">
          <div className="user-contents-anchors-FT-one ">
            <IoIosPeople style={{ marginRight: 7 }} />
            {data.value.follow ? Object.keys(data.value.follow).length : 0}
          </div>
          <div className="user-contents-anchors-FT-one ">
            <GiSoundWaves style={{ marginRight: 7 }} />
            {data.value.tracks ? Object.keys(data.value.tracks).length : 0}
          </div>
        </div>
      </div>
      <div className="user-contents-buttons">
        <button
          className="button "
          // onClick={setFollow}
          style={{
            borderColor:
              following && following ? "var(--color-logo)" : "transparent",
            backgroundColor:
              following && following ? "white" : "var(--color-logo)",
            color: following && following ? "var(--color-logo)" : "white",
            fontSize: "10px",
          }}
        >
          {following && following ? (
            <>
              <BsFillPersonCheckFill style={{ marginRight: 5 }} />
              Following
            </>
          ) : (
            <>
              <BsPersonPlusFill style={{ marginRight: 5 }} />
              Follow
            </>
          )}
        </button>
      </div>
    </Container>
  );
}

export default UserInfo;
