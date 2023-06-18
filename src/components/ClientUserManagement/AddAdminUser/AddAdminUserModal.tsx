import { Form, Modal, Row, Col, Button } from 'antd';
import SelectWrapper from '../../../shared/SelectWrapper/SelectWrapper';
import InputWrapper from '../../../shared/InputWrapper/InputWrapper';
import { useAddClientUserMutation } from '../../../store/Slices/UserManagement';
import { useGetShiftDepartmentQuery } from '../../../store/Slices/ClientShiftManage';
import '../../ClientUserManagement/ClientUserManagement.scss';

const AddAdminUserModal = (props: any) => {
  const { actionType, userData, addUserModalOpen, setAddUserModalOpen } = props;
  const [form] = Form.useForm();
  const { data: departmentValue } = useGetShiftDepartmentQuery({});
  const [addAdminUser] = useAddClientUserMutation();

  const departmentListOptions = departmentValue?.data?.map((userTypeDetails: any) => {
    return { value: userTypeDetails?._id, label: userTypeDetails?.name, }
  })

  const handleAddUser = async (values: any) => {
    setAddUserModalOpen(false);
    const payload = values;
    form.resetFields();
    if (actionType === 'add') {
      await addAdminUser(payload);
    }
  }

  console.log("actionType", actionType);
  console.log("userData", userData);

  const initialValues = actionType === 'edit' ? {
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    phone: userData?.phone,
    email: userData?.email,
    type: userData?.type,
    department: userData?.department?.name,
  } : {};
  
  return (
    <>
      <Modal title="Admin Details " open={addUserModalOpen} onCancel={() => { setAddUserModalOpen(false); form.resetFields(); }} footer={false} centered className='client-user-managment-modal' width={800}>
        <div className='care-booking-content'>
          <div className='cancel-shift-modal-content'>
            <Form layout="vertical" onFinish={handleAddUser} form={form} initialValues={initialValues}>
              <Row gutter={[30, 20]} align="middle">
                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields">
                  <InputWrapper
                    label='First Name'
                    name="firstName"
                    placeHolder='Type here'
                    required={true}
                  />
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields">
                  <InputWrapper
                    label='Last Name'
                    name="lastName"
                    placeHolder='Type here'
                    required={true}
                  />
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields">
                  <InputWrapper
                    label='Phone No.'
                    name="phone"
                    type='text'
                    placeHolder='Type here'
                    required={true}
                  />
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields">
                  <InputWrapper
                    label='Email ID'
                    name="email"
                    placeHolder='Type here'
                    required={true}
                    disabled={actionType === 'edit' && true}
                    type="email"
                  />
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields">
                  <InputWrapper
                    name="type"
                    label="Admin Type"
                    placeHolder='Type here'
                    required={true}
                  />
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields">
                  <SelectWrapper
                    label="Department"
                    name="department"
                    required={true}
                    placeHolder="Selected Option"
                    options={departmentListOptions}
                  />
                </Col>
              </Row>
              <div className="request-shift-btn d-flex align-center">
                <Button type='primary' className='cancel-btn' onClick={() => { form.resetFields(); setAddUserModalOpen(false) }}>Cancel</Button>
                <Button type='primary' htmlType='submit'>Save</Button>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default AddAdminUserModal