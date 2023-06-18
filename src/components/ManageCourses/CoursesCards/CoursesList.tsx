
import { allCourses } from "../../../mock/ManageCoures/CoursesData";
import { useGetCoursesQuery } from "../../../store/Slices/ManageCourse";
import CourseCard from "./CourseCard";

const CoursesList = ({searchManageCourses}:any) => {
   //query parameters of search and filter
 const paramsObj: any = {};
 if (searchManageCourses) paramsObj["search"] = searchManageCourses;
 const query =  "&" + new URLSearchParams(paramsObj).toString();
 
  const { data, isLoading, isError, isSuccess } = useGetCoursesQuery({query})

  let manageCourse: any;
  if (isLoading) {
    manageCourse = <p>Loading...</p>
  }
  else if (isSuccess) {
    manageCourse = data
  }
  else if (isError) {
    manageCourse = <p>Error...</p>
  }
  // console.log(manageCourse?.data)






  return (
    <div className="courses-list">
      <div className="cards-list">
        {manageCourse?.data?.map((course: any) => (
          <div className="single-card">
            <CourseCard courseData={course} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesList;
