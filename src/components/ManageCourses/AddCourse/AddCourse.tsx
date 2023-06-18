import { Tabs, TabsProps } from 'antd';
import React, { useEffect, useState } from 'react'
import "./AddCourse.scss"
import CreateYourContent from './CreateYourContent/CreateYourContent';
import PlanYourCourse from './PlanYourCourse/PlanYourCourse';
import PublishYourContent from './PublishYourCourse/PublishYourCourse';

const AddCourse = () => {

  const [tabsValue, setTabsValue] = useState('1')
  const [responseId, setresponseId] = useState()

  const onChange = (key: string) => {
    // console.log(key);
    setTabsValue(key)
  };


  const handleTabsValueChange = (value: string) => {
    setTabsValue(value);
  }

  const handleResponseId = (value:any) => {
    setresponseId(value);
  }
  
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Plan your course`,
      children: <PlanYourCourse handleTabsValueChange={handleTabsValueChange} handleResponseId={handleResponseId}/>,
    },
    {
      key: '2',
      label: `Create your content`,
      children: <CreateYourContent handleTabsValueChange={handleTabsValueChange} responseId={responseId}/>,
    },
    {
      key: '3',
      label: `Publish your course`,
      children: <PublishYourContent responseId={responseId}/>,
    },
  ];

  return (
    <div className='wrapper-add-course'>
      {/* <Tabs className='tabs-wrapper-styles' defaultActiveKey={tabsValue} items={items} onChange={onChange} /> */}
      <Tabs className='tabs-wrapper-styles' activeKey={tabsValue} items={items} onChange={setTabsValue} />
    </div>
  )
}

export default AddCourse