import { WarningFilled } from '@ant-design/icons';
import { notification } from 'antd';
import React from 'react'
import successGreenIcon from "../assets/icons/snackbar-success.png";
import snackbarCloseIcon from "../assets/icons/snackbar-cross.png";


export default function AppSnackbar({ ...args }) {
  // const { type, message, ...remainingArgs } = args;
  const { type, messageHeading, message } = args;

  notification.config({
    placement: 'topRight',
    top: 80,
    duration: 3,
  });

  notification.open({
    type,
    message: <>
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", marginLeft: "1.25rem", }}>
        <span className='fs-14 fw-600' style={{ color: "#14142B", lineHeight: "17px", width: "100%" }}>{type === "error" ? "Failed!" : `${messageHeading ?? 'Congratulations!'}`}</span><br />
        <span className='fs-14 fw-400' style={{ color: "#4E4B66", lineHeight: "22px" }}>{message}</span>
      </div>
    </>,
    className: `custom-notification-class ${type === "error" && "error-snackbar"}`,
    style: {
      background: `${type === "error" ? "#ff4d4f" : "#DDECD5"}`,
      border: `1px solid ${type === "error" ? "red" : "#52C41A"}`,
    },
    icon: type === "error" ? <WarningFilled style={{ color: "#fff", width: "16px", height: "16px" }} /> : <img src={successGreenIcon} alt="iconn" />,
    closeIcon: <img src={snackbarCloseIcon} alt="close" />,
  });
}
