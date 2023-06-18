import { Table, Button } from "antd";
import "./SettingWeekStartDay.scss";
import { ColumnsType } from "antd/es/table";
import { DataType, WeekStartDayData } from "../../../mock/WeekStartDay";

function SettingWeekStartDay() {

  const WeekStartDayColumns: ColumnsType<DataType> = [
    {
      title: 'Sr. No.',
      dataIndex: 'SNo',
      key: 'SNo',
    },
    {
      title: 'Start Day',
      dataIndex: 'StartDay',
      key: 'StartDay',
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      render: () => (
        <label className="week-start-day-checkbox">
          <input type="checkbox" name="option" value="checked" />
          <span className="radio"></span>
        </label>

      ),
    }
  ];

  return (
    <div className='week-start-day'>
      <div className="heading">
        <h1 className="fs-16 fw-600">Choose Your Week Start Day
        </h1>
      </div>

      <div>
        <Table
          className="common-setting-table"
          columns={WeekStartDayColumns}
          dataSource={WeekStartDayData}
          scroll={{ x: 768 }}
        />
      </div>

      <Button className="savebtn" type="primary" htmlType="submit">
        Save
      </Button>
    </div>

  );
}

export default SettingWeekStartDay;
