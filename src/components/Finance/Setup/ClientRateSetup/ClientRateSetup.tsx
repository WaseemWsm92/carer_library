import { Button, Input } from "antd";
import { useState } from "react";
import Search from "../../../../assets/icons/Search.png";
import AddClientRateSetupModal from "./AddClientRateModal/AddClientRateSetupModal";
import ClientsRateSetupAccordians from "./ClientsRateSetupAccordians";
import "./ClientRateSetup.scss";

const ClientRateSetup = () => {
  const [isAddClientRate, setIsAddClientRate] = useState(false);

  return (
    <>
      <div className="client-rate-setup-main">
        <div className="client-rate-setup-header">
          <div>
            <Button
              type="primary"
              className="client-rate-add-button border-radius-2"
              onClick={() => setIsAddClientRate(true)}>
              Add Client Rate
            </Button>
          </div>
          <div className="input-search-wrapper">
            <Input placeholder="search" className="client-search-input" prefix={<img src={Search} alt="search icon" className="icon" />} />
          </div>
        </div>
        <div style={{ marginBlock: "20px" }}>
          <ClientsRateSetupAccordians />
        </div>
      </div>
      {isAddClientRate && <AddClientRateSetupModal isAddClientRate={isAddClientRate} setIsAddClientRate={setIsAddClientRate} />}
    </>
  );
};

export default ClientRateSetup;
