import { useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

import CoursesList from "./CoursesCards/CardsList";
import "./MyCourses.scss";

const MyCourses = () => {
  const [activeTab, setActiveTab] = useState("In Progress");
  const items: TabsProps["items"] = [
    {
      key: "In Progress",
      label: `In Progress`,
      children: <CoursesList activeTab={activeTab} />,
    },
    {
      key: "Enrolled",
      label: `Enrolled`,
      children: <CoursesList activeTab={activeTab} />,
    },
  ];
  const onChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className="my-courses-wrapper">
      <Tabs defaultActiveKey="In Progress" items={items} onChange={onChange} />
    </div>
  );
};

export default MyCourses;
