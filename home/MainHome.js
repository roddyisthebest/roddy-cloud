import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Suggest from "../components/Suggest";
import { useSelector } from "react-redux";
import firebase from "../firebase";

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 60px);
  padding: 0 30px;
  .main-contents {
    padding: 30px 30px 0 0;
    margin: 0 330px 0 0;
  }
  .sub {
    position: absoulte;
    bottom: 0;
    right: 0;
  }
  .sub-contents {
  }
  .sub-fixed {
    position: fixed;
  }
`;

function MainHome() {
  const [user, setUser] = useState();
  const [allTrack, setAllTrack] = useState();
  const [playedTrack, setPlayedTrack] = useState();
  const currentUser = useSelector((state) => state.user.currentUser);
  const usersRef = firebase.database().ref("users");
  const trackRef = firebase.database().ref("tracks");

  useEffect(async () => {
    if (currentUser) {
      await usersRef
        .child(`${currentUser.displayName}`)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUser(snapshot.val());
          } else {
            console.log("No data available");
          }
        });
    }
  }, [currentUser]);

  useEffect(async () => {
    await trackRef.get().then((snapshot) => {
      if (snapshot.exists()) {
        setAllTrack(snapshot.val());
      } else {
        console.log("No data available");
      }
    });
  }, []);

  useEffect(() => {
    allTrack && getPopular(allTrack);
  }, [allTrack]);

  const getPopular = (tracks) => {
    const playedTrack = [];
    Object.entries(tracks).map(([key, value]) => {
      Object.entries(value).map(([key, value]) => {
        if (value.play) {
          playedTrack.push(value);
        }
      });
    });
    playedTrack.sort(function (a, b) {
      return Object.keys(b.play).length - Object.keys(a.play).length;
    });
    setPlayedTrack(playedTrack);
  };

  return (
    <Container>
      <div className="main-contents">
        <Suggest
          title="More of what you like"
          subtitle="Suggestions based on what you've liked or played"
          category="Liked tracks"
          data={user && user.likes}
        ></Suggest>
        <Suggest
          title="Charts: Top 50"
          subtitle="The most played tracks on SoundCloud this week"
          category="Top 50"
          data={playedTrack && playedTrack}
        ></Suggest>
      </div>
    </Container>
  );
}

export default MainHome;
