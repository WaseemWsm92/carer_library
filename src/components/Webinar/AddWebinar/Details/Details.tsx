import React, { useEffect, useState } from 'react'

import { Button, Checkbox, Col, DatePicker, message, Row, Select, Switch, Tooltip, UploadProps } from 'antd'
import { Form, Input } from 'antd';

import './Details.scss'
import TextArea from 'antd/es/input/TextArea';
import Dragger from 'antd/es/upload/Dragger';
import { useLocation } from 'react-router-dom';
import DatePickerWrapper from '../../../../shared/DatePickerWrapper/DatePickerWrapper';
import SelectWrapper from '../../../../shared/SelectWrapper/SelectWrapper';
import InputWrapper from '../../../../shared/InputWrapper/InputWrapper';
import { useGetUpcomingWebinarByIDQuery, usePatchWebinarDetailsMutation, usePostAddWebinarDetailsMutation } from '../../../../store/Slices/Webinar/UpcommingWebinar';
import UploadImage from '../../../Setting/SettingKeyInfo/UploadImage/UploadImage';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const { Option } = Select;

const options = [
  { label: "Q&A : Participant Questions", value: "Q&A" },
  { label: "Webinar : Presentation Mode", value: "Presentation" },
];



const Details = ({ handelWebinarDetailsResponse}: any) => {

  const location = useLocation();
  const path = location.pathname;
  // console.log('path', path)

  const { state }: any = useLocation()
  // console.log("state",state?.editDetails)

  const { pathname } = useLocation()
  const route = pathname.split('/')
  const isEditWebinar = route[2]
  const id = route[3]
  // console.log("upcomingWebinarDataById?.data", upcomingWebinarDataById?.data)






  const [postAddWebinarDetails] = usePostAddWebinarDetailsMutation()
  const [patchWebinarDetails] = usePatchWebinarDetailsMutation()

  


  const { data, isLoading, isError, isSuccess } = useGetUpcomingWebinarByIDQuery({id:state?.editDetails[0]?._id})

  let upcomingWebinarDataById: any;
  if (isLoading) {
    upcomingWebinarDataById = <p>Loading...</p>
  }
  else if (isSuccess) {
    upcomingWebinarDataById = data
  }
  else if (isError) {
    upcomingWebinarDataById = <p>Error...</p>
  }
  console.log("upcomingWebinarDataById", upcomingWebinarDataById?.data)


const dateObj = dayjs(upcomingWebinarDataById?.data?.date);
console.log(dateObj);
const formattedDate = dateObj.locale('en').format('YYYY-MM-DD');
console.log("formattedDate", formattedDate)



  const [isViewWebinar, setisViewWebinar] = useState(false)
  const [checkboxValues, setCheckboxValues] = useState<string[]>([]);
  const [detailsAttachmentId, setDetailsAttachmentId] = useState("")

  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
  const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
  const [timeDuration, settimeDuration] = useState<number | null>()

  const [getDateObj, setgetDateObj] = useState<any>()
  const formattedDateNew = getDateObj?.locale('en').format('YYYY-MM-DD');

  console.log("formattedDateNew", formattedDateNew)

  const handleTimeChange = (values: any) => {

    
    const [start, end] = values;
    if (start && end) {
      const updatedStartTime = dayjs(formattedDateNew).hour(dayjs(start).hour()).minute(dayjs(start).minute());
      const updatedEndTime = dayjs(formattedDateNew).hour(dayjs(end).hour()).minute(dayjs(end).minute());
      setStartTime(updatedStartTime);
      setEndTime(updatedEndTime);
      const durationInMinutes = updatedEndTime.diff(updatedStartTime, 'minute');
      settimeDuration(durationInMinutes);
    } else {
      setStartTime(null);
      setEndTime(null);
      settimeDuration(null);
    }
  };

  console.log("startTime", startTime)
  console.log("endTime", endTime)
  console.log("getDateObj", getDateObj)

  const formattedStartTime = startTime ? dayjs(startTime).toISOString() : null;
  const formattedEndTime = endTime ? dayjs(endTime).toISOString() : null;

  const handleCheckboxChange = (checkedValues: any) => {
    setCheckboxValues(checkedValues);
  };
  const uploadDetailsAttachmentId = (id: any) => {
    setDetailsAttachmentId(id)
  }
  const handleDurationChange = (value: number) => {
    if (startTime) {
      const newEndTime = startTime.add(value, 'minute');
      setEndTime(newEndTime);
    }
  }


  const onFinish = async (values: any) => {

    setgetDateObj(values.date)

    const payload = {
      title: values.title,
      date: dayjs(values.date).utc().format(), 
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      duration: values.duration || timeDuration,
      timeZone: values.timeZone,
      venue: values.venue,
      agenda: values.agenda,
      mode: checkboxValues,
      attachment: detailsAttachmentId,
      // startTime: '2023-09-31T07:19:36.488Z',
      // endTime: '2023-09-31T09:19:36.488Z',
    }
    console.log('payload', payload)

    // {
    //   "title": "Chronic Disease Update Webinar",
    //   "date": "2023-04-05T09:01:50.434Z",
    //   "startTime": "2023-04-05T09:01:50.434Z",
    //   "endTime": "2023-04-05T09:01:50.434Z",
    //   "duration": 180,
    //   "timeZone": "UK Standard Time",
    //   "venue": "Zoom",
    //   "agenda": "Agenda",
    //   "mode": [
    //     "Q&A",
    //     "Presentaion"
    //   ],
    //   "attachment": "641169e3e0b1b1f6fa98d2c9"
    // }



    if (isEditWebinar === 'edit-webinar') {
      patchWebinarDetails({ payload, id })
    } else {
      const { error, data }: any = await postAddWebinarDetails({ payload })
      console.log("Details id", data)
      handelWebinarDetailsResponse(data?.data?._id)
    }

  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


// console.log("timeDuration=> ", timeDuration)


  useEffect(() => {
    if (path === '/webinar/view-webinar') {
      setisViewWebinar(true)
    } else {
      setisViewWebinar(false)
    }
    if (isEditWebinar === 'edit-webinar') {
      setCheckboxValues(upcomingWebinarDataById?.data?.mode)
      setStartTime(dayjs(upcomingWebinarDataById?.data?.startTime))
      setEndTime(dayjs(upcomingWebinarDataById?.data?.endTime))
    }

    console.log(dayjs(upcomingWebinarDataById?.data?.endTime))

  }, [id, upcomingWebinarDataById?.data, path, data ])


  return (
    <div className='details-wrapper-main'>
      <Form
        name="basic"
        initialValues={
          {
            title: upcomingWebinarDataById?.data?.title,
            // date: dayjs(upcomingWebinarDataById?.data?.date)?.locale('en')?.format('YYYY-MM-DD'),
            duration: upcomingWebinarDataById?.data?.duration,
            timeZone: upcomingWebinarDataById?.data?.timeZone,
            venue: upcomingWebinarDataById?.data?.venue,
            agenda: upcomingWebinarDataById?.data?.agenda,
          }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        // autoComplete="off"
        layout="vertical"
      >
        <Row gutter={[150, 35]} align="bottom">
          <Col xs={24} sm={24} md={12} lg={10}>
            <InputWrapper name='title' label='Title' placeHolder='Type here' disabled={isViewWebinar} type='text' />
          </Col>
          <Col xs={24} sm={24} md={12} lg={10}>
            <DatePickerWrapper name='date' label='Date' required={false} disabled={isViewWebinar} placeholder='yyyy/mm/dd' 
            onChange={(e:any)=> setgetDateObj(e)} />

          </Col>
          <Col xs={24} sm={24} md={12} lg={10}>
            {/* <SelectWrapper name='' label='Time' placeHolder="Select an option" required={false} disabled={isViewWebinar} options={[
              { label: 'Option 1', value: '2023-03-31T07:19:36.488Z' },
              { label: 'Option 2', value: '2023-03-31T07:19:36.488Z' },
            ]} /> */}
            <Form.Item
              label="Time"
              name=""
              rules={[{ required: false, message: 'Required field' }]}
            >
              <TimePicker.RangePicker
                defaultValue={[startTime, endTime]}
                format="HH:mm"
                className='start-and-end-time-picker' onChange={handleTimeChange} />
            </Form.Item>

          </Col>
          <Col xs={24} sm={24} md={12} lg={10}>
            <SelectWrapper name='duration' value={timeDuration} label='Duration' placeHolder="Select an option" defaultValue={timeDuration} required={false} disabled={isViewWebinar} options={[
              { label: '5m', value: 5 },
              { label: '10m', value: 10 },
              { label: '15m', value: 15 },
              { label: '20m', value: 20 },
              { label: '25m', value: 25 },
              { label: '30m', value: 30 },
              { label: '35m', value: 35 },
              { label: '40m', value: 40 },
              { label: '45m', value: 45 },
              { label: '50m', value: 50 },
              { label: '55m', value: 55 },
              { label: '60m', value: 60 },
            ]}
              onChange={handleDurationChange}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={10}>
            <SelectWrapper name='timeZone' label='Time Zone' placeHolder="Select an option" required={false} disabled={isViewWebinar} options={[
              { label: 'UK Standard Time', value: 'UK Standard Time' },
            ]} />
          </Col>
          <Col xs={24} sm={24} md={12} lg={10}>
            {/* <Form.Item
              label="Venue"
              name="Venue"
              rules={[{ required: false, message: 'Required field' }]}
            >
              <Input placeholder="Type here" style={{ width: '100%', height: '45px' }} disabled={isViewWebinar} />
            </Form.Item> */}
            <InputWrapper name='venue' label='Venue' placeHolder='Type here' disabled={isViewWebinar} type='text' />
          </Col>

          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Webinar Agenda"
              name="agenda"
              rules={[{ required: false, message: 'Required field' }]}
            >
              <TextArea rows={4} disabled={isViewWebinar} placeholder='Type here' />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Audio mode"
              name="mode"
              rules={[{ required: false, message: 'Required field' }]}
            >
              <div className="wrp-checkbox-grp">
                <Checkbox.Group
                  className="cus-checkbox-group"
                  options={options}
                  onChange={handleCheckboxChange}
                  value={checkboxValues}
                />
              </div>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={20}>
          <Form.Item
              label="Attachment"
              name="attachment"
              rules={[{ required: false, message: 'Required field' }]}
            >
            <UploadImage uploadCertificateId={uploadDetailsAttachmentId} />
            </Form.Item>
          </Col>
        </Row>
        {!isViewWebinar && <Button className='save-and-next-button fs-16 fw-600' htmlType='submit'>Save & Next</Button>}
      </Form>
    </div>
  )
}



export default Details