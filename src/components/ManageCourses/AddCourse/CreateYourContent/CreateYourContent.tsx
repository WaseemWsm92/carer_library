import React, { useEffect, useState } from 'react'
import './CreateYourContent.scss'

import { Col, Row, UploadProps, message, Collapse, Button, Input } from 'antd'
import deleteIcon from "../../../../assets/icons/AddCourse/delete-icon.svg"
import uploadFileIcon from "../../../../assets/icons/AddCourse/upload-file-icon.svg"
import uploadCloudIcon from "../../../../assets/icons/AddCourse/upload-cloud.svg"
import arrowUpIcon from "../../../../assets/icons/AddCourse/arrow-up.svg"
import arrowDownIcon from "../../../../assets/icons/AddCourse/arrow-down.svg"
import editIcon from "../../../../assets/icons/AddCourse/edit-icon.svg"
import saveIcon from "../../../../assets/icons/AddCourse/save-icon.svg"
import TextArea from 'antd/es/input/TextArea'
import Dragger from 'antd/es/upload/Dragger'
// import { AddContentMockData } from '../../../../mock/AddContentData/AddContentData'
import { v4 as uuidv4 } from 'uuid';
import UploadImage from '../../../Setting/SettingKeyInfo/UploadImage/UploadImage'
import { usePostContentLectureRequestMutation, usePatchCourseSectionRequestMutation, usePostCourseSectionRequestMutation, usePatchContentLectureRequestMutation, useGetCoursesDetailsQuery, useGetSectionsLecturesQuery, useGetCoursesDetailsSectionsQuery, useGetSectionsQuery, useGetManageCourseDetailDataQuery } from '../../../../store/Slices/ManageCourse'
import { useLocation } from 'react-router-dom'

const { Panel } = Collapse;




const CreateYourContent = ({ handleTabsValueChange, responseId }: any) => {

  const [postCourseSectionRequest] = usePostCourseSectionRequestMutation()
  const [patchCourseSectionRequest] = usePatchCourseSectionRequestMutation()
  const [postContentLectureRequest] = usePostContentLectureRequestMutation()
  const [patchContentLectureRequest] = usePatchContentLectureRequestMutation()

  const { pathname } = useLocation()
  const route = pathname.split('/')
  const routeValue = route[2]
  const routeId = route[3]
  const { state }: any = useLocation()




  const [createCourseData, setcreateCourseData] = useState<any[]>([])

  const [sectionTitle, setSectionTitle] = useState('');
  const [lectureTitle, setLectureTitle] = useState('');
  const [lectureDiscription, setLectureDiscription] = useState('');
  const [sectionFechedId, setSectionFechedId] = useState('')
  const [lectureFechedId, setLectureFechedId] = useState('')
  const [isDescriptionEditMode, setIsDescriptionEditMode] = useState(false)
  const [isUploadModal, setIsUploadModal] = useState()
  const [isSectionEdit, setisSectionEdit] = useState(false)
  const [isLectureEdit, setisLectureEdit] = useState(false)
  const [sectionId, setSectionId] = useState()
  const [activePanel, setActivePanel] = useState()
  const [activePanelValue, setActivePanelValue] = useState('')

  // console.log('activePanel', activePanel)



  const [saveSectionData, setsaveSectionData] = useState<any>()
  //  console.log("saveSectionData", saveSectionData)

  const [detailsAttachmentId, setDetailsAttachmentId] = useState("")
  const uploadDetailsAttachmentId = (id: any) => {
    setDetailsAttachmentId(id)
  }



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

  
  // const { data: isData, isLoading: isloadingData, isError: isErrorData, isSuccess: isSucessData } = useGetSectionsLecturesQuery('642f8ae070ea0401040d32e6')
  // let getLectures: any;
  // if (isloadingData) {
  //   getLectures = <p>Loading...</p>
  // }
  // else if (isSucessData) {
  //   getLectures = isData
  // }
  // else if (isErrorData) {
  //   getLectures = <p>Error...</p>
  // }
  const { data: isInfoData, isLoading: isloadingInfoData, isError: isErrorInfoData, isSuccess: isSucessInfoData } = useGetManageCourseDetailDataQuery({id:state?.editProfile?._id})
  let getCourseDetailsData: any;
  if (isloadingInfoData) {
    getCourseDetailsData = <p>Loading...</p>
  }
  else if (isSucessInfoData) {
    getCourseDetailsData = isInfoData
  }
  else if (isErrorInfoData) {
    getCourseDetailsData = <p>Error...</p>
  }
// console.log('getCourseDetailsData', getCourseDetailsData?.data[0]?.sections)










  const { data: isDataSection, isLoading: isloadingDataSection, isError: isErrorDataSection, isSuccess: isSucessDataSection } = useGetSectionsQuery(route[3])

  let getCourseSections: any;
  if (isloadingDataSection) {
    getCourseSections = <p>Loading...</p>
  }
  else if (isSucessDataSection) {
    getCourseSections = isDataSection
  }
  else if (isErrorDataSection) {
    getCourseSections = <p>Error...</p>
  }

  // const sectionArray = getCourseSections?.data
  // const lecturesArray = getLectures?.data

  // console.log("sectionArray", sectionArray)


  // const sectionLecturesMap: any = {};

  // lecturesArray?.forEach((lecture: any) => {
  //   if (!sectionLecturesMap[lecture?.sectionId]) {
  //     sectionLecturesMap[lecture?.sectionId] = [];
  //   }
  //   sectionLecturesMap[lecture?.sectionId].push(lecture);
  // });
  // const dummyArray = sectionArray && Array.isArray(sectionArray) && sectionArray.map((section: any) => {
  //   return {
  //     id: section?._id,
  //     sectionTitle: section?.sectionTitle,
  //     lectures: sectionLecturesMap[section?._id] || [],
  //   };
  // });




  // const dummyArray = sectionArray?.length && sectionArray?.map((section: any) => {
  //   const lectures = lecturesArray?.length && lecturesArray?.filter((lecture: any) => lecture.sectionId === section._id);
  //   return {
  //     id: section._id,
  //     sectionTitle: section.sectionTitle,
  //     lectures: lectures.map((lecture: any) => ({
  //       isDeleted: lecture.isDeleted,
  //       createdBy: lecture.createdBy,
  //       courseId: lecture.courseId,
  //       sectionId: lecture.sectionId,
  //       lectureTitle: lecture.lectureTitle,
  //       lectureMediaId: lecture.lectureMediaId,
  //       lectureDescription: lecture.lectureDescription,
  //       _id: lecture._id,
  //       createdAt: lecture.createdAt,
  //       updatedAt: lecture.updatedAt
  //     }))
  //   }
  // });
  // console.log("dummyArray", dummyArray)





  // const defaultSectionArray = [] 

  const removeFieldSectionOne = (index: any) => {
    const newFields = [...createCourseData];
    newFields.splice(index, 1);
    setcreateCourseData(newFields);
  };
  const handleDeleteLectureTile = (sectionIndex: number, lectureIndex: number) => {
    const updatedCourseData = [...createCourseData];
    updatedCourseData[sectionIndex].lectures.splice(lectureIndex, 1);
    setcreateCourseData(updatedCourseData);
  };
  const handelUploadFiles = (index: any) => {
    setIsUploadModal(index)
  };
  const handlePanelChange = (panelId: any) => {
    if (activePanel === panelId) {
      setActivePanelValue(''); // If panel is already active, collapse it
    } else {
      setActivePanelValue(panelId); // Otherwise, activate the clicked panel
    }
  };

  // API's HANDLERS  

  const handelSaveCourseSection = async () => {
    const payload = {
      "courseId": route[2] === 'edit-course' ? routeId : responseId,
      "sectionTitle": sectionTitle ? sectionTitle : 'write Title'
    }

    const { error, data }: any = await postCourseSectionRequest({ payload })
    // console.log("Details id", data)

    const newFields = [...createCourseData, {
      id: data?.data._id,
      sectionTitle: data?.data?.sectionTitle,
      lectures: []
    }];
    setcreateCourseData(newFields);
  }

  const handelsaveSectionTitle = async (element: any) => {
    // console.log("get element", element)
    if (element === sectionFechedId) {
      const payload = {
        // "courseId": responseId,
        "sectionTitle": sectionTitle
      }
      const { error, data }: any = await patchCourseSectionRequest({ id: element, payload })
      // console.log("dync=>", data?.data)
      setsaveSectionData(data?.data)
    }
    const updatedSection = {
      _id: saveSectionData?._id,
      sectionTitle: saveSectionData?.sectionTitle
    };
    const updatedData = createCourseData.map((section) =>
      section._id === updatedSection._id
        ? { ...section, sectionTitle: updatedSection.sectionTitle }
        : section
    );
    console.log("updatedData", updatedData)
    console.log("updatedSection", updatedSection)

  }

  // lectures 

  const handelAddLecture = async (item: any) => {
    console.log("item=>>",item)
    const payload = {
      "courseId": route[2] === 'edit-course' ? routeId : responseId,
      "sectionId": route[2] === 'edit-course' ? item._id : item.id ,
      "lectureTitle": "Dummy Introduction",
      "lectureMediaId": "63f72ff10972ff8bd5a46e90",
      "lectureDescription": "Dummy Lecture Description"
    }
    const { error, data }: any = await postContentLectureRequest({ payload })
    console.log("LectureTabsData=>", data.data)

    setcreateCourseData(prevSections => {
      const updatedSections = prevSections.map(section => {
        if (section.id === data?.data?.sectionId) {
          return {
            ...section,
            lectures: [...section.lectures, data?.data]
          };
        }
        return section;
      });
      return updatedSections;
    });
  }
  const handelUpdateLectures = async (element: any) => {
    const id = element?._id
    const payload = {
      "lectureTitle": lectureTitle,
      "lectureMediaId": detailsAttachmentId,
      "lectureDescription": lectureDiscription
    }
    const { error, data }: any = await patchContentLectureRequest({ id, payload })
    const updatedLectures = createCourseData.map((section: any) => {
      const newlectures = section.lectures.map((lecture: any) => {
        if (lecture._id === data?.data?._id) {
          return data?.data;
        }
        return lecture;
      });
      return {
        ...section,
        lectures: newlectures,
      };
    });
    console.log("updated Lecture => ", updatedLectures)
    setcreateCourseData(updatedLectures)
  }

  const handleSectionTileChange = (event: any) => {
    setSectionTitle(event.target.value);
  };
  const handleLectureDiscriptionChange = (event: any) => {
    setLectureDiscription(event.target.value);
  };
  const handleLectureTileChange = (event: any) => {
    setLectureTitle(event.target.value);
  };


  console.log("createCourseData =>", createCourseData)



  useEffect(() => {
    if (route[2] === 'edit-course') {
      setcreateCourseData(getCourseDetailsData?.data && getCourseDetailsData?.data[0]?.sections)
    }
  }, [data, isInfoData])





  return (
    <div className='wrapper-create-your-content'>
      <div className='form--head fs-14 fw-600 form-heading-color'>What will students learn in your course?</div>
      {createCourseData?.map((item: any, index: any) => (
        <div className="wrapper-course-section" key={item?.id} onClick={() => setSectionId(item?.id)}>
          <div className="course-section-head d-flex">
            <div className="section-Title d-flex justify-center align-center fs-14 fw-700 white-color">Section {index + 1}&nbsp;:</div>
            <div className="section-info d-flex align-center  fs-14 fw-600 form-heading-color">
              {
                isSectionEdit && item.id === sectionFechedId ?
                  <Input className='edit-discription' onChange={handleSectionTileChange} />
                  :
                  <span>{item?.sectionTitle}&nbsp;</span>
              }
              {
                isSectionEdit && item.id === sectionFechedId ?
                  <img className='' src={saveIcon} alt="" onClick={() => { handelsaveSectionTitle(item?.id); setisSectionEdit(!isSectionEdit); setSectionFechedId(item?.id) }}
                    style={{ width: "13px", height: "13px", marginTop: '4px' }} />
                  :
                  <img className='f--hover-to-show' src={editIcon} alt="" onClick={() => { setisSectionEdit(!isSectionEdit); setSectionFechedId(item?.id) }}
                    style={{ width: "13px", height: "13px", marginTop: '4px' }} />

              }
            </div>

            <img className='icon-section-delete' src={deleteIcon} onClick={() => removeFieldSectionOne(index)} alt="" />
            {/* <button onClick={handelSaveCourseSection}>post</button> */}
          </div>
          <div className="lecture-tiles">
            <Collapse accordion onChange={handlePanelChange} activeKey={activePanelValue}>
              {item?.lectures?.map((ele: any, indexEle: any) => (
                <Panel showArrow={false} header={
                  <div
                    className={`${activePanel === ele._id ? 'lecture-tile-head d-flex justify-between align-center bg--dark' : "lecture-tile-head d-flex justify-between align-center"}`}
                    onClick={() => { setActivePanel(ele._id); setIsDescriptionEditMode(false) }}
                  >
                    <div className='d-flex flex--res-column'>
                      <div className='tile-title fs-14 fw-600 label-color'>Lecture {indexEle + 1}:</div>
                      <div className='tile-name fs-14 fw-400 title-color d-flex' style={{ borderLeft: '1px solid #000', paddingLeft: "20px" }}>
                        {
                          isLectureEdit && ele._id === lectureFechedId ?
                            <Input className='edit-discription' defaultValue={ele?.lectureTitle} onChange={handleLectureTileChange} />
                            :
                            <span>{ele?.lectureTitle}&nbsp;</span>
                        }
                        {
                          isLectureEdit && ele._id === lectureFechedId ?
                            <img className='' src={saveIcon} alt="" onClick={() => { setisLectureEdit(!isLectureEdit); setLectureFechedId(ele?._id); handelUpdateLectures(ele) }}
                              style={{ width: "13px", height: "13px", marginTop: '4px' }} />
                            :
                            <img className='f--hover-to-show' src={editIcon} alt="" onClick={() => { setisLectureEdit(!isLectureEdit); setLectureFechedId(ele?._id) }}
                              style={{ width: "13px", height: "13px", marginTop: '4px' }} />

                        }
                      </div>
                    </div>
                    <div className='tile-features d-flex' >

                      <img className={`${activePanel === ele._id ? '' : "f--hover-to-show"}`} src={deleteIcon} onClick={() => handleDeleteLectureTile(index, indexEle)} alt="" />
                      <img className={`${activePanel === ele._id ? '' : "f--hover-to-show"}`} src={uploadFileIcon} alt="" />
                      <div className='delete-icon'>
                        <img src={activePanel === indexEle ? arrowUpIcon : arrowDownIcon} alt="" />
                      </div>
                    </div>
                  </div>
                } key={ele._id} className='editable-panel-header'>
                  <div className="lecture-tile-content">
                    <div className="wrapper-description--upload-doc">
                      <div className="inner-upper-level">
                        <Row>
                          <Col xs={24} sm={24} md={20} lg={20}>
                            <div className="area-description d-flex flex-column">
                              {isDescriptionEditMode && activePanel === ele._id
                                && <img className='edit-icon'
                                  onClick={() => { setIsDescriptionEditMode(activePanel === ele._id && !isDescriptionEditMode); handelUpdateLectures(ele) }}
                                  src={saveIcon} alt=""
                                  style={{ width: "13px", height: "13px" }} />}

                              {!isDescriptionEditMode && activePanel === ele._id && <img className='edit-icon' onClick={() => {
                                setIsDescriptionEditMode(activePanel === ele._id && !isDescriptionEditMode);
                              }}
                                src={editIcon} alt=""
                                style={{ width: "13px", height: "13px" }} />}


                              <div className='fs-14 fw-600 label-color'>Description:</div>
                              {!isDescriptionEditMode && activePanel === ele._id && <div className='fs-14 fw-400'>{ele?.lectureDescription}</div>}
                              {isDescriptionEditMode && activePanel === ele._id && <TextArea rows={2} defaultValue={ele?.lectureDescription} placeholder="Description" className='text-area-styles' onChange={handleLectureDiscriptionChange} />}

                            </div>
                          </Col>
                          <Col xs={24} sm={24} md={4} lg={4}>
                            <div className="upload-file d-flex flex-column align-center justify-center" onClick={() => handelUploadFiles(indexEle)}>
                              <img src={uploadFileIcon} alt="" />
                              <span className='fs-14px fw-600 text-center'>Upload <br /> Resource</span>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                    <div className="wrapper-uploaded-files-details">
                      <div className='fs-14 fw-600 label-color' style={{ marginBottom: "14px" }}>Files:</div>
                      {ele?.files?.map((uploadedFiles: any, indexFiles: any) => (
                        <div className="files-to-render d-flex flex-column" style={{ gap: '5px' }} key={indexFiles}>
                          <span className='fs-14 fw-400'>{indexFiles + 1}. {uploadedFiles?.name}</span>
                        </div>
                      ))}
                    </div>
                    {isUploadModal === indexEle &&
                      <div className="inner-absolute-wrapper-upload-resourse d-flex align-center justify-center">
                        <div className="upload-box"><UploadImage uploadCertificateId={uploadDetailsAttachmentId} /></div>
                        <div className="close-overlay" onClick={() => handelUploadFiles('')}></div>
                      </div>
                    }
                  </div>
                </Panel>
              ))}
            </Collapse>

            <div className='d-flex justify-end' style={{ marginTop: "20px", height: "20px" }}>
              <button className='add-more-fields fs-14 fw-600 cursor-pointer'
                // onClick={() => addLectureTile(index)}
                onClick={() => handelAddLecture(item)}
                style={{ height: "20px" }}>+ Add</button>
            </div>
          </div>
        </div>
      ))}
      <div className='d-flex justify-end' style={{ marginTop: "20px" }}>
        <button className='add-more-fields fs-14 fw-600 cursor-pointer' onClick={handelSaveCourseSection}>+ Add</button>
      </div>

      <Button className='save-and-next-btn fs-16 fw-600' htmlType='submit' onClick={() => handleTabsValueChange('3')}>Save & Next</Button>
    </div>
  )
}

export default CreateYourContent