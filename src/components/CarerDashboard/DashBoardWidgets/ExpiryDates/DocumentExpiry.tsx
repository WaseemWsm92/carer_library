const DocumentExpiry = () => {
  return (
    <div className="expiry-card">
      <h2 className="title">Document Expiry Dates</h2>
      <div className="card-content">
        <div className="item">
          <h2 className="title">Certifications</h2>
          <p className="date red">24-5-2022</p>
        </div>
        <div className="item">
          <h2 className="title">Work visa</h2>
          <p className="date yellow">24-5-2022</p>
        </div>
        <div className="item">
          <h2 className="title">DBS</h2>
          <p className="date green">24-5-2022</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentExpiry;
