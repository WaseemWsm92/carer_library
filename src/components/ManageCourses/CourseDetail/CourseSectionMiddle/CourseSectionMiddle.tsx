import { Button, Col, Collapse, Progress, Rate, Row } from 'antd'
import React, { useEffect, useState } from 'react'

import arrowUp from '../../../../assets/icons/ManageCourse/CourseDetails/arrow-up.svg'
import videoIcon from '../../../../assets/icons/ManageCourse/CourseDetails/video-icon.svg'
import documentIcon from '../../../../assets/icons/ManageCourse/CourseDetails/document-Icon.svg'
import featureRewiewIcon from '../../../../assets/icons/ManageCourse/CourseDetails/feature-review.svg'
import userImage from '../../../../assets/images/ManageCourse/CourseDetails/user-image.svg'
import userOne from '../../../../assets/images/ManageCourse/CourseDetails/user-one.svg'

import arrowDownIcon from '../../../../assets/icons/arrow-down-icon.svg'
import ratingsStarIcon from '../../../../assets/icons/ManageCourse/CourseDetails/rating-stars.svg'
import ratingsBadgeIcon from '../../../../assets/icons/ManageCourse/CourseDetails/ratings-badge.svg'
import ratingsUsersIcon from '../../../../assets/icons/ManageCourse/CourseDetails/ratings-users.svg'
import ratingsPlayIcon from '../../../../assets/icons/ManageCourse/CourseDetails/ratings-play.svg'
import { useNavigate } from 'react-router-dom'

import { useGetCoursesDetailsSectionsQuery, useGetSectionsLecturesQuery } from '../../../../store/Slices/ManageCourse'

import dayjs from 'dayjs'
import 'dayjs/locale/en'; // Import the locale you need, in this case 'en' for English
import relativeTime from 'dayjs/plugin/relativeTime'; // Import the relativeTime plugin

import "./CourseSectionMiddle.scss"

dayjs.extend(relativeTime);

const { Panel } = Collapse;

const FeedbackAndRatings = [
  {
    progress: "75",
    ratingValue: "5"
  },
  {
    progress: "25",
    ratingValue: "4"
  },
  {
    progress: "0",
    ratingValue: "0"
  },
  {
    progress: "0",
    ratingValue: "0"
  },
  {
    progress: "0",
    ratingValue: "0"
  },
]
const ReviewsData = [
  {
    id: '1',
    userIcon: userOne,
    userName: 'Darshan C.',
    ratingsValue: 5,
    time: "4 weeks ago",
    remarks: 'Excellent course material and materials are shared in depth for each topic. Highly recommended if you are a beginner!!!'
  },
  {
    id: '2',
    userIcon: userOne,
    userName: 'Darshan C.',
    ratingsValue: 4,
    time: "4 weeks ago",
    remarks: 'Excellent course material and materials are shared in depth for each topic. Highly recommended if you are a beginner!!!'
  },
]

const CourseSectionMiddle = ({ courseDetailsData }: any) => {

  const [activePanelKey, setactivePanelKey] = useState<any>('')
  const onChange = (key: any) => {
    setactivePanelKey(key)
  };
  const navigate = useNavigate()
  const [getCourseSectionId, setGetCourseSectionId] = useState('')
  console.log("getCourseSectionId", getCourseSectionId)
  const { data, isLoading, isError, isSuccess } = useGetSectionsLecturesQuery(getCourseSectionId)
  let manageCourseDetailsSections: any;
  if (isLoading) {
    manageCourseDetailsSections = <p>Loading...</p>
  }
  else if (isSuccess) {
    manageCourseDetailsSections = data
  }
  else if (isError) {
    manageCourseDetailsSections = <p>Error...</p>
  }
  console.log("manageCourseDetailsSections => ", manageCourseDetailsSections?.data)

  return (
    <div className='course-section-middle'>
      <div className='fs-20 fw-500'>What you’ll learn</div>
      <Row gutter={[20, 20]} style={{ marginTop: "30px" }}>
        {courseDetailsData?.whatYouLearn?.map((item: any, index: any) => (
          <Col xs={24} sm={24} md={24} lg={24} xl={12} key={index}>
            <div className='custom--list'>
              <span className='fs-14 fw-400 title-color'>{item}</span>
            </div>
          </Col>
        ))}
      </Row>
      <div className='fs-20 fw-500 form-heading-color' style={{ marginTop: "20px" }}>Requirements</div>
      <Row gutter={[20, 20]} style={{ marginTop: "30px" }}>
        {courseDetailsData?.prerequisities?.map((item: any, index: any) => (
          <Col xs={24} sm={24} md={24} lg={24} key={index}>
            <div className='custom--list'>
              <span className='fs-14 fw-400 title-color'>{item}</span>
            </div>
          </Col>
        ))}
      </Row>
      <div className='fs-20 fw-500 form-heading-color' style={{ marginTop: "20px", marginBottom: "20px" }}>Description</div>
      <span className='fs-14 fw-400 title-color'>{courseDetailsData?.courseDescription}</span>
      <div className='fs-20 fw-500' style={{ marginTop: "20px", marginBottom: "20px" }}>Course Content</div>
      <div className="wrapper-collapse">
        <Collapse accordion onChange={onChange}>
          {courseDetailsData?.sections?.map((content: any, index: any) => (
            <Panel showArrow={false} header={
              <div className='course-content-head d-flex align-items-center' onClick={() => setGetCourseSectionId(content?._id)}>
                <div className="d-flex align-items-center justify-between" style={{ width: "100%" }}>
                  <div className="d-flex align-items-center" style={{ gap: '10px' }}>
                    <img src={arrowUp} alt="" className={`${activePanelKey == content?.id ? "" : 'rotate-90'}`} />
                    <div className='fs-16 fw-500'>Section {index + 1} : {content?.sectionTitle}</div>
                  </div>
                  <span className='fs-12 fw-400'></span>
                </div>
              </div>
            } key={content?.id}>
              <>
                {manageCourseDetailsSections?.data?.length ? manageCourseDetailsSections?.data?.map((item: any, index: any) => (
                  <div className="pannel-content-expandable" key={index}>
                    <div className='d-flex align-center justify-between align-center' style={{ height: "50px", padding: "0px 20px" }}>
                      <div className="d-flex align-center" style={{ gap: '15px' }}>
                        <img src={item?.icon} alt="" />
                        <span className='fs-14 fw-600'>{item?.lectureTitle}</span>
                      </div>
                      <div className="d-flex align-center" style={{ gap: '25px' }}>
                        <span className='fs-12 fw-600' >View</span>
                      </div>
                    </div>
                  </div>
                )) : <span>no data found...</span>}
              </>
            </Panel>
          ))}
        </Collapse>
      </div>

      <div className='fs-20 fw-500 form-heading-color' style={{ marginTop: "20px", marginBottom: "20px" }}>Featured Review</div>
      <div className="wrapper-feature-review">
        <div className='d-flex' style={{ gap: '20px' }}>
          <div className="flex-wrapper">
            <img src={featureRewiewIcon} alt="" />
          </div>
          <div className='d-flex flex-column'>
            <span className='fs-16 fw-500'>Johny Bairstow</span>
            <span className='fs-12 fw-400'>13 courses</span>
            <span className='fs-12 fw-400'>9 reviews</span>
          </div>
        </div>
        <div className="feature-review-rating d-flex" style={{ gap: '10px', marginTop: "5px" }}>
          <span className='orange-color fs-24 fw-600'>5.0</span>
          <Rate className='custom-rate' disabled defaultValue={5} />
        </div>
      </div>
      <div className='fs-20 fw-500 form-heading-color' style={{ marginTop: "20px", marginBottom: "20px" }}>Instructor</div>
      <div className="wrapper-instructor">
        <div className="profile-instructor d-flex" style={{ gap: '20px', flexWrap: "wrap" }}>
          <img src={userImage} alt="" />
          <div className='d-flex flex-column'>
            <span className='fs-16 fw-500'>{courseDetailsData?.authorStats?.authorFirstName}&nbsp;{courseDetailsData?.authorStats?.authorLastName}</span>
            <span className='fs-12 fw-400'><img src={ratingsStarIcon} alt="" />&nbsp; {courseDetailsData?.authorStats?.authorCoursesAverageReview}</span>
            <span className='fs-12 fw-400'><img src={ratingsBadgeIcon} alt="" />&nbsp; 648 reviews</span>
            <span className='fs-12 fw-400'><img src={ratingsUsersIcon} alt="" />&nbsp; {courseDetailsData?.authorStats?.authorTotalCarer} Carers</span>
            <span className='fs-12 fw-400'><img src={ratingsPlayIcon} alt="" />&nbsp; {courseDetailsData?.authorStats?.authorTotalCourses} Courses</span>
          </div>
        </div>
        <div className='fs-12 fw-400' style={{ marginTop: '20px' }}>Dr Neil Thompson is a highly experienced tutor and trainer. He is highly respected for his ability to explain complex ideas clearly and effectively. His gentle voice and unhurried approach are widely appreciated by online learners as will as attendees at his conferences and workshops. <br /><br /> He is an independent writer, educator and adviser based in Wales. He is also a visiting professor at the Open University in the UK.. He is a well-published author with over 200 publications to his name, including over 40 books, several of which are bestsellers. He has been a speaker at conferences in the UK, Ireland, Italy, Spain, Norway, the Netherlands, Greece, the Czech Republic, Turkey, Hong Kong, India, the United States, Canada and Australia. <br /><br /> He is a Fellow of the Chartered Institute of Personnel and Development, the Higher Education Academy and the Royal Society of Arts, and a member of the International Work Group on Death, Dying and Bereavement. He was formerly the editor of the US-based international journal, Illness, Crisis & Loss and now edits the free e-zine, THE humansolutions BULLETIN. His main interests are in the field of well-being: equality and diversity; conflict management; stress; loss, grief and trauma and reflective practice. He is a sought-after conference speaker, consultant and facilitator.</div>
      </div>

      <div className='feedback-and-ratings-wrapper d-flex' style={{ marginTop: "20px", marginBottom: "20px", gap: '40px' }}>
        <div className="left-area d-flex flex-column">
          <div className='fs-20 fs-500'>Feedback & Rating</div>
          <span className='orange-color fs-24 fw-600'>4.9</span>
          <Rate className='custom-rate' disabled defaultValue={5} />
          <span className='fs-12 fs-400'>Course Rating (20 Reviews)</span>
        </div>
        <div className='progress-and-ratings'>
          {FeedbackAndRatings.map((item: any, index: any) => (
            <div className="bar-progress-and-ratings d-flex align-center" key={index}>
              <Progress className='wrapper-styles' strokeColor='#F7B923' strokeWidth={12} percent={item.progress} showInfo={false} />
              <Rate className='custom-rate' disabled defaultValue={item.ratingValue} style={{ marginLeft: "10px" }} />
              <span className='fs-14 fs-400' style={{ marginLeft: "10px", marginTop: "2px" }}>{item.progress}%</span>
            </div>
          ))}

        </div>
      </div>

      <div className='fs-20 fw-500' style={{ marginTop: "20px", marginBottom: "20px" }}>Reviews</div>
      <div className="reviews-wrapper">
        {courseDetailsData?.reviews?.length && courseDetailsData?.reviews?.map((item: any, index: any) => (
          <div className="inner-review-bx" key={index} style={{ marginTop: "20px" }}>
            <div className="d-flex" style={{ gap: '20px', flexWrap: 'wrap' }}>
              <img src={userOne} alt="" />
              <div className="d-flex flex-column" >
                <span className='fs-15 fw-700'>{item?.reviewedUser?.firstName} {item?.reviewedUser?.lastName}</span>
                <div className="d-flex align-center" style={{ gap: '10px', flexWrap: 'wrap' }}>
                  <Rate className='custom-rate' disabled value={item.rating} />
                  <span className='fs-14 fw-400 title-color'>{dayjs(item.createdAt).fromNow()}</span>
                </div>
              </div>
            </div>
            <div className='fs-14 fs-400 title-color' style={{ marginTop: "10px" }}>{item.comment}</div>
          </div>
        ))}
        <span className='orange-color fs-16 fw-500 d-flex align-center' style={{ gap: "5px", marginTop: "15px" }}>Show more <img src={arrowDownIcon} alt="" style={{ width: "6px", height: "6px" }} /></span>
      </div>

      <Button type='primary' className='btn-cancel' style={{ marginTop: "20px" }}
      // onClick={() => navigate(`/manage-courses`)}
      >
        Back
      </Button>

    </div>
  )
}
export default CourseSectionMiddle