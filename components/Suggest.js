import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import styled from "styled-components";
import { FaPlayCircle } from "react-icons/fa";
import firebase from "@firebase/app-compat";
import { useSelector, useDispatch } from "react-redux";
import { setNowTrack } from "../redux/action/actionNowTrack";

const Slide = styled.div`
  margin-bottom: 25px;
  border-bottom: 1px solid var(--color-input-background);

  .title {
    font-size: 25px;
    color: black;
    font-weight: 400;
    margin: 0 0 8px 0;
  }
  .subtitle {
    font-size: 15px;
    color: black;
    font-weight: 400;
    margin: 0 0 15px 0;
    opacity: 0.5;
  }

  .swiper-button-prev {
    border: 1px solid var(--color-input-color);
    width: 30px;
    height: 30px;
    background-color: white;
    border-radius: 5px;
    left: 0;
  }

  .swiper-button-next {
    border: 1px solid var(--color-input-color);
    width: 30px;
    height: 30px;
    background-color: white;
    border-radius: 5px;
    right: 0;
  }

  .swiper-button-prev:after {
    content: "prev";
    font-size: 15px;
    color: var(--color-logo);
    font-weight: 300;
  }

  .swiper-button-next:after {
    content: "next";
    font-size: 15px;
    color: var(--color-logo);
    font-weight: 300;
  }

  .swiper-button-next.swiper-button-disabled,
  .swiper-button-prev.swiper-button-disabled {
    opacity: 0;
    cursor: auto;
    pointer-events: none;
    display: none;
  }

  .swiper-horizontal > .swiper-pagination-bullets,
  .swiper-pagination-bullets.swiper-pagination-horizontal,
  .swiper-pagination-custom,
  .swiper-pagination-fraction {
    bottom: 10px;
    left: 0;
    width: 100%;
    opacity: 0.3;
  }
  .swiper-pagination-bullet-active {
    background-color: var(--color-logo);
  }
`;

const Track = styled.div`
  padding-left: 1px;
  display: grid;
  grid-template-rows: 180px 1fr;
  width: 100%;
  .track-image {
    width: 180px;
    height: 180px;
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 10%);
    background-image: ${(props) => `url(${props.img})`};
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .track-popup-playButton {
    padding: 0;
    font-size: 35px;
    color: var(--color-logo);
    border: none;
    background-color: transparent;
    position: relative;
  }

  .make-white {
    position: absolute;
    width: 35px;
    height: 35px;
    top: 0;
    left: 0;
    background-color: white;
  }

  .track-popup-Buttons {
    position: absolute;
    bottom: 0;
    height: 50px;
    width: 100%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.4), transparent);
  }

  .track-title {
    font-size: 15px;
    color: black;
    font-weight: 400;
    margin: 8px 0 4px 0;
  }
  .track-category {
    font-size: 5px;
    font-weight: 700;
    opacity: 0.5;
    margin: 0;
  }
`;

function Suggest({ title, subtitle, category, data }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const usersRef = firebase.database().ref("users");
  const tracksRef = firebase.database().ref("tracks");
  // currentUserRef
  //       .child("playList")
  //       .child(`${data.title}`)
  //       .set({
  //         user: seletedUser.name,
  //         image: data.img,
  //         audio: data.audio,
  //         time: parseInt(
  //           `${today.getFullYear()}${
  //             today.getMonth() + 1 < 10
  //               ? "0" + (today.getMonth() + 1)
  //               : today.getMonth() + 1
  //           }${today.getDate() < 10 ? "0" + today.getDate() : today.getDate()}${
  //             today.getHours() < 10 ? "0" + today.getHours() : today.getHours()
  //           }${
  //             today.getMinutes() < 10
  //               ? "0" + today.getMinutes()
  //               : today.getMinutes()
  //           }${
  //             today.getSeconds() < 10
  //               ? "0" + today.getSeconds()
  //               : today.getSeconds()
  //           }`
  //         ),
  //       });
  const setPlay = async ({ user, title, time, gerne, image, audio }) => {
    dispatch(setNowTrack(audio));
    console.log(user, title, time, gerne, image, audio);
    try {
      await usersRef
        .child(`${user}`)
        .child("tracks")
        .child(`${title}`)
        .child("play")
        .push()
        .set({ listener: user, time });
      await tracksRef
        .child(gerne)
        .child(title)
        .child("play")
        .push()
        .set({ listener: user, time });
      await usersRef
        .child(currentUser.displayName)
        .child("playList")
        .child(title)
        .set({
          user,
          image,
          audio,
          time,
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getNowTime = () => {
    let today = new Date();
    return parseInt(
      `${today.getFullYear()}${
        today.getMonth() + 1 < 10
          ? "0" + (today.getMonth() + 1)
          : today.getMonth() + 1
      }${today.getDate() < 10 ? "0" + today.getDate() : today.getDate()}${
        today.getHours() < 10 ? "0" + today.getHours() : today.getHours()
      }${
        today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()
      }${
        today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds()
      }`
    );
  };

  return data ? (
    <Slide>
      <h2 className="title">{title}</h2>
      <h4 className="subtitle">{subtitle}</h4>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={4}
        navigation
        //   scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        style={{ marginBottom: 48 }}
      >
        {Object.entries(data).map(([key, value]) => (
          <SwiperSlide key={key}>
            <Track img={value.img}>
              <div className="track-image">
                <button
                  className="track-popup-playButton"
                  onClick={() => {
                    setPlay({
                      user: value.user,
                      title: value.title,
                      time: getNowTime(),
                      gerne: value.gerne,
                      image: value.img,
                      audio: value.audio,
                    });
                  }}
                >
                  <FaPlayCircle
                    style={{
                      backgroundColor: "white",
                      borderRadius: "100%",
                      width: 35,
                      height: 35,
                      boxShadow: "0 0 10px var(--color-logo)",
                    }}
                  />
                </button>
              </div>
              <h2 className="track-title">
                {value.title.length > 20
                  ? value.title.substring(0, 20) + "..."
                  : value.title}
              </h2>
              <h4 className="track-category">{category}</h4>
            </Track>
          </SwiperSlide>
        ))}
      </Swiper>
    </Slide>
  ) : (
    <div>Loading</div>
  );
}

export default Suggest;
