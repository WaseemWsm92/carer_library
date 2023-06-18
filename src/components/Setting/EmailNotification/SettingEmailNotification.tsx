
import { Tabs, TabsProps } from "antd";
import EmailNotificationTab from "./EmailNotificationTab/EmailNotificationTab";
import EmailTemplates from "./EmailTemplates/EmailTemplates";
import "./SettingEmailNotification.scss";

const SettingEmailNotification = () => {

  const items: TabsProps['items'] = [
    {
        key: '1',
        label: `Email Notification`,
        children:<EmailNotificationTab/>,
    },
    {
        key: '2',
        label: `Email Templates `,
        children: <EmailTemplates/>,
    },
];

    return (
      <div className='settings-email-notification'>

      <Tabs defaultActiveKey="1" items={items} type="card" tabPosition="left" />
  </div>
    )
}

export default SettingEmailNotification