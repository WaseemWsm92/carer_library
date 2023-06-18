import course1 from "../../.././../assets/images/Training/course-1.png";
import course2 from "../../.././../assets/images/Training/course-2.png";
import CourseCard from "./CourseCard";

const courseData = [
  {
    id: "1",
    img: course1,
    courseName: "BLS: Adults & Children , AED and Recovery Position",
    completed: 5,
  },
  {
    id: "2",
    img: course2,
    courseName: "BLS: Adults & Children , AED and Recovery Position",
    completed: 15,
  },
  {
    id: "3",
    img: course1,
    courseName: "BLS: Adults & Children , AED and Recovery Position",
    completed: 0,
  },
  {
    id: "4",
    img: course1,
    courseName: "BLS: Adults & Children , AED and Recovery Position",
    completed: 82,
  },
  {
    id: "5",
    img: course2,
    courseName: "BLS: Adults & Children , AED and Recovery Position",
    completed: 45,
  },
  {
    id: "6",
    img: course1,
    courseName: "BLS: Adults & Children , AED and Recovery Position",
    completed: 0,
  },
];

const renderTabData: any = {
  "In Progress": courseData.filter((item: any) => item.completed !== 0),
  Enrolled: courseData.filter((item: any) => item.completed === 0),
};

const CoursesList = ({ activeTab }: any) => {
  return (
    <div className="cards-list">
      {renderTabData[activeTab].map((course: any, index: number) => (
        <div key={index} className="course-content w-100">
          <CourseCard course={course} />
        </div>
      ))}
    </div>
  );
};

export default CoursesList;
