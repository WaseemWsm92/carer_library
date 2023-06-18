import { Dropdown, MenuProps, Space, Table } from "antd"
import { ColumnsType } from "antd/es/table";
import './PaymentDetailsTable.scss'
import { ClientsData, IClientsPaymentsTableData, IStaffPaymentsTableData, StaffData } from "../../../mock/PaymentDetailsTableData";
import { DownOutlined } from "@ant-design/icons";

const PaymentDetailsTable = (props: any) => {
    const { selectedRowKeys, setSelectedRowKeys, PaymentDetailsType, PaymentHistory } = props;

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <span>Paid</span>
            ),
        },
    ];

    const ClientColumns: ColumnsType<IClientsPaymentsTableData> = [
        {
            title: 'Sr #',
            dataIndex: 'key',
        },
        {
            title: 'Client Name',
            dataIndex: 'client',
        },
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'Transaction Type',
            dataIndex: 'transaction_type',
        },
        {
            title: 'Invoice Number',
            dataIndex: 'invoice_number',
        },
        {
            title: 'Due Date',
            dataIndex: 'due_date',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
        },
        {
            title: 'Open Balance',
            dataIndex: 'open_balance',
        },
        {
            title: 'Balance',
            dataIndex: 'open_balance',
        },
        {
            title: 'Payment Status',
            dataIndex: 'Pending',
            render: (_: any, data: any) => <div className="payment-status-dropdown">
                {!PaymentHistory ? <Dropdown overlayClassName="payment-status-dropdown" menu={{ items }} trigger={['click']}>
                    <a onClick={(e) => { e.preventDefault(); console.log(e) }}>
                        <Space>
                            Pending
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown> : <span style={{ background: "#52C41A26", color: "#52C41A", padding: "7px 35px", borderRadius: "3px", fontWeight: "600" }}>Paid</span>}
            </div>
        },
    ];
    const StaffColumns: ColumnsType<IStaffPaymentsTableData> | any = [
        {
            title: 'Sr #',
            dataIndex: 'key',
            fixed: 'left',
        },
        {
            title: 'Staff Name',
            dataIndex: 'staff_Name',
            fixed: 'left',
            render: (_: any, data: any) => <div>
                <span>{data.staff_name}</span><br />
                <span style={{ fontSize: "10px", color: "#6E7191" }} >{data.staff_date}</span>
            </div>
        },
        {
            title: 'Staff Type',
            dataIndex: 'staff_type',
            fixed: 'left',
        },
        {
            title: 'Staff Category',
            dataIndex: 'staff_category',
        },
        {
            title: 'No of Clients',
            dataIndex: 'clients_count',
        },
        {
            title: 'Client Rate',
            dataIndex: 'client_rate',
        },
        {
            title: 'Staff Hours',
            dataIndex: 'staff_hours',
        },
        {
            title: 'No of Shifts',
            dataIndex: 'shifts_count',
        },
        {
            title: 'Salary Hours',
            dataIndex: 'salary_hours',
        },
        {
            title: 'NI Hours',
            dataIndex: 'salary_hours',
        },
        {
            title: 'Non-NI Hours',
            dataIndex: 'salary_hours',
        },
        {
            title: 'Millage Allowance Hours',
            dataIndex: 'salary_hours',
        },
        {
            title: 'Pay Rate',
            dataIndex: 'salary_hours',
        },
        {
            title: 'NI Payable',
            dataIndex: 'salary_hours',
        },
        {
            title: 'Non-NI Payable',
            dataIndex: 'salary_hours',
        },
        {
            title: 'Total Payable',
            dataIndex: 'salary_hours',
        },
        {
            title: 'Payment Status',
            dataIndex: 'Penging',
            render: (_: any, data: any) => <div className="payment-status-dropdown">
                {!PaymentHistory ? <Dropdown overlayClassName="payment-status-dropdown" menu={{ items }} trigger={['click']}>
                    <a onClick={(e) => { e.preventDefault(); console.log(e) }}>
                        <Space>
                            Pending
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown> : <span style={{ background: "#52C41A26", color: "#52C41A", padding: "7px 35px", borderRadius: "3px", fontWeight: "600" }}>Paid</span>}
            </div>
        },
    ];
    const renderTableData: any = {
        'Client': { columns: ClientColumns, data: ClientsData },
        'Staff': { columns: StaffColumns, data: StaffData }
    }

    return (
        <>
            <Table
                className='payment-details-table-wrapper'
                rowSelection={{
                    type: 'checkbox',
                    selectedRowKeys,
                    onChange: (selectedRowKeys) => { setSelectedRowKeys(selectedRowKeys) },
                }}
                scroll={{ x: 'max-content' }}
                columns={renderTableData[PaymentDetailsType]?.columns}
                dataSource={renderTableData[PaymentDetailsType]?.data}
                pagination={false}
            />
        </>
    )
}

export default PaymentDetailsTable