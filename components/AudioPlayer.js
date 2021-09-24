import ReactAudioPlayer from "react-audio-player";
import styled from "styled-components";
import React, { useMemo } from "react";

const Back = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  padding: 0 100px;
  background-color: var(--color-nav-play);
  z-index: 5;
  border-top: 1px solid var(--color-nav-border);
`;

const AudioPlayer = ({ tracks }) => {
  //   const [trackList, setTrackList] = useState(tracks);
  const fuck = (e) => {
    return (
      <Back>
        <ReactAudioPlayer
          src={tracks}
          controls={true}
          style={{ height: "100%" }}
          autoPlay
        />
      </Back>
    );
  };

  const returnAudio = useMemo(() => fuck(tracks), [tracks]);
  return returnAudio;
};

export default AudioPlayer;
