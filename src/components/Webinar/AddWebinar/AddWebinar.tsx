import { Tabs, TabsProps } from 'antd';
import React, { useEffect, useState } from 'react'
import './AddWebinar.scss'
import Attendees from './Attendees/Attendees';
import Details from './Details/Details';
import { useGetUpcomingWebinarByIDQuery } from '../../../store/Slices/Webinar/UpcommingWebinar';
import { useLocation } from 'react-router';

const AddWebinar = () => {


  const location = useLocation();
  const path = location.pathname;
  // console.log('path', path)

  const { state }: any = useLocation()
  // console.log("state",state?.editDetails)

  const { pathname } = useLocation()
  const route = pathname.split('/')
  const id = route[3]
  console.log("asdsadsdasd", id)

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


  

  const [webinarDetailsResponse, setWebinarDetailsResponse] = useState()

  const handelWebinarDetailsResponse = (element:any) => {
    setWebinarDetailsResponse(element)
  };

  console.log('webinarDetailsResponse', webinarDetailsResponse)

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Details`,
      children: <Details handelWebinarDetailsResponse={handelWebinarDetailsResponse} />,
    },
    {
      key: '2',
      label: `Attendees`,
      children: <Attendees webinarDetailsResponse={webinarDetailsResponse} upcommingWebinarByIdData={upcomingWebinarDataById?.data}/>,
    },
  ];

  useEffect(() => {
    
  }, [data])
  

  return (
    <div className='wrapper-add-webinar'>
      <Tabs defaultActiveKey="1" className='tabs-wrapper-styles' items={items} onChange={onChange} />
    </div>
  )
}

export default AddWebinar