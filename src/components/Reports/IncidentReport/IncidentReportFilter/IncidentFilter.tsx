import React,{useState} from 'react'
// Ant Components
import { Col, DatePicker, DatePickerProps, Row, Select } from 'antd'
// SCSS
import "../../StaffAvailabilitySheet/StaffAvailabilitySheetCommonFilter/StaffAvailabilitySheetCommonFilter.scss";
// Assets
import datePicker from "../../../../assets/BookingCalander/images/date-picker.png";
import AddModal from '../IncidentReportModal/AddModal.tsx/AddModal';



const IncidentReportFilter = (props: any) => {
const [IsOpenIncidentAddModal, setIsOpenIncidentAddModal]=useState(false)
    const { dayAvailability } = props;

    const handleChangeFrom: DatePickerProps["onChange"] = (date, dateString) => {
        console.log(date, dateString);
    };
   

    return (
        <Row gutter={[20, 20]} className='staff-availability-sheet-common-filter-wrapper' justify="space-between">
              <Col  xs={24} md={24} xl={24} xxl={24}>  <button className='fs-16 fw-600 line-height-22 white-color cursor-pointer border-radius-6 d-flex align-items-center justify-center'
               style={{boxShadow:"0px 2px 0px rgba(0, 0, 0, 0.043)",backgroundColor:"#65CDF0",width:"104px",height:"46px",padding:" 12px 35px",border:"none"}}
               onClick={() => setIsOpenIncidentAddModal(true)}>Add</button>
              </Col>
            <Col xs={24} md={16} xl={14} xxl={12}>
                <Row gutter={[0, 20]} className="filter-wrapper">
                    {!dayAvailability && (
                        <>
                            <Col xs={24} sm={8}>
                                <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>User Type</p>
                                <div className="filter-column">
                                    <Select
                                        size="large"
                                        placeholder="All"
                                        defaultValue="All"
                                        optionFilterProp="children"
                                        className="app-select-wrap-class"
                                        popupClassName="app-select-popup-wrap-class"
                                        // onChange={handleCommonFilterChange}
                                        // filterOption={(input: any, option: any) => { (option?.label ?? "").toLowerCase().includes(input.toLowerCase()) }}
                                        options={[
                                            { value: "Arsalan Khan", label: "Arsalan Khan" },
                                            { value: "Ali Rehman", label: "Ali Rehman" },
                                            { value: "Kashif", label: "Kashif" },
                                        ]}
                                    />
                                </div>
                            </Col>

                            <Col xs={24} sm={8}>
                                <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}> Incident Date </p>
                                <div className="filter-column">
                                    <DatePicker
                                        suffixIcon={<img src={datePicker} alt="calander" />}
                                        className="date-picker"
                                        onChange={handleChangeFrom}
                                        placeholder="From"
                                    />
                                </div>
                            </Col>

                            <Col xs={24} sm={8}>
                            <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Status</p>
                                <div className="filter-column">
                                    <Select
                                        size="large"
                                        placeholder="All"
                                        defaultValue="All"
                                        optionFilterProp="children"
                                        className="app-select-wrap-class"
                                        popupClassName="app-select-popup-wrap-class"
                                        // onChange={handleCommonFilterChange}
                                        // filterOption={(input: any, option: any) => { (option?.label ?? "").toLowerCase().includes(input.toLowerCase()) }}
                                        options={[
                                            { value: "Arsalan Khan", label: "Arsalan Khan" },
                                            { value: "Ali Rehman", label: "Ali Rehman" },
                                            { value: "Kashif", label: "Kashif" },
                                        ]}
                                    />
                                </div>
                            </Col>
                        </>
                    )}

      
                </Row>
            </Col>
       <AddModal title={<span className='fw-500 fs-20 titile-color'>Incident Report</span>} IsOpenIncidentAddModal={IsOpenIncidentAddModal} IsCancelIncidentAddModal={() => setIsOpenIncidentAddModal(false)}/>
           
        </Row>
    )
}

export default IncidentReportFilter