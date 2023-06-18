
// Ant Components
import { Col, Row, Select, Space } from 'antd'

// Assets
import greenHoursWorked from "../../../assets/icons/Report/green-hours-worked.png";
import blueTimeIcon from "../../../assets/icons/Report/blue-timer.png";
import redFileIcon from "../../../assets/icons/Report/red-file.png";
import purpleCopyIcon from "../../../assets/icons/Report/purple-copy.png";
import verticalLineImage from "../../../assets/images/Reports/vertical-line.png";

// SCSS
import "./CommonReportChildFilters.scss";

const CommonReportChildFilters = (props: any) => {
    const { filtersArray, rightCards, extraCards, extraCardsData,setFilterClientName ,setCarerType} = props;



    const handleCommonFilterChange = (value: keyof typeof filtersArray,selectedOption: any) => {
        if(selectedOption?.labelNameValue==="Client Name"){
          setFilterClientName(value)
        }
        if(selectedOption?.labelNameValue==="User Type"){
           setCarerType(value)
        }
       
       
    }

    return (
        <Row gutter={[0, 20]} className='common-report-child-filter-wrapper'>
            {filtersArray.length && filtersArray.map((singleItem: any) => (
                <Col key={singleItem.key} xs={24} md={!!rightCards ? 8 : 12} lg={8} xl={!!rightCards ? 8 : 6} xxl={!!rightCards ? 8 : 4}>
                    {/* xs={24} md={12} lg={8} xl={6} xxl={4}  */}
                    <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>{singleItem.labelName}</p>
                    <div className={`${!!extraCards && "not-a-border-col"}   filter-column`}>
                        <Select
                            size="large"
                            placeholder={singleItem?.placeholder}
                            optionFilterProp="children"
                            className="app-select-wrap-class"
                            popupClassName="app-select-popup-wrap-class"
                            style={{ width: "100%" }}
                            onChange={handleCommonFilterChange}
                            options={!!singleItem?.optionsArray.length && singleItem?.optionsArray.map((item: any) => ({
                                value: item?.value,
                                label: item?.label,
                                labelNameValue:item?.labelNameValue
                            }))}
                        />
                    </div>
                </Col>
            ))}

            {/* If certain components have some extra div beneath filters */}
            {/* Will Be Implemented Dyamically */}
            {!!extraCards && (
                <Col xs={24} md={24} lg={20} xl={24} xxl={20} style={{ margin: "2.813rem auto 1rem auto" }} className="apply-border-to-pre not-a-border-col">
                    <Row gutter={[16, 32]} className="extra-cards-parent">
                        <Col xs={24} md={11} xl={6} xxl={5}>
                            <Space size={16} className="extra-cards">
                                <div className='extra-cards-bg-div-parent'>
                                    <div className='extra-cards-bg-div'>
                                    </div>
                                    <img src={greenHoursWorked} alt="hours worked" />
                                </div>
                                <div>
                                    <p className='fs-20 fw-500 line-height-28 m-0 extra-card-heading' style={{ color: "#00AC4F" }}>{extraCardsData?.totalHoursWorked ?? "6789.78"} </p>
                                    <p className='fs-14 fw-400 line-height-22 m-0'>Total Hours Worked</p>
                                </div>
                            </Space>
                        </Col>
                        <Col xs={0} md={2} xxl={1} className="text-center">
                            <img src={verticalLineImage} alt="vertical line" />
                        </Col>
                        <Col xs={24} md={11} xl={6} xxl={5}>
                            <Space size={16} className="extra-cards">
                                <div className='extra-cards-bg-div-parent'>
                                    <div className='extra-cards-bg-div'>
                                    </div>
                                    <img src={blueTimeIcon} alt="hours worked" style={{ margin: "auto" }} />
                                </div>
                                <div>
                                    <p className='fs-20 fw-500 line-height-28 m-0 extra-card-heading' style={{ color: "#0F5FC2" }}>{extraCardsData?.clientAmount ?? "694.00"}</p>
                                    <p className='fs-14 fw-400 line-height-22 m-0'>{extraCardsData?.clientAmount ? "Client Amount" : "Hours this month"}</p>
                                </div>
                            </Space>
                        </Col>
                        <Col xs={0} xl={2} xxl={1}>
                            <img src={verticalLineImage} alt="vertical line" />
                        </Col>
                        <Col xs={24} md={11} xl={6} xxl={5}>
                            <Space size={16} className="extra-cards">
                                <div className='extra-cards-bg-div-parent'>
                                    <div className='extra-cards-bg-div'>
                                    </div>
                                    <img src={redFileIcon} alt="hours worked" style={{ margin: "auto" }} />
                                </div>
                                <div>
                                    <p className='fs-20 fw-500 line-height-28 m-0 extra-card-heading' style={{ color: "#DA001A" }}>{extraCardsData?.staffAmount ?? "£"} </p>
                                    <p className='fs-14 fw-400 line-height-22 m-0'>{extraCardsData?.staffAmount ? "Staff Amount" : "Settled Invoice"}</p>
                                </div>
                            </Space>
                        </Col>
                        <Col xs={0} md={2} xl={0} xxl={1} className="text-center">
                            {/* style={{ margin: "0 2.125rem" }} */}
                            <img src={verticalLineImage} alt="vertical line" />
                        </Col>
                        <Col xs={24} md={11} xl={6} xxl={5}>
                            <Space size={16} className="extra-cards">
                                <div className='extra-cards-bg-div-parent'>
                                    <div className='extra-cards-bg-div'>
                                    </div>
                                    <img src={purpleCopyIcon} alt="hours worked" style={{ margin: "auto" }} />
                                </div>
                                <div>
                                    <p className='fs-20 fw-500 line-height-28 m-0 extra-card-heading' style={{ color: "#8B44FD" }}>{extraCardsData?.staffAmount ?? "£ 174.38"}</p>
                                    <p className='fs-14 fw-400 line-height-22 m-0'>{extraCardsData?.staffAmount ? "Diff. |£|" : "Pending Invoice"}</p>
                                </div>
                            </Space>
                        </Col>
                    </Row>
                </Col>
            )}

        </Row>
    )
}

export default CommonReportChildFilters