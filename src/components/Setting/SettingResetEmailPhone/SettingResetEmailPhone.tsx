import { Button, Table, Space, Pagination, Input, Col, Form, Row, } from "antd";
import { InfoCircleOutlined } from '@ant-design/icons';
import { useState } from "react";
import "./SettingResetEmailPhone.scss";
import { ColumnsType } from "antd/es/table";
import editIcon from "../../../assets/icons/edit-blue.svg";
import searchIcon from "../../../assets/icons/search.svg";
import { DataType, CareHomeData } from "../../../mock/ResetEmailPhone";

function SettingResetEmailPhone() {
    const [showEditMode, setShowEditMode] = useState<boolean>(true);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Finish:', values);
        setShowEditMode(true)
        form.resetFields();
    };

    const CareHomeColumns: ColumnsType<DataType> = [
        {
            title: 'S.No.',
            dataIndex: 'SNo',
            key: 'SNo',
        },
        {
            title: 'Username',
            dataIndex: 'Title',
            key: 'Title',
        },
        {
            title: 'Email',
            dataIndex: 'Email',
            key: 'Email',
        },
        {
            title: 'Phone',
            dataIndex: 'Phone',
            key: 'Phone',
        },
        {
            title: 'Action',
            dataIndex: 'edit',
            key: 'edit',
            render: () => (
                <Space
                    onClick={() => setShowEditMode(false)}
                >
                    <img src={editIcon} alt="edit" className="d-flex align-center cursor-pointer" height={24} width={24} />
                </Space>),
        }
    ];

    return (
        <div className='reset-email-phone'>
            <div className="heading">
                <h1 className="fs-16 fw-600">Reset Email and Phone
                    {!showEditMode && <InfoCircleOutlined />}
                </h1>
            </div>
            {showEditMode ?
                <>
                    <div className="filter-bar input-search-wrapper">
                        <Pagination
                            current={pagination.current}
                            showSizeChanger={true}
                            defaultPageSize={5}
                            pageSize={pagination.pageSize}
                            rootClassName="custom-pagination-wrapper-class"
                            total={CareHomeData.length}
                            onChange={(current, pageSize) =>
                                setPagination({ current, pageSize })
                            }
                        />
                        <Space className='input-export-icons' size={[30, 10]}>
                            <Input
                                className="search-input"
                                placeholder="Search"
                                prefix={<img src={searchIcon} alt="searchIcon" width={24} height={24} style={{ marginRight: '0.623rem' }} />}
                            />

                        </Space>

                    </div>
                    <div>
                        <Table
                            className="common-setting-table"
                            columns={CareHomeColumns}
                            dataSource={CareHomeData}
                            pagination={pagination}
                            onChange={(pagination: any) => setPagination(pagination)}
                            scroll={{ x: 768 }}
                        />
                    </div>
                </>
                :
                <div className="user-detail">
                    <Form layout="vertical" onFinish={onFinish} form={form}>

                        <Row gutter={24} style={{ marginBottom: "35px" }}>
                            <Col xs={24} md={12} lg={6}>
                                <label className="fs-14 fw-600">User Name</label>
                                <Input className="input-field" defaultValue="Sam Smith" disabled style={{borderColor:"#DEDEDE"}}/>

                            </Col>

                        </Row>

                        <Row gutter={24}>
                            <Col xs={24} md={12} lg={6}>

                                <Row className="user-email-phone">
                                    <Col xs={24} md={12} lg={12}>
                                        <label className="fs-14 fw-600">Primary Email:</label>
                                    </Col>
                                    <Col xs={24} md={12} lg={12}>
                                        <span>Samsmith@yahoo.com</span>
                                    </Col>
                                </Row>

                            </Col>
                            <Col xs={24} md={12} lg={{ span: 6, offset: 3 }}>
                                <Row className="user-email-phone">
                                    <Col xs={24} md={12} lg={12}>
                                        <label className="fs-14 fw-600">Primary Phone:</label>
                                    </Col>
                                    <Col xs={24} md={12} lg={12}>
                                        <span>0251562462</span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col xs={24} md={12} lg={6}>

                                <Row className="user-email-phone">
                                    <Col xs={24} md={12} lg={12}>
                                        <label className="fs-14 fw-600">Secondary Email:</label>
                                    </Col>
                                    <Col xs={24} md={12} lg={12}>
                                        <span>Samsmith@yahoo.com</span>
                                    </Col>
                                </Row>

                            </Col>
                            <Col xs={24} md={12} lg={{ span: 6, offset: 3 }}>
                                <Row className="user-email-phone">
                                    <Col xs={24} md={12} lg={12}>
                                        <label className="fs-14 fw-600">Secondary Phone:</label>
                                    </Col>
                                    <Col xs={24} md={12} lg={12}>
                                        <span>02515625825</span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col xs={24} md={12} lg={6}>
                                <label className="fs-14 fw-600">New Primary Email</label>
                                <Form.Item name="PrimaryEmail" rules={[{ required: true, message: "Required field" }]} className="mb-10">
                                    <Input className="input-field" placeholder="Type here" />

                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} lg={{ span: 6, offset: 3 }}>
                                <label className="fs-14 fw-600">New Primary Phone</label>
                                <Form.Item name="PrimaryPhone" rules={[{ required: true, message: "Required field" }]} className="mb-10">
                                    <Input className="input-field" placeholder="Type here" />
                                </Form.Item>
                            </Col>
                        </Row>


                        <Row gutter={24}>
                            <Col xs={24} md={12} lg={6}>
                                <label className="fs-14 fw-600">New Secondary Email</label>
                                <Form.Item name="SecondaryEmail" rules={[{ required: true, message: "Required field" }]} className="mb-10">
                                    <Input className="input-field" placeholder="Type here" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} lg={{ span: 6, offset: 3 }}>
                                <label className="fs-14 fw-600">New Secondary Phone</label>
                                <Form.Item name="SecondaryPhone" rules={[{ required: true, message: "Required field" }]} className="mb-10">
                                    <Input className="input-field" placeholder="Type here" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Col md={24} style={{ display: "flex" }}>
                            <Form.Item>

                                <Button className="btn-secondary savebtn" htmlType="submit">
                                    Save
                                </Button>
                            </Form.Item>
                        </Col>
                    </Form>
                </div>
            }

        </div>

    );
}

export default SettingResetEmailPhone;
