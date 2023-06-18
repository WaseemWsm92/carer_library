import { useState } from "react";
import { Avatar, Button, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import StaffInputWrapper from "./StaffInputWrapper";
import { StaffCategory, StaffName, StaffStatus } from "../StaffRateSetupData";
import AvatarImg from "../../../../../assets/images/finance-setup/avatar.png";
import DownArrow from "../../../../../assets/icons/finance-setup/down-arrow.png";
import "./StaffRateAccordianBody.scss";

interface Props {
  accordianName: string;
}
const StaffRateAccordiansBody = (props: Props) => {
  const { accordianName } = props;
  const [userData, setUserData] = useState([
    { id: "1", user: "user", data: [{ category: "", weekDay: "", saturday: "", sunday: "", bankHoliday: "" }] },
  ]);

  const handleAddSubItem = (id: string) => {
    const newArr = [...userData];
    const index = newArr.findIndex((user) => user.id === id);
    const obj = { category: "", weekDay: "", saturday: "", sunday: "", bankHoliday: "" };
    newArr[index].data.push(obj);
    setUserData(newArr);
  };

  const handleAddNewStaff = () => {
    let id: number | string = userData.length + 1;
    id = id.toString();
    setUserData([...userData, { id, user: `new user${id}`, data: [{ category: "", weekDay: "", saturday: "", sunday: "", bankHoliday: "" }] }]);
  };

  return (
    <div className="staff-rate-accordian">
      {userData.map((users: any) => (
        <div style={{ paddingBottom: "1rem" }}>
          <div className="d-flex" style={{ alignItems: 'baseline' }}>
            {accordianName !== "Staff Category Rate" && (
              <div style={{ minHeight: "100%", position: 'relative' }}>
                {users?.id === "1" && (
                  <p className="fw-600 m-0" style={{ paddingLeft: ".5rem" }}>
                    {accordianName === "Client Based Rate" ? "Client" : "Staff"} Name
                  </p>
                )}
                <div
                  className="d-flex align-center"
                  style={{
                    height: "47px",
                    border: "1px solid #D9DBE9",
                    borderLeft: "5px solid #65CDF0",
                    width: "268px",
                    marginTop: "13px",
                    paddingLeft: "1rem",
                    position: 'inherit',
                    top: users?.id === "1" ? '' : '10px'
                  }}
                >
                  {accordianName !== "Client Based Rate" && (
                    <Avatar size="small" style={{ height: "29.27px", width: "29.27px" }} icon={<img src={AvatarImg} alt="avatar-img" />} />
                  )}
                  <Select
                    suffixIcon={<img src={DownArrow} alt="select-arrow" />}
                    showArrow={accordianName === "Client Based Rate" ? true : false}
                    bordered={false}
                    options={StaffName}
                    style={{ borderRadius: "0px", width: "100%" }}
                    placeholder={<span style={{ color: "#A0A3BD" }}>Select Name</span>}
                  />
                </div>
              </div>
            )}
            <div style={{ height: "100%", marginLeft: accordianName === "Staff Category Rate" ? "0" : "20px" }}>
              <div className="right-wrapper">
                {users.data.map((_: any, i: number) => (
                  <div className="d-flex" style={{ gap: "1rem" }}>
                    <StaffInputWrapper
                      title={users?.id === "1" && i === 0 && "Staff Category"}
                      placeholder="Select Category"
                      isSelect
                      options={StaffCategory}
                    />
                    {accordianName === "Staff Category Rate" && (
                      <StaffInputWrapper
                        title={users?.id === "1" && i === 0 && "Staff Status"}
                        placeholder="Select Status"
                        isSelect
                        options={StaffStatus}
                      />
                    )}
                    <StaffInputWrapper title={users?.id === "1" && i === 0 && "Week Day"} />
                    <StaffInputWrapper title={users?.id === "1" && i === 0 && "Saturday"} />
                    <StaffInputWrapper title={users?.id === "1" && i === 0 && "Sunday"} />
                    <StaffInputWrapper title={users?.id === "1" && i === 0 && "Bank Holiday"} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {accordianName !== "Client Based Rate" && (
            <Button
              className="d-flex align-center fs-14 fw-400"
              style={{ width: "100%", height: "47px", paddingLeft: '10px', borderLeft: "5px solid #65CDF0", color: "#A0A3BD", borderRadius: 0 }}
              onClick={() => handleAddSubItem(users.id)}
              block
              icon={<PlusOutlined style={{ color: "#A0A3BD" }} />}
            >
              Add SubItems
            </Button>
          )}
        </div>
      ))}
      {accordianName !== "Staff Category Rate" && (
        <Button type="primary" htmlType="submit" className="border-radius-4 fs-16 fw-600" onClick={handleAddNewStaff} style={{ marginBlock: "1rem" }}>
          Add New {accordianName === "Client Based Rate" ? "Client" : "Staff"}
        </Button>
      )}
    </div>
  );
};

export default StaffRateAccordiansBody;
