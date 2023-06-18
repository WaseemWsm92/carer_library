import { Col, Form, Rate, Row } from 'antd';
import React, { useState } from 'react';
import { ClientUpcomingShiftData, } from '../ClientManageShift.utils';
import { useGetUpComingShiftQuery, useUpdateCancelShiftMutation } from '../../../store/Slices/ClientShiftManage';
import CancelShiftModal from '../../ShiftManager/ShiftBooking/ShiftsModals/CancelShiftModal/CancelShiftModal';
import './ClientUpcomingShift.scss';

const ClientUpcomingShift = () => {
  const [isCancelOpenModal, setIsCancelOpenModal] = useState<boolean>(false);
  const [shiftId, setShiftId] = useState<string>('');
  const { data: clientUpcomingData } = useGetUpComingShiftQuery({});
  const [updateCancelShift] = useUpdateCancelShiftMutation();
  const [form] = Form.useForm();

  const handleCancelShift = async (e: any) => {
    setIsCancelOpenModal(false);
    const payload = e;
    await updateCancelShift({ clientId: shiftId, payload });
    form.resetFields();
  }

  return (
    <>
      <div className='client-upcoming-shift-wrapper bg-white'>
        <Row gutter={[20, 20]}>
          {clientUpcomingData?.data?.shifts.length > 0 ? clientUpcomingData?.data?.shifts?.map((item: any) => (
            <>
              <Col xl={6} lg={8} md={12} sm={12} xs={24} key={item.id}>
                <div className='upcoming-shift-wrapper bg-white'>
                  <div className='shift-img d-flex align-center'>
                    <img src={item.img} alt="" />
                    <div>
                      <h2 className='fs-16 fw-500 m-0 form-heading-color'>{`${item?.carer?.firstName} ${item?.carer?.lastName}`}</h2>
                      <p className='fs-12 fw-400 m-0 title-color'>{item?.careHome?.clientType}</p>
                      {item?.careHome?.clientRating?.map((data: any) => (
                        <Rate defaultValue={data.average || 0} allowHalf style={{ color: "#FABF35" }} disabled />
                      ))}
                    </div>
                  </div>
                  <div className='upcoming-content-wrap d-flex flex-column'>
                    {ClientUpcomingShiftData.map((icon: any, index: number) => (
                      <div className='d-flex align-center' style={{ gap: "15px" }} key={index}>
                        <img src={icon.src} alt="" />
                        <p className='m-0'>{icon.text(item)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="upcoming-btn">
                    <button type='button' className='white-color fs-16 fw-600 line-height-20 cursor-pointer' onClick={() => { setIsCancelOpenModal(true); setShiftId(item._id) }}>Cancel Booking</button>
                  </div>
                </div>
              </Col>
            </>
          )) : <span className='fs-16 fw-600 text-center w-100'>No data found</span>}
        </Row>
      </div>
      <CancelShiftModal
        onFinish={handleCancelShift}
        placeholder={"Staff are not Avaliable"}
        label={"Specify reason for Cancelling Shift"}
        open={isCancelOpenModal}
        onCancel={() => setIsCancelOpenModal(false)}
      />
    </>
  )
}

export default ClientUpcomingShift