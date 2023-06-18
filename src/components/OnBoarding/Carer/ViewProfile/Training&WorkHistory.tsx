import { Col, Divider, Row, Space } from 'antd';
import Pdf from '../../../../assets/images/OnBoarding/pdf.svg';
import { Table } from 'antd';
import Word from '../../../../assets/images/OnBoarding/word.svg';
import Excel from '../../../../assets/images/OnBoarding/excel.svg';
import type { ColumnsType } from 'antd/es/table';
import {TraingingSpecialities } from '../../../../mock/OnBoarding';
import { useGetRequestByIdQuery } from '../../../../store/Slices/OnBoarding';
import ApiLoader from '../../../ApiLoader/ApiLoader';



interface ITrainingDetails {
    trainingName: string,
    certificates: string,
    certificateExpiryDate: string,
    image: string
}

const columns: ColumnsType<ITrainingDetails> = [
    {
        title: <span className='fw-600 fs-14'>Training Name </span>,
        dataIndex: 'name',
        key: 'name',
        width: 160,
        render: (_, text) =>

            <span className='fs-14 fw-400 title-color'>
                {text.trainingName}
            </span>

    },
    {
        title: <span className='fw-600 fs-14'>Certificate Issued</span>,
        dataIndex: 'issued',
        key: 'issued',
        width: 150,
        render: (_, text) =>

            <span className='fs-14 fw-400 title-color'>
                {/* {text.certificates} */}
            </span>

    },
    {
        title: <span className='fw-600 fs-14'>Certificate Expiry Date</span>,
        dataIndex: 'expiry',
        key: 'expiry',
        width: 160,

        render: (_, text) =>
            <span className='fs-14 fw-400 title-color'>
                {text.certificateExpiryDate}
            </span>

    },

    {
        title: <span className='fw-600 fs-14' >Attachments</span>,
        dataIndex: 'status',
        key: 'status',
        width: 100,

        render: (_, text) =>
            <span className='fs-14 fw-400 title-color'>
                <img src={text.image} alt="image" />
            </span>

    },


];


interface IWorkDetails {
    nameEmployer: string,
    positionEmployer: string,
    experience: string,
    leavingReason: string,
    startDate: string,
    endDate: string
}




const Workcolumns: ColumnsType<IWorkDetails> = [
    {
        title: <span className='fw-600 fs-14'> Name of Employer</span>,
        dataIndex: 'name',
        key: 'name',
        width: 180,
        render: (_, text) =>

            <span className='fs-14 fw-400 title-color'>
                {text.nameEmployer}
            </span>

    },
    {
        title: <span className='fw-600 fs-14'>Position</span>,
        dataIndex: 'position',
        key: 'position',
        width: 70,
        render: (_, text) =>

            <span className='fs-14 fw-400 title-color'>
                {text.positionEmployer}
            </span>

    },
    {
        title: <span className='fw-600 fs-14'>Experience</span>,
        dataIndex: 'experience',
        key: 'experience',
        width: 200,

        render: (_, text) =>
            <span className='fs-14 fw-400 title-color'>
                {text.experience}
            </span>

    },
    {
        title: <span className='fw-600 fs-14'>Reason for Leaving</span>,
        dataIndex: 'reason',
        key: 'reason',
        width: 200,

        render: (_, text) =>
            <span className='fs-14 fw-400 title-color'>
                {text.leavingReason}
            </span>

    },
    {
        title: <span className='fw-600 fs-14'>Start Date</span>,
        dataIndex: 'startDate',
        key: 'startDate',
        width: 160,

        render: (_, text) =>
            <span className='fs-14 fw-400 title-color'>
                {text.startDate}
            </span>

    },
    {
        title: <span className='fw-600 fs-14'>End Date</span>,
        dataIndex: 'endDate',
        key: 'endDate',
        width: 160,

        render: (_, text) =>
            <span className='fs-14 fw-400 title-color'>
                {text.endDate}
            </span>

    }


];

const TrainingWorkHistory = ({selectedTableData}:any) => {

  const {data,isLoading,isSuccess,isError}=useGetRequestByIdQuery({id:selectedTableData,detail:"TRAININGWORK"})
  let profileViewData:any;
  let fileExtension:any
  if(isLoading){
    profileViewData=<p>Loading...</p>
  }
  else if(isSuccess){
    profileViewData=data
    fileExtension=profileViewData?.data?.userprofile[0]?.tDetails[0]?.certificates

  }
  else if(isError){
    profileViewData=<p>Error...</p>
  }
  let fileUrl=`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${profileViewData?.data?.userprofile[0]?.tDetails[0]?.certificates?.mediaId
}.${profileViewData?.data?.userprofile[0]?.tDetails[0]?.certificates?.mediaMeta?.extension}`
    return (
      <>{isSuccess?
       <div>
        <p className='fw-500 fs-20'> Training Certificates</p>
         {profileViewData?.data?.userprofile[0]?.tDetails[0]?.certificates ?
        <Row gutter={[20, 12]}>
           
                    <Col xs={12}>
                        <Space direction='vertical' size={0}>
                            <span className='fw-600 fs-12'>
                            Certificate Expiry Date 
                            </span>

                            <Space>
                                 <span>{profileViewData?.data?.userprofile[0]?.tDetails[0]?.certificateExpiryDate}</span>
                              
                            </Space>

                        </Space>
                    </Col>
                    <Col xs={12}>
                        <Space direction='vertical' size={0}>
                            <span className='fw-600 fs-12'>
                            Certificate Issued Date 
                            </span>

                            <Space>
                                 <span>{profileViewData?.data?.userprofile[0]?.tDetails[0]?.certificateIssuedDate 
}</span>
                              
                            </Space>

                        </Space>
                    </Col>
                    <Col xs={12}>
                       {fileExtension? <Space direction='vertical' size={0}>
                            <span className='fw-600 fs-12'>
                            Documents
                            </span>

                            <Space>
                            {(fileExtension==="pdf" ||  fileExtension === "doc" || fileExtension === "ocx")  &&  <Space size={3} > <span className='d-flex align-center'><a href={fileUrl}><img src={Pdf} alt="" /></a></span> <span >doc.pdf</span></Space>}
        {(fileExtension==="png" || fileExtension==="jpeg" ||  fileExtension === "peg") &&  <Space size={3}>  <img src={Word} alt="image" className='d-flex align-center' /> <span>wrd.doc</span></Space>}
        {fileExtension==="xlsx"  &&   <Space size={3}> <img src={Excel} alt="image" className='d-flex align-center' /> <span>xsl.excel</span></Space>}
                              
                            </Space>

                        </Space> :"No Attachment"}
                    </Col>
                    <Col xs={12}>
                        <Space direction='vertical' size={0}>
                            <span className='fw-600 fs-12'>
                           Training Name
                            </span>

                            <Space>
                                 <span>{profileViewData?.data?.userprofile[0]?.tDetails[0]?.trainingName }</span>
                              
                            </Space>

                        </Space>
                    </Col>
            

        </Row>:"No Data"}
        <Divider dashed />
        <p className='fw-500 fs-20'> Additional Training Details </p>

        <div className='onboading-table-wrapper'>

          { <Table columns={columns} loading={isLoading} dataSource={profileViewData?.data?.userprofile[0]?.tDetails} scroll={{ x: "max-content" }} pagination={false} />}
        </div>

        <Divider dashed />
        <p className='fw-500 fs-20'> Work Experience </p>
        <div className='onboading-table-wrapper'>

        {<Table columns={Workcolumns} loading={isLoading} dataSource={profileViewData?.data?.userprofile[0]?.workExperience} scroll={{ x: "max-content" }} pagination={false} />}
        </div>

        <p className='fw-500 fs-20'> Specialities </p>
        <Row gutter={[20, 12]}>

            {
                TraingingSpecialities.map((ele) => <Col xs={12} key={ele.id}  >
                    <span className='fw-400 fs-14'>
                        {ele.title}
                    </span>
                </Col>)
            }
        </Row>





    </div>:<ApiLoader/>}</>
       
    )
}

export default TrainingWorkHistory