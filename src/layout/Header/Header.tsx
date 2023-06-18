import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Avatar, Popover, Space } from "antd";
import { CaretDownOutlined, MenuOutlined } from "@ant-design/icons";
import UserImg from "../../assets/icons/sidebar/userimg.png";
import SearchImg from "../../assets/images/sidebar/Search.png";
import { ReactComponent as User } from "../../assets/icons/sidebar/user.svg";
import { ReactComponent as ChangePassword } from "../../assets/icons/sidebar/changePassword.svg";
import { ReactComponent as Logout } from "../../assets/icons/sidebar/logout.svg";
import NotificationsPopup from "./Notifications";
import "../../sass/common.scss";
import "./Header.scss";
import { useNavigate } from "react-router";

const TopHeader = ({ setIsOpen }: any) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isExpandedSEarchbar, setIsExpandedSearchbar] = useState(false);

  const { role }: any = JSON.parse(
    localStorage.getItem("careUserData") || "{}"
  );

  const handleExpand = () => {
    const search: any = document.querySelector(".search-input");
    search.classList.toggle("search-expanded");
    setIsExpandedSearchbar(!isExpandedSEarchbar);
  };
  const profileDropdown = [
    {
      title: "Profile Preview",
      icon: <User />,
    },
    {
      title: "Change Password",
      icon: <ChangePassword />,
    },
    {
      title: "Logout",
      icon: <Logout />,
    },
  ];
  return (
    <div
      className="header"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
        gap: "20px",
        marginRight: "20px",
      }}
    >
      <div className={`container ${isExpandedSEarchbar && "expand-container"}`}>
        <input className="search-input" type="text" placeholder="Type here" />
        <button className="search-wrapper" onClick={handleExpand}>
          <img src={SearchImg} alt="searchImg" />
        </button>
      </div>
      <NotificationsPopup />
      <div className="adminDetail">
        <Popover
          rootClassName="profile-dropdown"
          content={
            <div>
              {profileDropdown.map((item) => (
                <div
                  key={uuidv4()}
                  onClick={() => {
                    if (item?.title === "Logout") {
                      localStorage.removeItem("careUserData");
                      localStorage.clear();
                      navigate("/login");
                    }
                  }}
                  className='profile-item'
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    marginBlock: "10px",
                  }}
                >
                  {item.icon}
                  <span className="fs-14 title-color cursor-pointer">{item.title}</span>
                </div>
              ))}
            </div>
          }
          trigger="click"
          open={open}
          onOpenChange={() => setOpen(false)}
        >
          <Space onClick={() => setOpen(!open)}>
            <Avatar style={{ verticalAlign: "middle" }} size="large">
              <img src={UserImg} alt="userimg" width={40} />
            </Avatar>
            <div
              className="details"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <p
                className="m-0 label-color fw-600 fs-14 cursor-pointer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <span style={{ height: "20px" }}>
                  Sophie Grace <CaretDownOutlined className="fs-16" />
                </span>
                <span
                  className="fs-12 fw-400"
                  style={{ textTransform: "capitalize" }}
                >
                  {role}
                </span>
              </p>
            </div>
          </Space>
        </Popover>
      </div>
      <div className="togglebar" onClick={() => setIsOpen(true)}>
        <MenuOutlined className="fs-18  text-white" />
      </div>
    </div>
  );
};

export default TopHeader;
