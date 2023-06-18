import { useEffect } from "react";
import { allCourses } from "../../../../mock/TrainingData/CoursesData";
import { useGetViewAllCoursesByCategoryQuery } from "../../../../store/Slices/Training";
import CourseCard from "./CourseCard";

const CoursesList = () => {

  const { data, isLoading, isError, isSuccess } = useGetViewAllCoursesByCategoryQuery({courseType:'MANDATORY'})
  let getCoursesQuery: any;
  if (isLoading) {
    getCoursesQuery = <p>Loading...</p>
  }
  else if (isSuccess) {
    getCoursesQuery = data
  }
  else if (isError) {
    getCoursesQuery = <p>Error...</p>
  }
  console.log("getCoursesQuery =>>",getCoursesQuery.data)

  useEffect(() => {
    
  }, [data])
  

  return (
    <div className="courses-list">
      <div className="cards-list">
        {getCoursesQuery.data && getCoursesQuery?.data?.map((course: any) => (
          <div className="single-card">
            <CourseCard courseData={course} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesList;
