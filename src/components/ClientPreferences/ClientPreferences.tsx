import { useState } from 'react';
import { Avatar, Col, Dropdown, MenuProps, Row, Table } from 'antd';
import SelectWrapper from '../../shared/SelectWrapper/SelectWrapper';
import SwitchWrapper from '../../shared/SwitchWrapper/SwitchWrapper';
import ActionIcon from "../../assets/icons/ShiftManger/action-icon.svg";
import EditIcon from "../../assets/icons/edit-blue.svg";
import DeleteIcon from "../../assets/icons/delete-icon-outlined.svg";
import { ColumnsType } from 'antd/es/table';
import RangerWrapper from '../../shared/RangeWrapper/RangerWrapper';
import AddClientSelect from '../Finance/Setup/ClientRateSetup/AddClientRateModal/ClientNameSelect';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import DeleteModal from '../../shared/DeleteModal/DeleteModal';
import './ClientPreferences.scss'
import { useAddPreferenceMutation, useDeletePreferenceMutation, useGetJobRolesQuery, useGetPreferenceQuery, useUpdatePreferenceMutation } from '../../store/Slices/ClientPreference';

const ClientPreferences = () => {
  const staffCategoryOptions = ["English", "Polish", "Urdu", "French", "Spanish", "Italian", "Portuguese"];
  const [showPreference, setShowPreference] = useState({ locationRadius: false, experience: false, language: false })
  const [languageCheckedList, setLanguageCheckedList] = useState<CheckboxValueType[]>();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [preferenceValue, setPreferenceValue] = useState<any>({});
  const [actionType, setActionType] = useState('add');
  const [preferenceFilter, setPreferenceFilter] = useState({
    jobRole: 'sadsadasdas',
    locationRadius: 0,
    experience: '',
  });
  const { data: getJobRolesQuery } = useGetJobRolesQuery({});
  const { data: getPrefernceData, isLoading } = useGetPreferenceQuery({});
  const [deletePreference] = useDeletePreferenceMutation();
  const [createPreference] = useAddPreferenceMutation();
  const [updatePreference] = useUpdatePreferenceMutation();

  const getJobRole = getJobRolesQuery?.data?.result?.map((role: any) => {
    return { value: role?._id, label: role?.userRole }
  });

  const handlePreferenceFilter = (value: any, type: string) => {
    setPreferenceFilter({ ...preferenceFilter, [type]: value })
  };

  const handleAddPreference = () => {
    const payload = {
      jobRole: preferenceFilter.jobRole,
      location: preferenceFilter.locationRadius.toString(),
      experience: preferenceFilter.experience,
      language: languageCheckedList?.join()
    }
    if (actionType === 'add') {
      createPreference(payload);
    } else {
      updatePreference({
        id: preferenceValue?._id,
        payload
      })
    }
  }

  const handleDeletePreference = () => {
    deletePreference({ id: preferenceValue?._id })
  }

  console.log(preferenceValue);
  console.log(preferenceFilter);

  const items: MenuProps['items'] | undefined = [
    {
      label: (
        <div className="d-flex align-center" style={{ gap: "18px", padding: "12px" }}
          onClick={() => { setShowPreference({ locationRadius: true, experience: true, language: true }); handlePreferenceFilter(Number(preferenceValue.location), 'locationRadius'); setLanguageCheckedList(preferenceValue.language.split()); setActionType('edit') }}
        >
          <img width={23} src={EditIcon} alt="AllocateStaff" />
          <span className="fs-14 fw-400 line-height-22 title-color">Edit</span>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div className="d-flex align-center" style={{ gap: "18px", padding: "0 12px 12px 12px" }} onClick={() => setIsDeleteModal(true)}>
          <img width={20} src={DeleteIcon} alt="ModifyStaff" />
          <span className="fs-14 fw-400 line-height-22 title-color">Delete</span>
        </div>
      ),
      key: "2",
    }
  ];

  const columns: ColumnsType<any> = [
    {
      title: '',
      dataIndex: 'jobRole',
      key: 'jobRole',
      render: (_: any, data: any) => <Avatar style={{ backgroundColor: '#65CDF0', verticalAlign: 'middle' }} size="large">
        {data.jobRoleData.shortForm}
      </Avatar>
    },
    {
      title: 'Job Role',
      dataIndex: 'role',
      key: 'role',
      render: (_: any, data: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>
          {data.jobRoleData.name}
        </span>,
    },
    {
      title: 'Location Radius',
      dataIndex: 'location',
      key: 'location',
      render: (text: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{text}</span>,
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
      key: 'experience',
      render: (text: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{text}</span>,
    },
    {
      title: 'Language Preference',
      dataIndex: 'language',
      key: 'language',
      render: (text: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{text}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, data: any) => (
        <div>
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            trigger={["click"]}
            overlayClassName="distraction-alerts-dropdown"
            className="actionDropDown "
          >
            <div className="border-color cursor-pointer" onClick={() => setPreferenceValue(data)}>
              <img src={ActionIcon} alt="" />
            </div>
          </Dropdown>
        </div >
      ),
    }
  ];

  const handleChangeSwitch = (value: any, type: string) => {
    switch (type) {
      case 'location':
        setShowPreference({ locationRadius: !showPreference.locationRadius, experience: false, language: false })
        break;
      case 'experience':
        setShowPreference({ experience: !showPreference.experience, locationRadius: false, language: false });
        break;
      case 'language':
        setShowPreference({ experience: false, locationRadius: false, language: !showPreference.language });
        break;
      default:
        break;
    }
  }

  return (
    <div className='client-preferences-wrapper'>
      <div className='client-preferences-wrap bg-white'><div className='client-preferences-select'>
        <SelectWrapper
          name='jobRole'
          options={getJobRole}
          label="Job Role"
          onChange={(e: any) => handlePreferenceFilter(e, 'jobRole')}
          placeHolder="Select Option"
          value={'asdasdasdasd'}
        />
      </div>
        <Row gutter={20}>
          <Col lg={8} md={12} sm={24} xs={24}>
            <SwitchWrapper checked={showPreference.locationRadius} label="Location Radius" name="locationRadius" onChange={(e: any) => handleChangeSwitch(e, 'location')} />
            {showPreference.locationRadius && <div style={{ margin: "15px 0 0 5px" }}>
              <RangerWrapper value={preferenceFilter.locationRadius} onChange={(val: any) => handlePreferenceFilter(val, 'locationRadius')} text="100" />
            </div>}
          </Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            <div>
              <SwitchWrapper checked={showPreference.experience} label="Experience Preference" name="experiencePreference" onChange={(e: any) => handleChangeSwitch(e, 'experience')} />
              {showPreference.experience && <div className='client-preferences-select' style={{ marginTop: "15px" }}>
                <SelectWrapper
                  name='experience'
                  options={[
                    { value: "1-year", label: "0-1 Year" },
                    { value: "2-year", label: "1-2 Years" },
                    { value: "5-year", label: "2-5 Years" },
                    { value: "10-year", label: "5-10 Years" },
                    { value: "10+year", label: "10 Year +" },
                  ]}
                  label=""
                  required={false}
                  onChange={(e: any) => handlePreferenceFilter(e, 'experience')}
                  placeHolder="Select Option"
                  defaultValue={actionType === 'add' ? 'Selected Option' : preferenceValue?.experience}
                />
              </div>}
            </div>
          </Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            <SwitchWrapper checked={showPreference.language} label="Language Preference" name="languagePreference" onChange={(e: any) => handleChangeSwitch(e, 'language')} />
            {showPreference.language && <div style={{ marginTop: "15px" }}><AddClientSelect options={staffCategoryOptions} checkedList={languageCheckedList} setCheckedList={setLanguageCheckedList} /></div>}
          </Col>
        </Row>
        {Object.values(showPreference).includes(true) && <Row>
          <div className='care-booking-btn' style={{ marginTop: '30px' }}>
            <button type='button' className='cursor-pointer fs-16 line-height-22 white-color fw-600'
              onClick={() => { setShowPreference({ locationRadius: false, experience: false, language: false }); handleAddPreference() }}
            >Save</button>
          </div>
        </Row>}
      </div>
      <div className='client-preferences-table'>
        <Table columns={columns} dataSource={getPrefernceData?.data?.result} loading={isLoading} pagination={false} className="client-preferences-table-content" scroll={{ x: "max-content" }} />
      </div>
      <DeleteModal
        setDeleteModal={setIsDeleteModal}
        deleteModal={isDeleteModal}
        submitTitle="Delete"
        cancelTitle="Cancel"
        title="Do you want to delete this preference"
        onSubmit={() => { setIsDeleteModal(false); handleDeletePreference() }}
        onCancel={() => setIsDeleteModal(false)}
      />
    </div>
  )
}

export default ClientPreferences