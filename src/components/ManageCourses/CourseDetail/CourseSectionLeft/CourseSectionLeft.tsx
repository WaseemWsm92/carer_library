import React from 'react'
import courseCardImage from '../../../../assets/images/ManageCourse/CourseDetails/image 18.png'
import infoIcon from "../../../../assets/icons/ManageCourse/CourseDetails/info-icon.svg"
import usersIcon from "../../../../assets/icons/ManageCourse/CourseDetails/users-icon.svg"

import './CourseSectionLeft.scss'
import { Rate } from 'antd'
import dayjs from 'dayjs'
const CourseSectionLeft = ({ courseDetailsData }: any) => {

  const authorCourseAverageReview = courseDetailsData?.authorStats?.authorCoursesAverageReview

  return (
    <div className='course-section-left'>
      <div className="course-card">
        <img 
        // src={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${courseDetailsData?.courseImage}`} 
        src={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${courseDetailsData?.courseImage[0]?.mediaId}.${courseDetailsData?.courseImage[0]?.mediaMeta?.extension}`}
        alt="" style={{ width: "100%", height: "238px" }} />
        <div className='fs-16 fw-500 text-center center--box' style={{ marginTop: "43px", width: '80%' }}>{courseDetailsData?.courseTitle}</div>
        <div className="course-ratings d-flex justify-center" style={{ gap: '10px', marginTop: "15px" }}>
          <span className='orange-color fs-24 fw-600'>{courseDetailsData?.authorStats?.authorCoursesAverageReview}</span>
          <Rate className='custom-rate' disabled value={authorCourseAverageReview} />
        </div>
        <div style={{ marginTop: '15px', textAlign:'center' }}>
          <label className='fs-16 fw-600 form-heading-color' style={{ marginRight: "10px" }}>Author</label>
          <span className='fs-14 fs-600' style={{ color: '#898989' }}>{courseDetailsData?.authorStats?.authorFirstName}&nbsp;{courseDetailsData?.authorStats?.authorLastName}</span>
        </div>
        <div className='d-flex align-items-center justify-between' style={{ width:'90%', margin:'0 auto',  marginTop: '15px', }}>
          <div className='d-flex align-items-center' style={{ gap: '10px' }}><img src={infoIcon} alt="" /><span className='blue-color fs-14 fw-600'>Last updated {dayjs(courseDetailsData?.updatedAt).format("D/YYYY")}</span></div>
          <div className='d-flex align-items-center' style={{ gap: '10px' }}><img src={usersIcon} alt="" /><span className='fs-14 fw-600' style={{ color: "#0E918C" }}>{courseDetailsData?.authorStats?.totalEnrolledUsers}</span></div>
        </div>

      </div>

    </div>
  )
}

export default CourseSectionLeft