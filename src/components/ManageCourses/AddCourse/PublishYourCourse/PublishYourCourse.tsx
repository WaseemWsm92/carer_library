import { Button, Col, Form, Input, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import "./PublishYourCourse.scss"
import arrowDown from "../../../../assets/icons/arrow-down-icon.svg"
import TextArea from 'antd/es/input/TextArea';

import uploadIcon from '../../../../assets/icons/AddCourse/upload-icon.svg'
import { useGetCoursesDetailsQuery, useGetJobRolesRequestQuery, usePatchPublishCourseRequestMutation, usePostPublishPhotoRequestMutation, usePutPublishCourseRequestMutation } from '../../../../store/Slices/ManageCourse';
import { useLocation } from 'react-router-dom';


const { Option } = Select;

const PublishYourCourse = ({ responseId }: any) => {


  const { pathname } = useLocation()
  const route = pathname.split('/')
  const routeValue = route[2]
  const id = route[3]

  const [putPublishCourseRequest] = usePutPublishCourseRequestMutation()
  const [patchPublishCourseRequest] = usePatchPublishCourseRequestMutation()



  const { data, isLoading, isError, isSuccess } = useGetJobRolesRequestQuery([])

  let getJobRoles: any;
  if (isLoading) {
    getJobRoles = <p>Loading...</p>
  }
  else if (isSuccess) {
    getJobRoles = data
  }
  else if (isError) {
    getJobRoles = <p>Error...</p>
  }

  const { data: isData, isLoading: isloadingData, isSuccess: isSuccessData, isError: iserrorData }: any = useGetCoursesDetailsQuery(route[3])

  let manageCourseDetails: any;
  if (isloadingData) {
    manageCourseDetails = <p>Loading...</p>
  }
  else if (isSuccessData) {
    manageCourseDetails = isData
  }
  else if (iserrorData) {
    manageCourseDetails = <p>Error...</p>
  }



  const [uploadadImage, setUploadadImage] = useState<any>('');
  const [imageName, setImageName] = useState<any>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoURL, setVideoURL] = useState<string>('');

  const [updatedImageId, setUpdatedImageId] = useState()



  const [postPublishPhotoRequest, { isLoading: isPhotoLoading, isSuccess: isSucessPhoto, data: isDataPhoto }] = usePostPublishPhotoRequestMutation()
  let imageID: any
  if (isSucessPhoto) {
    imageID = isDataPhoto
  }
  console.log("imageID", imageID?.data?._id)
  
  const [uploadImage, setUploadedImage] = useState<any>(undefined);

  const handleImage = (e: any) => {
    let formData = new FormData();
    if (e.target.files.length) {
      const file: File = e.target.files[0];

      setUploadedImage({
        preview: URL.createObjectURL(file),
        raw: file,
      });
      var pattern = /image-*/;
      if (!file.type.match(pattern)) {
        return;
      }

      postPublishPhotoRequest({ file })
    }
    console.log("formData", formData)
  };

  console.log("uploadImage", uploadImage)

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  const handleChange = (value: any) => {
    console.log(`selected ${value}`);
  }
  const onFinish = (values: any) => {
    console.log('Success:', values);
    const id = responseId
    const payload = {
      ...values,
      courseId: responseId,
      courseImageId: imageID?.data?._id,
      promoVideoId: '63f72ff10972ff8bd5a46e90',
    }
    if (routeValue === 'edit-course'){
      const payloadEdit = {
        ...values,
        courseId: responseId,
        courseImageId: updatedImageId,
        promoVideoId: '63f72ff10972ff8bd5a46e90',
      }
      patchPublishCourseRequest({ payload:payloadEdit, id:route[3] })
    }else{
      putPublishCourseRequest({ payload })
    }
    console.log("responseId", responseId)
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const handleImageChange = (e: any) => {
    const selectedImage = e.target.files[0];
    setImageName(selectedImage.name);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setUploadadImage(reader.result);
      }
    };
    reader.readAsDataURL(selectedImage);
  };




  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
    setVideoURL(file ? URL.createObjectURL(file) : '');
  };


  // getJobRolesRequest

  useEffect(() => {
    if (routeValue === 'edit-course'){
      setUpdatedImageId(manageCourseDetails?.data?.courseImage[0]?._id)
    }
  }, [])
  

  return (
    <div className='publish-your-couese-main-wrapper'>
      <Form
        name="basic"
        initialValues={{
          courseTitle: manageCourseDetails?.data?.courseTitle,
          courseDuration: manageCourseDetails?.data?.courseDuration,
          courseDescription: manageCourseDetails?.data?.courseDescription,
          courseLanguage: manageCourseDetails?.data?.courseLanguage,
          courseType: manageCourseDetails?.data?.courseType,
          courseCategory: manageCourseDetails?.data?.courseCategory,
          courseValidity: manageCourseDetails?.data?.courseValidity
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Row gutter={[30, 5]} align="bottom">

          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Course Title"
              name="courseTitle"
              rules={[{ required: false, message: 'Required field' }]}
            >
              <Input placeholder="Type here" style={{ width: '100%', height: '45px' }} className='course-title-input'/>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Course Duration"
              name="courseDuration"
              rules={[{ required: false, message: 'Required field' }]}
            >
              <Select placeholder="Select Level" onChange={handleChange} suffixIcon={<img src={arrowDown} />}>
                <Option value={2}>2</Option>
                <Option value={3}>3</Option>
                <Option value={4}>4</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={20} lg={20}>
            <Form.Item
              label="Course Description"
              name="courseDescription"
              rules={[{ required: false, message: 'Required field' }]}
            >
              <TextArea rows={4} placeholder="Type Here" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Language"
              name="courseLanguage"
              rules={[{ required: false, message: 'Required field' }]}
            >
              <Select placeholder="Select Level" onChange={handleChange} suffixIcon={<img src={arrowDown} />}>
                <Option value="English">English</Option>
                <Option value="Computer">Computer</Option>
                <Option value="Science">Science</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Course Type"
              name="courseType"
              rules={[{ required: false, message: 'Required field' }]}
            >
              <Select placeholder="Select Level" onChange={handleChange} suffixIcon={<img src={arrowDown} />}>
                <Option value="Mandatory">Mandatory</Option>
                <Option value="option2">Option 2</Option>
                <Option value="option3">Option 3</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Category (Role)"
              name="courseCategory"
              rules={[{ required: false, message: 'Required field' }]}
            >
              <Select placeholder="Select Level" onChange={handleChange} suffixIcon={<img src={arrowDown} />}>
                {/* <Option value="640d89d71eaa5d3aa1cb961e">Option 1</Option> */}
                {getJobRoles?.data?.result && getJobRoles?.data?.result.map((item: any, index: any) => (
                  <Option key={index} value={item._id}>{item?.userRole}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Validity"
              name="courseValidity"
              rules={[{ required: false, message: 'Required field' }]}
            >
              <Select placeholder="Select Level" onChange={handleChange} suffixIcon={<img src={arrowDown} />}>
                <Option value={2}>2</Option>
                <Option value={3}>3</Option>
                <Option value={4}>4</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={10}>
            {/* <Input ></Input> */}
            <Form.Item
              label="Course Image"
              // name="courseImage"
              rules={[{ required: false, message: 'Required field' }]}
            >
              <div className='upload-file-area'>
                <input type="file" accept="image/*" name=""
                  onChange={(e: any) => { handleImageChange(e); handleImage(e) }}
                  //  onChange={handleImageChange}
                  id="" />
                <img className='upload-doc-icon cursor-pointer' src={uploadIcon} alt="" />
                <p className='file-title-display'>{imageName ? imageName : <span style={{ color: "#888888" }}>File Name</span>}</p>
              </div>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Promotional Video"
              // name="promotionalVideo"
              rules={[{ required: false, message: 'Required field' }]}
            >
              <div className='upload-file-area'>
                <input type="file" accept="video/*" onChange={handleFileChange} id="" />
                <img className='upload-doc-icon cursor-pointer' src={uploadIcon} alt="" />
                <p className='file-title-display'>{selectedFile?.name ? selectedFile?.name : <span style={{ color: "#888888" }}>File Name</span>}</p>
              </div>
            </Form.Item>
          </Col>


          <Col xs={24} sm={24} md={12} lg={10}>
            <div className='uploaded-image d-flex justify-center align-center'>
              {uploadImage ? (
                <img src={uploadImage?.preview} alt="preview" className='uploaded-image-preview' />
              ) : (
                <span className='fs-14 fw-600'>Preview</span>
              )}
              {/* <p>{imageName}</p> */}
            </div>
          </Col>

          <Col xs={24} sm={24} md={12} lg={10}>
            <div className='uploaded-image d-flex justify-center align-center'>
              {selectedFile ? (
                <video width="100%" height="100%" controls>
                  <source src={videoURL} type="video/mp4" />
                </video>
              ) : (
                <span className='fs-14 fw-600'>Preview</span>
              )}
            </div>
          </Col>
        </Row>
        <Button className='save-and-next-btn fs-16 fw-600' htmlType='submit' style={{ marginTop: "30px" }}>Submit</Button>
      </Form>
    </div>
  )
}

export default PublishYourCourse