import { useState } from "react";
import AddRequestModal from "./AddRequestModal";

const Requests = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="requests-card">
      <div className="header">
        <h2 className="title">Request</h2>
        <h1 className="add-btn" onClick={() => setIsModalOpen(true)}>
          + Add new request
        </h1>
      </div>
      <div className="requests">
        <div className="request">
          <h2 className="title">Rejected</h2>
          <p className="requests-count red">02</p>
        </div>
        <div className="request">
          <h2 className="title">Pending</h2>
          <p className="requests-count yellow">02</p>
        </div>
        <div className="request">
          <h2 className="title">Approved</h2>
          <p className="requests-count green">02</p>
        </div>
      </div>
      <AddRequestModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default Requests;
