import { Progress } from "antd";
import ReactPlayer from "react-player/youtube";

import progressIcon from "../.././../../../assets/icons/training/course-progress.png";
import TextDocument from "../TextDocument/TextDocument";

const VideoPlayer = ({ showDocument, videoToPlay }: any) => {
  return (
    <div className="video-player-wrapper">
      <div className="d-flex justify-between align-center">
        <h1 className="title fw-500 fs-16 m-0">
          <span className="fw-600">Section 1 :</span> Use of Automated External
          Defibrillator
        </h1>
        <Progress
          type="circle"
          strokeColor={"#65CDF0"}
          trailColor="#D9DBE9"
          size={40}
          format={() => (
            <img src={progressIcon} alt="progress" width={18} height={20} />
          )}
          percent={20}
        />
      </div>
      {!showDocument ? (
        <div className="react-player">
          <ReactPlayer
            className="react-player"
            url={videoToPlay}
            width="100%"
            height="100%"
            controls={true}
          />
        </div>
      ) : (
        <TextDocument />
      )}
    </div>
  );
};

export default VideoPlayer;
