import React, { useState } from 'react'

// Ant Components
import { Checkbox, Col, Row, Collapse } from 'antd';

// Components
import AdvanceStaffCard from './AdvanceStaffCard/AdvanceStaffCard';
import AdvanceStaffCollapseCard from './AdvanceStaffCollapseCard/AdvanceStaffCollapseCard';
import InputWrapper from '../../../shared/InputWrapper/InputWrapper';
import RangerWrapper from '../../../shared/RangeWrapper/RangerWrapper';
import SelectWrapper from '../../../shared/SelectWrapper/SelectWrapper';

// Options and Mock Data
import { AdvanceStaffReportOptionsData } from '../../../mock/ReportMockData/AdvanceStaffReportMockData';

// Assets
import CollapseIcon from "../../../assets/icons/ShiftManger/collapse-icon.png";
import ToggleIcon from "../../../assets/icons/ShiftManger/toggle-icon.png";
import DownArrowIcon from "../../../assets/icons/ShiftManger/downArrowIcon.svg";

// SCSS
import "./AdvanceStaffReport.scss";

const { Panel } = Collapse;


// state interface
interface setAdvanceStaffSearchDataInterface {
  searchClients: string;
  location: string;
  userType: any[],
  vaccination: string;
  experienceFrom: string;
  experienceTo: string;
  drivingLicence: string;
  gender: string;
}

const AdvanceStaffReport = () => {
  const [isToggleBtn, setIsToggleBtn] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<number>(100);

  const [advanceStaffSearchData, setAdvanceStaffSearchData] = useState<setAdvanceStaffSearchDataInterface>({
    searchClients: '',
    location: '',
    userType: [],
    vaccination: "",
    experienceFrom: '',
    experienceTo: '',
    drivingLicence: '',
    gender: ''
  })

  const handleAdvanceSearch = (value: any, type: string) => {
    setAdvanceStaffSearchData({ ...advanceStaffSearchData, [type]: value })
  }

  const handleProgressBar = (newValue: number) => {
    setInputValue(newValue);
  };

  return (
    <Row gutter={[40, 40]} className="advance-staff-report-wrapper">
      <Col xs={24} md={12}>
        <div className='search-collapse-wrapper'>
          <Collapse defaultActiveKey={['0']} bordered={false} expandIconPosition="end" expandIcon={({ isActive }) => {
            return (
              <img src={DownArrowIcon} className={`${isActive && "is-active"} down-arrow`} alt="down arrow" />
            );
          }}>
            <Panel header="search by clients" key="1">
              <div className='search-clients-field'>
                <InputWrapper
                  name="searchClients"
                  disabled={true}
                  defaultValue={'Chilton Meadows'}
                  required={false}
                  onChange={(val: any) => handleAdvanceSearch(val, 'searchClients')}
                />
              </div>
            </Panel>
            <Panel header="search by location" key="2">
              <div className='search-client-progress'>
                <label className='fs-12 fw-400 title-color line-height-20'>Select Staff Location range</label>
                <RangerWrapper value={inputValue} onChange={handleProgressBar} text={<><span className="fs-12 fw-400 title-color line-height-20">{inputValue} miles</span></>} />
              </div>
            </Panel>
            <Panel header="search by usertype" key="3">
              <div className='search-client-usertype'>
                <Checkbox.Group options={AdvanceStaffReportOptionsData} defaultValue={['Domestic - (DOM)']} onChange={(val: any) => handleAdvanceSearch(val, 'userType')} />
              </div>
            </Panel>
            <Panel header="search by vaccination" key="4">
              <div className="search-client-vaccination">
                <SelectWrapper
                  name="vaccination"
                  placeHolder="Search by vaccination"
                  required={false}
                  size="large"
                  options={[{ id: '1', label: 'option', value: 'option' }]}
                  onChange={(val: any) => handleAdvanceSearch(val, 'vaccination')}
                />
              </div>
            </Panel>
            <Panel header="search by experience" key="5">
              <div className='search-by-experience'>
                <InputWrapper
                  name="experienceFrom"
                  onChange={(val: any) => handleAdvanceSearch(val, 'experienceFrom')}
                  size="large"
                  type="number"
                  placeHolder='Select experience from'
                />
                <InputWrapper
                  name="experience"
                  onChange={(val: any) => handleAdvanceSearch(val, 'experienceTo')}
                  size="large"
                  type="number"
                  placeHolder='Select experience to'
                />
              </div>
            </Panel>
            <Panel header="search by driving licence" key="6">
              <div className="search-client-driving">
                <SelectWrapper
                  name="drivingLicence"
                  placeHolder="Select"
                  required={false}
                  size="large"
                  options={[{ id: '1', label: 'option', value: 'option' }]}
                  onChange={(val: any) => handleAdvanceSearch(val, 'drivingLicence')}
                />
              </div>
            </Panel>
            <Panel header="search by gender" key="7">
              <div className="search-client-gender">
                <SelectWrapper
                  name="gender"
                  placeHolder="Select"
                  required={false}
                  size="large"
                  options={[{ id: '1', label: 'option', value: 'option' }]}
                  onChange={(val: any) => handleAdvanceSearch(val, 'gender')}
                />
              </div>
            </Panel>
          </Collapse>
        </div>
      </Col>
      <Col xs={24} md={12}>
        {/* <div className='advance-staff-data d-flex align-center justify-center'>
            <span className='fs-12 fw-600'>No Data Avaliable</span>
        </div> */}
        <div className='advance-collapse-icon d-flex align-center' >
          <img src={`${!isToggleBtn ? CollapseIcon : ToggleIcon}`} alt="toggler" className='cursor-pointer' onClick={() => setIsToggleBtn((prev) => !prev)} />
        </div>
        {!isToggleBtn ? <AdvanceStaffCard /> : <AdvanceStaffCollapseCard />}
      </Col>
    </Row>
  )
}

export default AdvanceStaffReport