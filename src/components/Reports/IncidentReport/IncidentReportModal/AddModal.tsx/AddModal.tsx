import { Modal, Row, Col, Space, Button, Form, Input, } from 'antd'
import React, { useState } from 'react'
import DatePickerWrapper from '../../../../../shared/DatePickerWrapper/DatePickerWrapper';
import SelectWrapper from '../../../../../shared/SelectWrapper/SelectWrapper';
import InputWrapper from '../../../../../shared/InputWrapper/InputWrapper';
import './AddModal.scss'
import TextArea from 'antd/es/input/TextArea';

import UploadImage from '../../../../Setting/SettingKeyInfo/UploadImage/UploadImage';
const AddModal = (props: any) => {
  const { IsOpenIncidentAddModal, IsCancelIncidentAddModal, title, onFinish } = props;
  const [UserRoleSelectFilter, setUserRoleSelectFilter] = useState<string | undefined>();
  const [form] = Form.useForm();
  const onFinishFailed = (values: any) => {
    console.log('Failed:', values);
    onFinish(values)
    form.resetFields();
  };
  return (
    <Row className='incident-report-modal-wrapper' style={{height:"500px" , overflow:"scroll"}}>
      <Modal centered
        open={IsOpenIncidentAddModal}
        title={title}
        onCancel={IsCancelIncidentAddModal}
        footer={false}
        width={888}
        // style={{maxHeight: "500px" ,overflow:"scroll"}}
        className='modal-incident-report'
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish} form={form}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Row gutter={[16, 16]} >
            <Col xs={24} sm={24} md={12} lg={12}>
              <InputWrapper name='reportedby' label='Reported by' placeHolder='Type here' type='text' disabled={props.disabled} required={true} />
            </Col>

            <Col xs={24} sm={24} md={12} lg={12}>
              <SelectWrapper name='userRole' label='User Role' placeHolder="Select  option" defaultValue="Select user role" required={true} options={[
                { label: 'Carer', value: "carer" },
                { label: 'Admin', value: "admin" },
                { label: 'Coordinator', value: "coordinator" },

              ]}
                value={UserRoleSelectFilter}
                onChange={(value: string) =>
                  value
                    ? setUserRoleSelectFilter(value)
                    : setUserRoleSelectFilter("")
                }
                disabled={props.disabled}

              />
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} >
              <Form.Item
                label="Nature of Incident"
                name="natureOfIncident"
                rules={[{ required: true, message: 'Required field' }]}
              >
                <Input placeholder='Type here' type='text' disabled={props.disabled} required={true} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} >
              <DatePickerWrapper name='dateOfOccurence' label='Date of Occurence' required={true} placeholder='yyyy/mm/dd'
                disabled={props.disabled} />
            </Col>

            <Col xs={24} sm={24} md={12} lg={12}>
              <DatePickerWrapper name='reportedDate' label='Reported Date' required={true} placeholder='yyyy/mm/dd'
                disabled={props.disabled} />

            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <DatePickerWrapper name='reviewDate' label='Review Date' required={true} placeholder='yyyy/mm/dd'
                disabled={props.disabled} />

            </Col>

            <Col xs={24} sm={24} md={12} lg={12}>
              <Form.Item
                label="Details of Incident"
                name="detailsOfIncident"
                rules={[{ required: true, message: 'Required field' }]}
              >
                <TextArea rows={4} placeholder='Type here' disabled={props.disabled} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Form.Item
                label="Action Taken"
                name="actionTaken"
                rules={[{ required: true, message: 'Required field' }]}
              >
                <TextArea rows={4} placeholder='Type here' disabled={props.disabled} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Form.Item
                label="Outcome of Incident"
                name="outcomeOfIncident"
                rules={[{ required: true, message: 'Required field' }]}
              >
                <TextArea rows={4} placeholder='Type here' disabled={props.disabled} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Form.Item
                label="Follow up Plan"
                name="followUpPlan"
                rules={[{ required: true, message: 'Required field' }]}
              >
                <TextArea rows={4} placeholder='Type here' disabled={props.disabled} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <DatePickerWrapper name='clousereDate' label='Clousere Date' required={true} placeholder='yyyy/mm/dd'
                disabled={props.disabled} />

            </Col>

            <Col xs={24} sm={24} md={24} lg={24}>
              <Form.Item
                label="Attach Document (if any)"
                name="attachment"
                rules={[{ required: true, message: 'Required field' }]}
              >
                <UploadImage disabled={props.disabled} required={true} />
              </Form.Item>
            </Col>
          </Row>

          <Col span={24}>
            <Space size={12} className='modal-buttons'>

              <Button onClick={IsCancelIncidentAddModal} className="modal-button btn-cancel ">Cancel</Button>
              <Button type="primary"
                htmlType="submit" className="modal-button btn-secondary ">Save</Button>
            </Space>
          </Col>
        </Form>
      </Modal>
    </Row>
  )
}

export default AddModal