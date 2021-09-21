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
`;

const AudioPlayer = ({ tracks }) => {
  //   const [trackList, setTrackList] = useState(tracks);
  const fuck = (e) => {
    return (
      <Back>
        <ReactAudioPlayer
          src="/assets/audio/misaen.ogg"
          controls={true}
          style={{ height: "100%" }}
        />
      </Back>
    );
  };

  const returnAudio = useMemo(() => fuck(tracks), [tracks]);
  return returnAudio;
};

export default AudioPlayer;
