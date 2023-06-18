import { Col, Rate, Row } from 'antd'
import React from 'react'

import "./CourseDetail.scss"
import CourseSectionLeft from './CourseSectionLeft/CourseSectionLeft'
import CourseSectionMiddle from './CourseSectionMiddle/CourseSectionMiddle'

import courseRightImsge from '../../../assets/images/ManageCourse/CourseDetails/right-content-image.png'
import { useGetCoursesDetailsQuery } from '../../../store/Slices/ManageCourse'
import { useLocation } from 'react-router-dom'

const CourseDetail = () => {

  const {pathname} = useLocation()
  const route = pathname.split('/')

  const { data, isLoading, isError, isSuccess } = useGetCoursesDetailsQuery(route[3])

  let manageCourseDetails: any;
  if (isLoading) {
    manageCourseDetails = <p>Loading...</p>
  }
  else if (isSuccess) {
    manageCourseDetails = data
  }
  else if (isError) {
    manageCourseDetails = <p>Error...</p>
  }
  console.log("manageCourseDetails",manageCourseDetails?.data)

  return (
    <div className='course-details-main-wrapper'>
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={24} md={24} lg={10} xl={6}>
          <CourseSectionLeft courseDetailsData={manageCourseDetails?.data}/>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
         <CourseSectionMiddle courseDetailsData={manageCourseDetails?.data}/>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={6}>
          <div className='course-section-right'>
            <div className="lecture-contents-right">
              <div className="lecture-wrapper-image">
                <img 
                // src={manageCourseDetails?.data?.courseImageUrl}
                src={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${manageCourseDetails?.data?.coursePromoVide[0]?.mediaId}.${manageCourseDetails?.data?.coursePromoVide[0]?.mediaMeta?.extension}`}
                 alt="" style={{borderRadius:'10px'}}/>
              </div>
              <div className="content-columns height--50 border--low center--box d-flex"><span className='fs-14 fw-400'>Video Duration:</span><span> nan min</span></div>
              <div className="content-columns height--50 border--low center--box d-flex"><span className='fs-14 fw-400'>Video Medium:</span><span>{manageCourseDetails?.data?.courseLanguage}</span></div>
              <div className="content-columns height--50 border--low center--box d-flex"><span className='fs-14 fw-400'>Course Validity:</span><span>{manageCourseDetails?.data?.courseValidity} Years</span></div>
              <div className="content-columns height--50 border--low center--box d-flex"><span className='fs-14 fw-400'>Course Duration:</span><span>1 week</span></div>
              <div className="content-columns center--box" style={{paddingTop:"10px"}}><span className='fs-14 fw-400'>Who can Join : </span><span>{manageCourseDetails?.data?.targetAudience}</span></div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default CourseDetail