import { Tabs } from 'antd'
import type { TabsProps } from 'antd';
import React from 'react'
import AvailabilitySheet from './AvailabilitySheet/AvailabilitySheet';
import WeekAvailability from './WeekAvailability/WeekAvailability';
import DayAvailability from './DayAvailability/DayAvailability';
import './AvailabilityCalendar.scss';

const AvailabilityCalendar = () => {

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Availability Sheet`,
      children: <AvailabilitySheet />,
    },
    // {
    //   key: '2',
    //   label: `Week Availability Sheet Download`,
    //   children: <WeekAvailability />
    // },
    // {
    //   key: '3',
    //   label: `Day Availability Sheet Download`,
    //   children: <DayAvailability />
    // },
  ];
  return (
    <div className='AvailabilityCalendar-tab-wrapper'>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}

export default AvailabilityCalendar