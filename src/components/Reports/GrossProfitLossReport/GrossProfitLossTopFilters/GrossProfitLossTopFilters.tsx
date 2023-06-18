
// Ant Components
import { Col, Row, Select } from 'antd';

// SCSS
import "../../CommonReportChildFilters/CommonReportChildFilters.scss";
import "./GrossProfitLossTopFilters.scss";

const GrossProfitLossTopFilters = () => {
    return (
        <Row gutter={[0, 20]} className='gross-profit-loss-top-filters-wrapper common-report-child-filter-wrapper'>
            <Col xs={24} md={8} xl={6} xxl={4}>
                <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Client Name</p>
                <div className="filter-column">
                    <Select
                        size="large"
                        placeholder="Select client name"
                        defaultValue="Arsalan Khan"
                        optionFilterProp="children"
                        className="app-select-wrap-class"
                        popupClassName="app-select-popup-wrap-class"
                        style={{ width: "100%" }}
                        // onChange={handleCommonFilterChange}
                        // filterOption={(input: any, option: any) => { (option?.label ?? "").toLowerCase().includes(input.toLowerCase()) }}
                        options={[
                            { value: "Arsalan Khan", label: "Arsalan Khan" },
                            { value: "Ali Rehman", label: "Ali Rehman" },
                            { value: "Kashif", label: "Kashif" },
                        ]}
                    />
                </div>
            </Col>
            <Col xs={24} md={8} xl={6} xxl={4}>
                <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Time Frame</p>
                <div className="filter-column">
                    <Select
                        size="large"
                        placeholder="Select time frame"
                        defaultValue="Last Day"
                        optionFilterProp="children"
                        className="app-select-wrap-class"
                        popupClassName="app-select-popup-wrap-class"
                        style={{ width: "100%" }}
                        // onChange={handleCommonFilterChange}
                        // filterOption={(input: any, option: any) => { (option?.label ?? "").toLowerCase().includes(input.toLowerCase()) }}
                        options={[
                            { value: "last Day", label: "last Day" },
                            { value: "Today", label: "Today" },
                        ]}
                    />
                </div>
            </Col>

           
        </Row >
    )
}

export default GrossProfitLossTopFilters