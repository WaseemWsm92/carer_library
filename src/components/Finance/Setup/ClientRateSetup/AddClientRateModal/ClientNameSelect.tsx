import { useState } from "react";
import { Checkbox, MenuProps, Dropdown } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import DropdownIcon from '../../../../../assets/icons/arrow-down-icon.svg'
import "./AddClientRateSetupModal.scss";

const AddClientSelect = (props: any) => {
  const { allCheckOption, options, checkedList, setCheckedList } = props;
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [visible, setVisible] = useState(false);

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < options.length);
    setCheckAll(list.length === options.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? options : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <div className="add-client-rate-checkbox-style">
          {allCheckOption && (
            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange}>
              All
            </Checkbox>
          )}
          <Checkbox.Group options={options} value={checkedList} onChange={onChange} />
        </div>
      ),
      key: "0",
    },
  ];
  return (
    // <div>
      <Dropdown open={visible} overlayClassName="checkbox-select" overlayStyle={{height:'20rem',overflowY:'scroll'}} onOpenChange={(value) => setVisible(value)} menu={{ items }} placement="bottomLeft" trigger={["click"]}>
        <div className="checkbox-select-list-wrapper d-flex align-items-center" >
    
          <span style={{height:"40px", overflow:"scroll",marginTop:"15px"}}>{checkedList?.length > 0 ? checkedList?.map((item:any)=> `${item}, `) : 'Multiple Selected'}</span>
          
          <span><img src={DropdownIcon} alt="icon" /></span>
        </div> 
      </Dropdown>
    // </div>
  );
};

export default AddClientSelect;
