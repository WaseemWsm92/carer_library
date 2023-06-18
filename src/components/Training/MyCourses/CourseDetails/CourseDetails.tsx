import { Col, Row } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";

import CourseContent from "./CourseContentList/CourseContent";
import "./CourseDetails.scss";
import VideoPlayer from "./VideoPlayer/VideoPlayer";

const CourseDetails = () => {
  const [showDocument, setShowDocument] = useState(false);
  const [videoToPlay, setVideoToPlay] = useState(
    "https://www.youtube.com/watch?v=7P9sxqt7HfA"
  );
  const { id } = useParams();

  return (
    <div className="course-details-wrapper">
      <Row gutter={[20, 20]}>
        <Col xxl={8} xl={10} xs={24}>
          <CourseContent
            setVideoToPlay={setVideoToPlay}
            setShowDocument={setShowDocument}
          />
        </Col>
        <Col xxl={16} xl={14} xs={24}>
          <VideoPlayer videoToPlay={videoToPlay} showDocument={showDocument} />
        </Col>
      </Row>
    </div>
  );
};

export default CourseDetails;
