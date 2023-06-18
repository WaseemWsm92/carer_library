import { useState } from "react";
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetInvoiceUserQuery } from "../../../store/Slices/CoordinatorFinance";
import './FinanceReport.scss'
import FinanceTableView from "./FinanceTableView";
import ToggleListGridViewBtn from "./InvoiceDetails/ToggleListGridViewBtn";
import InvoiceFolderViewCommon from "./InvoiceDetails/InvoiceFolderViewCommon";

const FinanceReport = () => {
  const navigate = useNavigate();
  const [isListView, setIsListView] = useState(false);

  const userType = "care_coordinators";

  const { data: InvoiceUser } = useGetInvoiceUserQuery({userType})

  const handleFileDownload = (item: any) => {
    navigate(`/finance/invoice/invoice-coordinator/${item}`);
  };

  return (
    <div className="invoice-main-wrapper">
      <div className="invoice-wrapper-header d-flex align-center justify-between" style={{ paddingBottom: "2rem" }}>
        <p className="invoice-care-heading fs-20 fw-500 m-0">{isListView?"Folders":"Care Coordinators"}</p>
        <ToggleListGridViewBtn toggle={isListView} setToggle={setIsListView} />
      </div>
      {isListView ? (
        <FinanceTableView invoiceData={InvoiceUser?.data?.result} handleFileDownload={handleFileDownload} />
      ) : (
        <>
          {InvoiceUser?.data?.result?.length > 0 ? (
            <Row gutter={[25, 25]} className="folder-view">
              {InvoiceUser?.data?.result?.map((item: any) => (
                <Col xxl={4} sm={8} xs={24} key={item.key}>
                  <InvoiceFolderViewCommon
                    onClick={() => handleFileDownload(item._id)}
                    type="File Folder"
                    size="600KB"
                    dateModified={item.updatedAt }
                    name={item.firstName}
                    dateCreated={item.dateCreated} 
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <p className="fs-24 text-center" style={{color:'#737194'}}>No Data Found</p>
          )}
        </>
      )}
    </div>
  );
}

export default FinanceReport