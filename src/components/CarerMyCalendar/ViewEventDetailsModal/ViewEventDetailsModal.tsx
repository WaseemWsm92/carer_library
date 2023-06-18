import { Fragment } from "react"
import { Col, Modal, Row } from "antd"
import HomeIcon from '../../../assets/icons/home-pink.svg'
import '../../CarerMyCalendar/CarerMyCalendar.scss'

const ViewEventDetailsModal = ({ isViewModalOpen, setIsViewModalOpen, eventClicked }: any) => {
    const { title, extendedProps } = eventClicked?.event?._def
    console.log(eventClicked);

    const label: any = {
        address: "Address:",
        totalShiftHours: "Total Shift Hours:",
        date: "Date:",
        shiftTimingL: "Shift Timing:",
        totalShiftPay: "Total Shift Pay:",
        department: "Department:",
        distanace: "Distance from you:"
    }

    const name = [
        {
            id: "1",
            address: "Tho Grip, Linton, Cambridge, England, Cambridgeshire, CB21 4XN",
            totalShiftHours: '9.00 Hrs.',
            date: "May 22,Sun - 2022",
            shiftTimingL: "07:30 - 17:00",
            totalShiftPay: "£275.00",
            department: "DEP-1:",
            distanace: "Distance from you:"
        }
    ]


    return (
        <Fragment>
            <Modal title="More Information" className="carer-my-calendar-event-details" width={780} open={isViewModalOpen} centered footer={false} onOk={() => setIsViewModalOpen(false)} onCancel={() => setIsViewModalOpen(false)} >
                <div className="calendar-event-details-wrapper">
                    <div className="d-flex align-center">
                        <img src={HomeIcon} alt="" />
                        <span className="fs-24 fw-600" style={{ marginLeft: "15px", color: "#14142B" }}>Tall Tree Care Home</span>
                    </div>
                    {name.map((item: any) => (
                        <div style={{ paddingTop: "30px", paddingBottom: "10px" }}>
                            {Object.keys(item).map((data: any) => label[data] && (
                                <div className="d-flex align-center" style={{ paddingBottom: "15px" }}>
                                    <span className="fs-16 fw-600" style={{ width: "160px", color: "#14142B" }}>{label[data]}</span>
                                    <span className="fs-16" style={{ color: "#4E4B66" }}>{item[data]}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                    <span className="fs-12">About: Care homes provide accommodation and personal care for people who need extra support in their daily lives. Personal care might include help with eating, washing, dressing, going to the toilet or taking medication</span>
                </div>
            </Modal >
        </Fragment>
    )
}

export default ViewEventDetailsModal