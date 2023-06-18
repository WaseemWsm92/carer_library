import { useState } from "react";
import SetupCards from "./SetupCards";
import ClientRateSetup from "./ClientRateSetup/ClientRateSetup";
import StaffCodeSetup from "./StaffCodeSetup/StaffCodeSetup";
import StaffRateSetup from "./StaffRateSetup/StaffRateSetup";

const FinanceSetupMain = () => {
  const [setupContent, setSetupContent] = useState("");
  return (
    <div
      className="finance-setup-main"
      style={{ background: setupContent === "Staff Code Setup" ? "" : "white", padding: !setupContent ? "6rem 5px 2rem 5px" : "2rem 5px" }}
    >
      {!setupContent && <SetupCards setSetupContent={setSetupContent} />}
      {setupContent === "Client Rate Setup" && <ClientRateSetup />}
      {setupContent === "Staff Rate Setup" && <StaffRateSetup />}
      {setupContent === "Staff Code Setup" && <StaffCodeSetup />}
    </div>
  );
};

export default FinanceSetupMain;
