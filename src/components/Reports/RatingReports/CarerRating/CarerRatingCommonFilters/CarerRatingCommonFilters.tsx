import { Row,Col,Select,Rate,Progress } from 'antd'
import React,{useState} from 'react'
import './CarerRatingCommonFilter.scss'
const CarerRatingCommonFilters = (props:any) => {
  const [ClientNameFilterValue, setClientNameFilterValue] = useState<string | undefined>();
  const [UserTypeFilterValue, setUserTypeFilterValue] = useState<string | undefined>();
  const [TimeFrameFilterValue, setTimeFrameFilterValue] = useState<string | undefined>();
  const { IsShownUserTypeFilter,IsProgressClient ,IsProgressCarer} = props;
  return (
    <Row gutter={[0, 20]} className='wrapper-report-rating-common-filters' justify="space-between" style={{padding:"0px 31px"}}>
      <Col xs={24} md={24} lg={24} xl={16} xxl={14}>

      <Row gutter={[0, 20]} className="filter-wrapper">
    <Col xs={24} md={8} lg={8} xl={8} xxl={8}>
      <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Client Name</p>
      <div className="filter-column">
        <Select
          size="large"
          placeholder="Select client name"
          optionFilterProp="children"
          className="app-select-wrap-class"
          defaultValue="All"
          popupClassName="app-select-popup-wrap-class"
          style={{ width: "100%" }}
          value={ClientNameFilterValue}
          onChange={(value: string) =>
            value
              ? setClientNameFilterValue(value)
              : setClientNameFilterValue("")
          }
          options={[
            { value: "Arsalan Khan", label: "Arsalan Khan" },
            { value: "Ali Rehman", label: "Ali Rehman" },
            { value: "Kashif", label: "Kashif" },
        ]}
        />
      </div>
    </Col>

    {!IsShownUserTypeFilter &&
      <Col xs={24} md={8} lg={8} xl={8} xxl={8}>
        <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>User Type</p>
        <div className="filter-column">
          <Select
            size="large"
            placeholder="Select user type"
            optionFilterProp="children"
            defaultValue="All"
            className="app-select-wrap-class"
            popupClassName="app-select-popup-wrap-class"
            style={{ width: "100%" }}
            onChange={(value: string) =>
              value
                ? setUserTypeFilterValue(value)
                : setUserTypeFilterValue("")
            }
            value={UserTypeFilterValue}
            options={[
              { value: "Arsalan Khan", label: "Arsalan Khan" },
              { value: "Ali Rehman", label: "Ali Rehman" },
              { value: "Kashif", label: "Kashif" },
          ]}
          />
        </div>
      </Col>
}
      <Col xs={24} md={8} lg={8} xl={8} xxl={8}>
        <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Time Frame</p>
        <div className="filter-column">
          <Select
            size="large"
            placeholder="Select time frame"
            optionFilterProp="children"
            defaultValue="All"
            className="app-select-wrap-class"
            popupClassName="app-select-popup-wrap-class"
            style={{ width: "100%" }}
            onChange={(value: string) =>
              value
                ? setTimeFrameFilterValue(value)
                : setTimeFrameFilterValue("")
            }
            value={TimeFrameFilterValue}
            options={[
              { value: "Arsalan Khan", label: "Arsalan Khan" },
              { value: "Ali Rehman", label: "Ali Rehman" },
              { value: "Kashif", label: "Kashif" },
          ]}
          />
        </div>
      </Col>
      </Row>
      </Col>
      <Col xs={24} md={24} lg={24} xl={7} xxl={7} className='d-flex align-items-center align-center justify-end'>
  <div className="search-input-row" >
    <p className='fs-20fw-500 title-color line-height-28 m-0' style={{ marginBottom: "0.163rem" }}>Overall Rating</p>
           
        <div className='' >
            <Rate allowHalf defaultValue={4} style={{ fontSize: "17px" }}/>
            {!IsProgressClient &&
            <Progress
            strokeColor={{ from: '#52C41A', to: '#52C41A' }}
            percent={50} style={{marginLeft:"10px"}}/>
}
            {!IsProgressCarer &&
             <Progress
            strokeColor={{ from: '#EE2E7E', to: '#EE2E7E' }}
            percent={50} style={{marginLeft:"10px",height:"13px",width:"130px"}}/>
}
        </div>
        
    </div>
</Col>
  </Row>
  )
}

export default CarerRatingCommonFilters