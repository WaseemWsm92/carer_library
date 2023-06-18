import { Button } from 'antd'
import React from 'react'
import { recentActivityData, RecentActivityDataType } from '../../../mock/InstructorDashboard/RecentActivitiesData'
import arrowDown from "../../../assets/icons/training/arrow-down.png";
import './RecentActivities.scss'

const RecentActivities = () => {
  return (
    <div className="recent-activity-card">
    <h1 className="title fs-20 fw-500">Recent Activities</h1>
    <div className="recent-activities">
      {recentActivityData.map((item: RecentActivityDataType, index: number) => (
        <div key={index} className={`news ${item.bgColor}`}>
          <div className="activity-details">
            <img src={item.icon} alt="" />
            <div style={{ marginLeft: "15px" }}>
              <h2 className={`title ${item.color}`}>{item.title}</h2>
              <p>{item.desc}</p>
            </div>
          </div>
          <p className="date">{item.date}</p>
        </div>
      ))}
    </div>
    <div className='d-flex justify-end'>
    <Button className="fs-12 fw-500 link-btn" type="link" block>
      View More
      <img src={arrowDown} alt="view more" />
    </Button>
    </div>
  </div>
  )
}

export default RecentActivities