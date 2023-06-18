import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Notifications from "../../assets/icons/sidebar/notifications.png";
import User1 from "../../assets/images/notifications/img1.png";
import User2 from "../../assets/images/notifications/img2.png";
import User3 from "../../assets/images/notifications/img3.png";
import { Popover } from "antd";
import "./Header.scss";

const NotificationsPopup = () => {
  const [isOpenNotification, setIsOpenNotification] = useState(false);

  const handleOpenChange = (newisOpenNotification: boolean) => {
    setIsOpenNotification(newisOpenNotification);
  };
  const notifications = [
    {
      day: "Today",
      total: "03",
      notification: [
        {
          img: User1,
          description:
            "Tommorow You have upcomming shift with Tall Tree on 08:30am",
          date: "08:40 AM - August 2, 2022",
        },
        {
          img: User2,
          description: "Your upcomming shift is cancelled by John Doe",
          date: "08:40 AM - August 2, 2022",
        },
        {
          img: User3,
          description: "John Doe has provided sign off on your completed shift",
          date: "08:40 AM - August 2, 2022",
        },
      ],
    },
    {
      day: "Yesterday",
      total: "02",
      notification: [
        {
          img: User1,
          description:
            "Tommorow You have upcomming shift with Tall Tree on 08:30am",
          date: "08:40 AM - August 2, 2022",
        },
        {
          img: User2,
          description: "Your upcomming shift is cancelled by John Doe",
          date: "08:40 AM - August 2, 2022",
        },
      ],
    },
  ];
  const content = (
    <div className="notification">
      {notifications.map((item: any) => (
        <div key={uuidv4()}>
          <div className="card-title d-flex">
            <span className="fs-14 fw-500" style={{ color: "#14142B" }}>
              {item.day}
            </span>
            <span className="fs-14 fw-500" style={{ color: "#65CDF0" }}>
              ({item.total})
            </span>
          </div>
          <div className="detailed-notifications">
            {item.notification.map((val: any) => (
              <div className="card" key={uuidv4()}>
                <div className="d-flex">
                  <img
                    src={val.img}
                    alt="notificationImg"
                    width={40}
                    height={40}
                  />
                  <div className="description">
                    <p
                      className="m-0 fw-400 fs-12"
                      style={{ color: "#4E4B66" }}
                    >
                      {val.description}
                    </p>
                    <p
                      className="m-0 fw-400 label-color"
                      style={{ fontSize: "8px" }}
                    >
                      {val.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <Popover
      content={content}
      title={false}
      arrow={false}
      trigger="click"
      open={isOpenNotification}
      onOpenChange={handleOpenChange}
      rootClassName="notifications-popup"
    >
      <img
        src={Notifications}
        alt="notifications"
        height={22}
        width={18}
        className="cursor-pointer"
      />
    </Popover>
  );
};

export default NotificationsPopup;
