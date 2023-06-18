import { Button } from "antd";

import arrowDown from "../../../../assets/icons/training/arrow-down.png";
import {
  newsActivityData,
  NewsActivityDataType,
} from "../../../../mock/TrainingData/NewsActivityData";

const NewsAndActivity = () => {
  return (
    <div className="news-activity-card">
      <h1 className="title">News and Activity</h1>
      <div className="news-activities">
        {newsActivityData.map((item: NewsActivityDataType, index: number) => (
          <div key={index} className={`news ${item.bgColor}`}>
            <div className="news-details">
              <img src={item.icon} alt="" />
              <div style={{ marginLeft: "10px" }}>
                <h2 className={`title ${item.color}`}>{item.title}</h2>
                <p>{item.desc}</p>
              </div>
            </div>
            <p className="date">{item.date}</p>
          </div>
        ))}
      </div>
      <Button className="fs-12 fw-500 link-btn" type="link" block>
        View More
        <img src={arrowDown} alt="view more" />
      </Button>
    </div>
  );
};

export default NewsAndActivity;
