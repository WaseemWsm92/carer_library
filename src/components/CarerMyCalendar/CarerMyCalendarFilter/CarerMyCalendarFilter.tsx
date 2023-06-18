import { Select } from 'antd'
import arrowDownSmall from '../../../assets/icons/arrow-small-down.svg'
import "../../ClientManager/ClientManagerFilters/ClientManagerFilters.scss";


const CarerMyCalendarFilter = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  }

  return (
    <div className="wrapper-fliters">
      <div className="flex-filters">
        <div className='inner-flex-filters'>
          <div className="col-box">
            <div className="area-fliters">
              <div className='filters-label fw-600 fs-14'>Time Interval </div>
              <Select
                placeholder="Select Option"
                style={{ width: '100%' }}
                onChange={handleChange}
                suffixIcon={<img src={arrowDownSmall} alt="" />}
                options={[
                  { value: 'Option One', label: 'Option One' },
                  { value: 'Option Two', label: 'Option Two' },
                ]}
              />
              
            </div>
          </div>
          <div className="col-box">
            <div className="area-fliters">
              <div className='filters-label fw-600 fs-14'>Slot Interval</div>
              <Select
                placeholder="Select Option"
                style={{ width: '100%' }}
                onChange={handleChange}
                suffixIcon={<img src={arrowDownSmall} alt="" />}
                options={[
                  { value: 'Option One', label: 'Option One' },
                  { value: 'Option Two', label: 'Option Two' },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarerMyCalendarFilter