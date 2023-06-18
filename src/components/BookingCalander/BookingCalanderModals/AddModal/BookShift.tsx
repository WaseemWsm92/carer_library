import { useState } from "react";
import { Button, Col, Form, Input, Row, Select, Switch } from "antd";
import DownArrow from "../../../../assets/BookingCalander/images/drop-down.png";
import FilterIcon from "../../../../assets/BookingCalander/images/filters.png";
import Upload from "../../../../assets/BookingCalander/images/upload-icon.png";
import SelectWrapper from "../../../../shared/SelectWrapper/SelectWrapper";
import InputWrapper from "../../../../shared/InputWrapper/InputWrapper";
import DatePickerWrapper from "../../../../shared/DatePickerWrapper/DatePickerWrapper";
import { useAddNewShiftMutation, useDirectBookStaffMutation, useGetClientsListQuery, useGetDepartmentsListQuery, useGetStaffListQuery, useGetUserTypesListQuery } from "../../../../store/Slices/BookingCalendar";
import "./AddModal.scss";
import TimePickerWrapper from "../../../../shared/TimePickerWrapper/TimePickerWrapper";
import dayjs from "dayjs";

const BookShift = (props: any) => {
  const [clientId, setClientId] = useState("");
  const [errorMsg, setErrorMsg] = useState<any>("");
  const [directBookErrorMsg, setdirectBookErrorMsg] = useState<any>("");
  const { data: clientsList } = useGetClientsListQuery({});
  const { data: userTypesList } = useGetUserTypesListQuery({});
  const { data: userDepartmentsList } = useGetDepartmentsListQuery({ id: clientId });
  const { data: staffList } = useGetStaffListQuery({});
  const [addNewShift, { isLoading: bookShiftLoading }] = useAddNewShiftMutation();
  const [directBookStaff, { isLoading: directBookLoading }] = useDirectBookStaffMutation();

  const onFinish = async (values: any) => {
    values.shiftDate = dayjs(values.shiftDate).format("YYYY-MM-DD");
    values.startTime = `${values.shiftDate}T${dayjs(values.startTime).format("hh:mm:ss")}`;
    values.endTime = `${values.shiftDate}T${dayjs(values.endTime).format("hh:mm:ss")}`;
    values.staffRequired = props.name === "bookShift" ? Number(values.staffRequired) : 1;
    if (props.name === "bookShift") {
      const { error: bookShiftError }: any = await addNewShift(values);
      bookShiftError ? setErrorMsg(bookShiftError?.data?.error) : props.setIsAddModalOpen(false);
    }
    if (props.name === "directBook") {
      const { error: directBookError }: any = await directBookStaff(values);
      directBookError ? setdirectBookErrorMsg(directBookError?.data?.message) : props.setIsAddModalOpen(false);
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  function generateOptions(data: any[], labelFunction: (item: any) => string) {
    return data?.map((item: any) => {
      return {
        value: item["_id"],
        label: labelFunction(item),
      };
    });
  }

  return (
    <Form onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical" className="bookShift">
      <Row gutter={[10, 20]}>
        <Col xs={24} md={12}>
          <SelectWrapper
            label="Client Name"
            required={true}
            placeHolder="Select Client Name"
            options={generateOptions(clientsList?.data?.result, (item: any) => item.clientName)}
            name="careHomeId"
            onChange={(id: string) => setClientId(id)}
          />
        </Col>
        <Col xs={24} md={12}>
          <DatePickerWrapper disabledDate={(current:any) => current.isBefore(dayjs().subtract(1,"day"))} label="When do you need? Shift Date" placeholder="Choose dates" name="shiftDate" required />
        </Col>
        <Col xs={24} md={12}>
          <SelectWrapper
            label="Choose user type"
            required={true}
            placeHolder="Choose user type"
            options={generateOptions(userTypesList?.data?.result, (item: any) => `${item?.name} (${item?.shortForm})`)}
            name="carerType"
          />
        </Col>
        <Col xs={24} md={12}>
          <SelectWrapper
            label="Choose a shift"
            required={true}
            placeHolder="Chose a shift"
            options={[
              { value: "MORNING", label: "Morning" },
              { value: "AFTERNOON", label: "Afternoon" },
              { value: "LONGDAY", label: "Long Day" },
              { value: "NIGHT", label: "Night" },
            ]}
            name="shiftType"
          />
        </Col>
        <Col xs={24} md={12}>
          <TimePickerWrapper label="Start Time" name="startTime" required={true} placeHolder="hh:mm:ss" />
        </Col>
        <Col xs={24} md={12}>
          <TimePickerWrapper label="End Time" name="endTime" required={true} placeHolder="hh:mm:ss" />
        </Col>
        <Col xs={24} md={12}>
          <SelectWrapper label="Department" required={true} placeHolder="Select Shift Department" options={generateOptions(userDepartmentsList?.data, (item: any) => item.name)} name="department" />
        </Col>
        {props.name === "bookShift" && (
          <Col xs={24} md={12}>
            <InputWrapper label="No of Staff Required" required={true} type="number" name="staffRequired" placeHolder="Enter number" />
          </Col>
        )}
        {props.name === "directBook" && (
          <Col xs={24} md={12}>
            <SelectWrapper
              label="Select a staff name"
              required={true}
              placeHolder="Select a staff name"
              options={generateOptions(staffList?.data?.result, (item: any) => `${item.firstName} ${item.lastName}`)}
              name="staffId"
            />
            {/* <Form.Item label={<span className="label">Select a staff name</span>} name="staffNo">
              <div className="staff-wrapper">
                <Select
                  bordered={false}
                  suffixIcon={<img src={DownArrow} alt="dow n-arrow" />}
                  placeholder="Select a staff name"
                  size="large"
                  options={[
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                    { value: "3", label: "3" },
                  ]}
                />
                <span className="icon">
                  <img src={FilterIcon} alt="filter" />
                </span>
              </div>
            </Form.Item> */}
          </Col>
        )}
        <Col xs={24} md={12}>
          <InputWrapper label="Shift requested by" required={true} name="requestedBy" placeHolder="Type here" />
        </Col>
        {props.name === "directBook" && (
          <Col xs={24} md={12}>
            <Form.Item>
              <div className="switch-wrapper d-flex align-items-center">
                <Switch />
                <span style={{ fontWeight: 600 }}>Staff acceptence required [Optional]</span>
              </div>
            </Form.Item>
          </Col>
        )}
        <Col xs={24} md={24}>
          <Form.Item label={<span className="label">Optional Information, if any.</span>}>
            <Input.TextArea placeholder="Type here" style={{ border: "1.5px solid #A0A3BD", borderRadius: "3px" }} />
          </Form.Item>
        </Col>
        {props.name === "directBook" && (
          <Col xs={24} md={24}>
            <span></span>
            <Form.Item>
              <Input
                className="custom-file-input cursor-pointer"
                style={{ border: "1.5px solid #A0A3BD", borderRadius: "3px" }}
                size="large"
                type="file"
                suffix={<img src={Upload} alt="upload-icon" width={16} height={18} className="cursor-pointer" />}
              />
            </Form.Item>
          </Col>
        )}
        {errorMsg && <span style={{ color: "red" }}>{errorMsg}</span>}
        {directBookErrorMsg && <span style={{ color: "red" }}>{directBookErrorMsg}</span>}
        <Col xs={24} md={24} className="btn-wrapper d-flex">
          <Button type="primary" className="cancel-btn" onClick={() => props.setIsAddModalOpen(false)}>
            Cancel
          </Button>
          <Button loading={bookShiftLoading || directBookLoading} type="primary" className="save-btn" htmlType="submit">
            {props.name === "directBook" ? "Direct Book Staff" : "Save and Post Shifts"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default BookShift;
