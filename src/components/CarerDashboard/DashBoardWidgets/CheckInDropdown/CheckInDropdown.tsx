
import './CheckIn.scss'

const CheckInDropdown = () => {
  return (
    <div className="dropdown">
      <div className="d-flex justify-between align-center">
        <p className="fs-14 fw-600">Client:</p>
        <span className="fs-14 fw-400">Tall Tree</span>
      </div>
      <div className="d-flex justify-between align-center">
        <p className="fs-14 fw-600">Shift Time:</p>
        <span className="fs-14 fw-400">11:30 PM</span>
      </div>
      <div className="d-flex justify-between align-center">
        <p className="fs-14 fw-600">Shift Date:</p>
        <span className="fs-14 fw-400">16 Dec, 2022</span>
      </div>
      <div className="d-flex justify-between align-center">
        <p className="fs-14 fw-600">Shift Type:</p>
        <span className="fs-14 fw-400">Long Day</span>
      </div>
      <div className='text-center'>
        <button className='check-in-btn'>Check-In</button>
      </div>
    </div>
  );
};

export default CheckInDropdown;
