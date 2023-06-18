import { useState } from "react";
// import "../../../../sass/common.scss";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Select, Switch, Table, Tooltip } from "antd";
import "./RegistrationConfiguration.scss";
import arrowDown from "../../../../assets/icons/arrow-down-icon.svg"
import { ColumnsType } from "antd/es/table";
import SwitchWrapper from "../../../../shared/SwitchWrapper/SwitchWrapper";
import { CareCoordinatorData, CareHomeData, DataType, RegistrationConfigurationData, TrainingInstructorData } from "../../../../mock/SettingRegistrationConfiguration";
import { useGetClientsQuery, useGetRegisterationConfigurationQuery } from "../../../../store/Slices/Setting/StaffSettings/RegisterationConfiguration";
import pagination from "antd/es/pagination";



function RegistrationConfiguration(props: any) {
  const [showTable, setShowTable] = useState(false);
  const [selectedFilterValue, setSelectedFilterValue] = useState<string | undefined>();
  const { data: registerationConfigApiData, isLoading, isSuccess, isError } = useGetRegisterationConfigurationQuery({ refetchOnMountOrArgChange: true, selectedFilterValue });
  const { data: clientData, isLoading: isClientDataLoading, isSuccess: isClientDataSuccess, isError: isClientDataError } = useGetClientsQuery({ refetchOnMountOrArgChange: true });


  let registerationConfigData: any;
  let newRegisterationConfigData: any;
  let booleanData: any;
  let clientAPIData: any;
  let userRoleDropdown: any;

  if (isLoading) {
    registerationConfigData = <p>Loading...</p>
  }
  else if (isSuccess) {
    registerationConfigData = registerationConfigApiData

    // if (registerationConfigData !== undefined) {
    //   newRegisterationConfigData = Object.entries(registerationConfigData);
    //   console.log("newRegisterationConfigData ===================",newRegisterationConfigData);
    //   booleanData = newRegisterationConfigData.reduce((acc: any, [key, value]: any) => {
    //     if (typeof value === "boolean") {
    //       acc.push({
    //         name: key,
    //         value
    //       });
    //     } else {
    //       acc.push({
    //         name: key,
    //         subColumns: [
    //           {
    //             name: "view",
    //             value: value["view"]
    //           },
    //           {
    //             name: "edit",
    //             value: value["edit"]
    //           },
    //           {
    //             name: "delete",
    //             value: value["delete"]
    //           }
    //         ]
    //       });
    //     }
    //     return acc;
    //   }, []);
    //   console.log("booleanData =============", booleanData);
    // }


  }
  else if (isError) {
    registerationConfigData = <p>Error...</p>
  }


  if (isClientDataLoading) {
    clientAPIData = <p>Loading...</p>;
  }

  else if (isClientDataSuccess) {
    clientAPIData = clientData;


     // Making new array for dropdown from data
     userRoleDropdown = clientAPIData?.data?.result?.map((item: any) => ({
      value: item?._id,
      label: item?.clientName,
    }));


  }

  else if (isClientDataError) {
    clientAPIData = <p>Error...</p>
  }

  const checkValue = (checked: boolean) => {
    if (checked) {
      setShowTable(false)
    } else {
      setShowTable(true)
    }
  };


  const { switchState, onSwitchToggle } = props;

  const handleSwitchToggle = (tableId: string, index: any, value: any) => {
    console.log('switchState++++++++', switchState);
    onSwitchToggle(index, value);
  };

  const RegistrationConfigurationColumns: ColumnsType<DataType> = [
    {
      title: '',
      dataIndex: 'icon',
      key: 'icon',
    },
    {
      title: 'Sr.No.',
      dataIndex: 'SNo',
      key: 'SNo',
    },
    {
      title: 'Menu Name',
      dataIndex: 'MenuName',
      key: 'MenuName',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (value: any, record: any, index: any) => (
        <Switch checked={switchState[`${"RegistrationConfiguration"}_${index}`]} onChange={(value) => handleSwitchToggle("RegistrationConfiguration", index, record.MenuName)} />
      ),
    },
  ];

  const CareHomeColumns: ColumnsType<DataType> = [
    {
      title: 'Sr.No.',
      dataIndex: 'SNo',
      key: 'SNo',
    },
    {
      title: 'Menu Name',
      dataIndex: 'MenuName',
      key: 'MenuName',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (value: any, record: any, index: any) => (
        <Switch checked={switchState[`${"CareHome"}_${index}`]} onChange={(value) => handleSwitchToggle("CareHome", index, record.MenuName)} />
      ),
    },
  ];

  const TrainingInstructorColumns: ColumnsType<DataType> = [
    {
      title: '',
      dataIndex: 'icon',
      key: 'icon',
    },
    {
      title: 'Sr.No.',
      dataIndex: 'SNo',
      key: 'SNo',
    },
    {
      title: 'Menu Name',
      dataIndex: 'MenuName',
      key: 'MenuName',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (value: any, record: any, index: any) => (
        <Switch checked={switchState[`${"TrainingInstructor"}_${index}`]} onChange={(value) => handleSwitchToggle("TrainingInstructor", index, record.MenuName)} />
      ),
    },
  ];

  const CareCoordinatorColumns: ColumnsType<DataType> = [
    {
      title: '',
      dataIndex: 'icon',
      key: 'icon',
    },
    {
      title: 'Sr.No.',
      dataIndex: 'SNo',
      key: 'SNo',
    },
    {
      title: 'Menu Name',
      dataIndex: 'MenuName',
      key: 'MenuName',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (value: any, record: any, index: any) => (
        <Switch checked={switchState[`${"CareCoordinator"}_${index}`]} onChange={(value) => handleSwitchToggle("CareCoordinator", index, record.MenuName)} />
      ),
    },
  ];

  // const data = Array(10).fill("empty").map((_, index) => ({
  //   key: index,
  //   row: `Row ${index + 1}`,
  // }));

  return (
    <div className='registration-configuration'>
      <div className="heading">
        <h1 className="fs-16 fw-600 m-0">Registration Configuration
          <Tooltip placement="bottomLeft"
            color="#65CDF0"
            overlayInnerStyle={{
              width: "499px",
            }}
            title="You can shorten your candidate registration form by turning off some of these sections if they are not needed.">
            <InfoCircleOutlined />
          </Tooltip>

        </h1>

      </div>
      <div className="select-filter">
        <label className="fs-14 fw-600">Select User Type</label><br />
        <Select
          // onChange={selectedValue(value)}
          // onChange={(value) => handleSelectChange(value)}
          suffixIcon={<img src={arrowDown} />}
          placeholder="Select user type"
          value={selectedFilterValue}
          onChange={(value: string) => { setShowTable(true); setSelectedFilterValue(value); }}
          options={userRoleDropdown}
        />
      </div>
      {!!selectedFilterValue  &&
        <div className="carer-option">
          <div className="show-table d-flex align-items-center">
            <p className="m-0 fs-14 fw-600">Show Full Recruitment Module </p>
            <SwitchWrapper
              onChange={checkValue}
              name="RecruitmentModule"

            />
          </div>
          {!!showTable &&
            <Table
              className="common-setting-table"
              columns={selectedFilterValue === "Carer" ? RegistrationConfigurationColumns : selectedFilterValue === "Care Home" ? CareHomeColumns : selectedFilterValue === "Training Instructor" ? TrainingInstructorColumns : CareCoordinatorColumns}
              dataSource={registerationConfigData?.data?.result}
              locale={{ emptyText: !isLoading ? "No Data" : " " }}
              loading={isLoading}
              pagination={false}
              scroll={{ x: 768 }}
            />
          }

        </div>
      }



    </div>

  );
}

export default RegistrationConfiguration;
