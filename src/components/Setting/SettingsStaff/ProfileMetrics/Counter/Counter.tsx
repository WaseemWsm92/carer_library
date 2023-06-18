import "../../../../../sass/common.scss";
import { useState, useEffect } from "react";
import "./Counter.scss";

function Counter(props: any) {
  const { countValue } = props;
  const [count, setCount] = useState(countValue || 0);




  const handleIncrement = () => {
    const newCount = count + 1;
    if (newCount <= 100) {
      setCount(newCount);
    }
  };

  const handleDecrement = () => {
    const newCount = count - 1;
    if (newCount >= 0) {
      setCount(newCount);
    }
  };

  const handleInputChange = (event: any) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setCount(value);
    }
  };

  useEffect(() => {
    setCount(countValue)
  }, [countValue])

  return (
    <div className="counter">
      <div className="inc-btn">
        <div onClick={handleIncrement} className="btn-puls d-flex align-items-center justify-center">+</div>
        <div onClick={handleDecrement} className="btn-mins d-flex align-items-center justify-center">-</div>
      </div>
      <input type="number" className="fs-14 d-flex align-items-center justify-center" value={count === 0 ? "" : count} onChange={handleInputChange} />


    </div>

  );
}

export default Counter;
