import { useState } from "react";
import {
  Modal,
  Table,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { dataCrossAllocation, DataTypeCrossAllocation } from "../../../mock/SettingJobRole.ts";
import SwitchWrapper from "../../../shared/SwitchWrapper/SwitchWrapper";
import { useUpdateCrossAllocationMutation } from "../../../store/Slices/Setting/JobRole";
import "./SettingJobRole.scss";
import AppSnackbar from "../../../utils/AppSnackbar";

function CrossAllocationModal(props: any) {
  const { showCrossAllocation, setShowCrossAllocation, getTableRowValues } = props;
  const [checkedCrossAllocation, setCheckedCrossAllocation] = useState<any>([]);
  const [updateCrossAllocation] = useUpdateCrossAllocationMutation();

  const handleSwitchChange = (record: any, checked: any) => {
    if (checked) {
      setCheckedCrossAllocation((prevCheckedCrossAllocation: any) => {
        const newCheckedCrossAllocation = [...prevCheckedCrossAllocation, record];
        handleUpdateCrossAllocation(newCheckedCrossAllocation);
        return newCheckedCrossAllocation;
      });
      
    } else {
      setCheckedCrossAllocation((prevCheckedCrossAllocation: any) => {
        const newCheckedCrossAllocation = prevCheckedCrossAllocation.filter((value: any) => value !== record);
        handleUpdateCrossAllocation(newCheckedCrossAllocation);
        return newCheckedCrossAllocation;
        })
      };
    }


  const handleUpdateCrossAllocation = async (newCheckedCrossAllocation:any) => {
    const newPayload = {
      name: getTableRowValues?.name,
      shortForm: getTableRowValues?.shortForm,
      userRole: getTableRowValues?.userRole,
      crossAllocation: newCheckedCrossAllocation
    };
    try {
      await updateCrossAllocation({ id: getTableRowValues._id, payload: newPayload }).unwrap();
      AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information updated successfully" });
    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!"
      });
    }
  };


  const columns: ColumnsType<DataTypeCrossAllocation> = [
    {
      title: "S.No",
      dataIndex: "Srno",
    },
    {
      title: "Job Roles",
      dataIndex: "JobRoles",
    },
    {
      title: "Enable Cross-Allocation",
      dataIndex: "EnableCrossAllocation",
      render: (_, record) => (
        <SwitchWrapper
          checked={!!record?.crossAllocation}
          name="EnableCrossAllocation"
          onChange={(checked: any) => handleSwitchChange(record.JobRoles, checked)}
        />
      ),
    },
  ];

  return (
    <Modal
      title="Cross Allocation"
      open={showCrossAllocation}
      onOk={() => {
        setShowCrossAllocation(false);
      }}
      onCancel={() => {
        setShowCrossAllocation(false);
      }}
      centered
      className="cross-allocation"
      footer={false}
      width="888px"
    >
      <Table scroll={{ x: 768 }} columns={columns} onRow={(record: any) => { return { onClick: () => { console.log(record) } } }} dataSource={dataCrossAllocation} pagination={false} className="common-setting-table" style={{ marginTop: "20px", marginBottom: "50px" }} />

    </Modal>

  );
}

export default CrossAllocationModal;
