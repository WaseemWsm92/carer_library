import { Button, Col, Row, Space, Tooltip } from 'antd'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import UploadImage from '../../../../Setting/SettingKeyInfo/UploadImage/UploadImage';
import { useGetRequestByIdQuery, useUpdateRequestMutation } from '../../../../../store/Slices/OnBoarding';

const IDUploadPassport = (props: any) => {

    const { handleSelectedStepValue, setActivePanelKey, auditCheck } = props;
    const { state }: any = useLocation();
    const userData: any = localStorage.getItem("careUserData")
    const token: any = JSON.parse(userData);
    const {data,isSuccess}=useGetRequestByIdQuery({id:state?.editProfile?._id ??token?.id,detail:"ABOUT"})
    const [updateRequest]=useUpdateRequestMutation()
    const [certificateId ,setCertificateId]=useState("") 
    const [isAudited, setIsAudited]=useState(false)
   let idUploadPassword:any
   if(isSuccess){
    idUploadPassword=data
   }
    const uploadCertificateId=(id:any)=>{
        setCertificateId(id)
    }
    const handleIdUploadProof=()=>{
      const payloadIdProof={idProof:certificateId,isAudited}
      updateRequest({id:state?.editProfile?._id,payload:payloadIdProof})
    }
    return (
        <div>

            <Row gutter={[20, 20]} >
                <Col xs={24}>
                    <span className='fw-500 fs-20 '>ID Proof Upload</span> <span>(Passport or Driving License)</span>
                </Col>
                <Col lg={21} xs={24}>
                    <UploadImage uploadCertificateId={uploadCertificateId} fileUrl={idUploadPassword?.data?.userprofile?.idProof?.fileName}/>
                </Col>
                <Col xs={24}>
                    <Space className='carer-buttons'>
                        {auditCheck && <Tooltip
                                        autoAdjustOverflow={true}
                                        showArrow={false}
                                        placement="bottomLeft" color="#65CDF0"
                                        title='Click to mark as audit'
                                    >

                                        <Button className='edit-module-button  audit-button  align-center d-flex' onClick={()=>setIsAudited(true)}>Audit</Button>
                                    </Tooltip>}
                        <Button className='edit-module-button bg-orange-color  align-center d-flex ' htmlType='submit' onClick={handleIdUploadProof} >Save</Button>
                        <Button className='edit-module-button   align-center d-flex btn-secondary' htmlType='submit' onClick={() => { handleSelectedStepValue('Add References'); setActivePanelKey('References') }}  >Continue</Button>
                    </Space>
                </Col>
            </Row>


        </div>
    )
}

export default IDUploadPassport