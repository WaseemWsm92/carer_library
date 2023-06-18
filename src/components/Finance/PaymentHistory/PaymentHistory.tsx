import { useState } from "react";
import { Button, Col, DatePicker, Dropdown, Input, MenuProps, Row } from "antd";
import PaymentDetailsTable from "../PaymentDetailsTable/PaymentDetailsTable";
import ButtonArrow from '../../../assets/icons/arrow_down_white.svg'
import DownloadIcon from '../../../assets/icons/download_icon.svg'
import CopyIcon from '../../../assets/icons/CopyIcon.svg'
import XLSIcon from '../../../assets/icons/XLSIcon.svg'
import CSVIcon from '../../../assets/icons/CSVIcon.svg'
import SearchIcon from '../../../assets/images/OnBoarding/Search.svg';
import dayjs from "dayjs";
import weekOfYear from 'dayjs/plugin/weekOfYear';
import './PaymentHistory.scss'



const PaymentHistory = (props: any) => {
    const { selectedRowKeys, setSelectedRowKeys, PaymentDetailsType } = props;
    const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false)

    const [open, setOpen] = useState(false);
    const [selectedWeek, setSelectedWeek] = useState<any>('')
    dayjs.extend(weekOfYear)
    const handleChange = (values: any) => {
        setSelectedWeek(`Week ${dayjs(values).week()}, ${dayjs(values).startOf('week').format('DD-MM-YYYY')} to ${dayjs(values).endOf('week').format('DD-MM-YYYY')}`)
    }

    const CollpaseArrow = (props: any) => (
        <svg style={{ transform: isOpenDropdown ? "rotate(90deg)" : "" }} width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.293388 15.5185C-0.128851 14.9214 -0.0908185 14.0017 0.378335 13.4643L5.14875 8L0.378335 2.53571C-0.090819 1.99832 -0.128851 1.07862 0.293387 0.481518C0.715625 -0.115587 1.43824 -0.163992 1.9074 0.373403L7.62167 6.91885C7.86249 7.19469 8 7.58766 8 8C8 8.41234 7.86249 8.80531 7.62167 9.08115L1.9074 15.6266C1.43824 16.164 0.715626 16.1156 0.293388 15.5185Z" fill={props.fill} />
        </svg>
    )
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        console.log('click', e);
    };

    const items: MenuProps['items'] = [
        {
            label: <span style={{ color: "#EE2E7E",fontWeight:"400" }}>Copy This File</span>,
            key: '1',
            icon: <img src={CopyIcon} alt="" />,
        },
        {
            label: <span style={{ color: "#7D67FF",fontWeight:"400" }}>Download as XLS</span>,
            key: '2',
            icon: <img src={XLSIcon} alt="" />,
        },
        {
            label: <span style={{ color: "#52C41A",fontWeight:"400" }}>Download as CSV</span>,
            key: '3',
            icon: <img src={CSVIcon} alt="" />,
        }
    ];
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };
    return (
        <div className="payment-history-wrapper">
            <Row className='filters-wrapper' style={{ margin: "30px 0 10px 0" }}>
                <Col lg={18} md={24} style={{marginBottom:"20px"}}>
                    <span style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                        <Button className="pink-hover-effect" type="primary" style={{ background: "#65CDF0" }}>Select Staff  <span style={{ marginLeft: "10px" }}><img src={ButtonArrow} alt="" /></span></Button>
                        <button className="fs-16 fw-500" onClick={() => setOpen(!open)} style={{ background: "#4E132C",position:"relative",padding:"8px 35px",color:"white",border:"none",cursor:"pointer",borderRadius:"3px" }}>{!selectedWeek ? "Select Week" : selectedWeek} <span style={{ marginLeft: "10px" }}><img src={ButtonArrow} alt="" /></span></button>

                        {/* <Button onClick={() => setOpen(!open)} style={{ background: "#EE2E7E", color: "white", borderRadius: "2px", border: "none", height: "38px" }}>{!selectedWeek ? "Time Frame" : selectedWeek} <span style={{ marginLeft: "10px" }}><img src={ButtonArrow} alt="" /></span></Button> */}
                        
                        <DatePicker className='payment-history-datepicker' onOpenChange={(val) => setOpen(val)} open={open} onChange={handleChange} picker="week" />

                        <Dropdown menu={menuProps} trigger={['click']} overlayClassName='custom-download-dropdown'>
                            <Button type="primary" style={{ background: "#52C41A" }}>
                                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <img src={DownloadIcon} alt="" />
                                    Download
                                    <img src={ButtonArrow} alt="" />
                                </span>
                            </Button>
                        </Dropdown>
                    </span>
                </Col>
                <Col lg={6} xs={24}>
                    <div className="input-search-wrapper">
                        <Input
                            placeholder="search"
                            prefix={<img src={SearchIcon} alt="search icon" className="icon" />}
                        />
                    </div>
                </Col>
            </Row>
            <Row
                className={!isOpenDropdown ? 'collapse-closed' : 'transition-ease'}
                style={{ marginBottom: "30px", borderLeft: !isOpenDropdown ? "15px solid #F7B923" : "" }}
                onClick={() => setIsOpenDropdown(!isOpenDropdown)}
            >
                <Col span={24}>
                    <div className='d-flex' style={{ alignItems: 'baseline' }}>
                        <span style={{ marginRight: "16px" }}>
                            <CollpaseArrow fill="#F7B923" />
                        </span>
                        <div>
                            <span style={{ color: "#F7B923", fontSize: "20px", fontWeight: 500, cursor: "pointer" }}>Week 12, 12-07-2022 to 19-07-2022</span><br />
                            {!isOpenDropdown && <span style={{ fontSize: "14px" }}>No items</span>}
                        </div>
                    </div>
                </Col>
            </Row>
            {isOpenDropdown && <PaymentDetailsTable PaymentHistory={true} PaymentDetailsType={PaymentDetailsType} selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys} />}
            <Row
                className='collapse-closed'
                // className={!isOpenDropdown ? 'collapse-closed' : 'transition-ease'}
                style={{ marginBottom: "30px", borderLeft: !isOpenDropdown ? "15px solid #EE2E7E" : "" }}
                onClick={() => setIsOpenDropdown(!isOpenDropdown)}
            >
                <Col span={24}>
                    <div className='d-flex' style={{ alignItems: 'baseline' }}>
                        <span style={{ marginRight: "16px" }}>
                            <CollpaseArrow fill="#EE2E7E" />
                        </span>
                        <div>
                            <span style={{ color: "#EE2E7E", fontSize: "20px", fontWeight: 500, cursor: "pointer" }}>Week 12, 12-07-2022 to 19-07-2022</span><br />
                            {!isOpenDropdown && <span style={{ fontSize: "14px" }}>No items</span>}
                        </div>
                    </div>
                </Col>
            </Row>
            <Row
                // className={!isOpenDropdown ? 'collapse-closed' : 'transition-ease'}
                className='collapse-closed'
                style={{ marginBottom: "30px", borderLeft: !isOpenDropdown ? "15px solid #65CDF0" : "" }}
                onClick={() => setIsOpenDropdown(!isOpenDropdown)}
            >
                <Col span={24}>
                    <div className='d-flex' style={{ alignItems: 'baseline' }}>
                        <span style={{ marginRight: "16px" }}>
                            <CollpaseArrow fill="#65CDF0" />
                        </span>
                        <div>
                            <span style={{ color: "#65CDF0", fontSize: "20px", fontWeight: 500, cursor: "pointer" }}>Week 12, 12-07-2022 to 19-07-2022</span><br />
                            {!isOpenDropdown && <span style={{ fontSize: "14px" }}>No items</span>}
                        </div>
                    </div>
                </Col>
            </Row>
            <Row
                // className={!isOpenDropdown ? 'collapse-closed' : 'transition-ease'}
                className='collapse-closed'
                style={{ marginBottom: "30px", borderLeft: !isOpenDropdown ? "15px solid #4E132C" : "" }}
                onClick={() => setIsOpenDropdown(!isOpenDropdown)}
            >
                <Col span={24}>
                    <div className='d-flex' style={{ alignItems: 'baseline' }}>
                        <span style={{ marginRight: "16px" }}>
                            <CollpaseArrow fill="#4E132C" />
                        </span>
                        <div>
                            <span style={{ color: "#4E132C", fontSize: "20px", fontWeight: 500, cursor: "pointer" }}>Week 12, 12-07-2022 to 19-07-2022</span><br />
                            {!isOpenDropdown && <span style={{ fontSize: "14px" }}>No items</span>}
                        </div>
                    </div>
                </Col>
            </Row>
        </div >
    )
}

export default PaymentHistory