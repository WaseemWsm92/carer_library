import { Button } from "antd";

import viewIcon from '../../../assets/icons/view-icon.svg'
import editIcon from '../../../assets/icons/edit-icon-bold-blue.svg'
import deleteIcon from '../../../assets/icons/delete-icon-bold-blue.svg'

import optionalIcon from "../../../assets/images/Training/optional.png";
import newIcon from "../../../assets/images/Training/new.png";

import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../shared/DeleteModal/DeleteModal";
import { useState } from "react";
import { useDeleteCourseMutation } from "../../../store/Slices/ManageCourse";

const CourseCard = ({ courseData }: any) => {
  const navigate = useNavigate()


  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteCourse]= useDeleteCourseMutation()

  const handleDeleteSubmit = () => {
    
    setIsDeleteModal(false);
  };
  const handleCancelSubmit = (event:any) => {
    deleteCourse(event)
    setIsDeleteModal(false);
  };

  console.log("courseData", courseData)
 

  return (
    <>
      <div className="card">
        <div className="img-wrapper">
          <img className="card-image"
           src={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${courseData?.image[0]?.mediaId}.${courseData?.image[0]?.mediaMeta?.extension}`} alt="Course 1"
          //  src={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${text?.profilePhoto?.mediaId}.${text?.profilePhoto?.mediaMeta?.extension}`}
           />
          <div className="overlay-wrapper">
            <Button onClick={() => navigate(`/manage-courses/courses-detail/${courseData._id}`)} className="read-more-btn fs-16 fw-600">Read more</Button>
          </div>
        </div>
        <div className="card-content">
          <h2 className="title fs-14 fw-400" style={{height:'45px'}}>{courseData?.courseTitle}</h2>
          <p className="category fs-12 fw-700">
            Category : <span>{courseData?.courseType}</span>
          </p>
          <div className="flex-bottom-icons" style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: "10px" }}>
            <img className="cursor-pointer" onClick={() => navigate(`/manage-courses/courses-detail/${courseData._id}`)} src={viewIcon} alt="" />
            <img className="cursor-pointer" onClick={() => navigate(`/manage-courses/edit-course/${courseData._id}` , { state: { editProfile: courseData } })} src={editIcon} alt="" />
            <img className="cursor-pointer" onClick={()=> setIsDeleteModal(true)} src={deleteIcon} alt="" />
          </div>
        </div>
        <img
          className={courseData?.courseType === "Optional" ? "icon" : "new"}
          src={courseData?.courseType === 'Optional'  ? optionalIcon : newIcon}
          alt="icon"
        />
      </div>

      <DeleteModal
        setDeleteModal={setIsDeleteModal}
        deleteModal={isDeleteModal}
        submitTitle='Cancel'
        cancelTitle='Yes, Discard'
        title='Do you want to discard this Course?'
        onSubmit={handleDeleteSubmit}
        onCancel={() => handleCancelSubmit(courseData?._id)}
      />
    </>
  );
};
export default CourseCard;
