import React from "react";

function Home() {
  return (
    <div>
      {data && selectedCompany && showData && (
        <>
          <div
            className="row mb-1"
            style={{
              borderRadius: "4px",
              // marginTop: "12px",
              backgroundColor: "#DCDCDC",
              height: "84px",
              marginLeft: "0px",
            }}
          >
            <div
              className="col-lg-8 "
              style={{
                backgroundColor: "#fcfcfc",
                borderRadius: "4px",
                padding: "15px",
                marginLeft: "0px",
                marginTop: "5px",
                height: "75px",
                width: "67.9%",
              }}
            >
              <div className="row">
                <div className="col-lg-6" style={{ backgroundColor: "" }}>
                  <label>Company Name</label>
                  <p>{selectedCompany.label}</p>
                </div>
                <div className="col-lg-3" style={{ backgroundColor: "" }}>
                  <label>From</label>
                </div>
                <div className="col-lg-3" style={{ backgroundColor: "" }}>
                  <label>To</label>
                </div>
              </div>
            </div>
          </div>
          <div className="row" style={{ marginTop: "2px" }}>
            <div
              className="col-lg-12"
              style={{
                backgroundColor: "#fcfcfc",
                borderRadius: "4px",
                // margin: "6px",
              }}
            >
              <h6
                style={{
                  color: "Blue",
                  marginTop: "10px",
                }}
              >
                Summary
              </h6>

              <table className="table table-condensed table-striped table-bordered">
                <thead
                  style={{
                    fontSize: "10px",
                    color: "#3F1FB7",
                    backgroundColor: "#86DEFF",
                  }}
                >
                  <tr>
                    <th style={{ padding: "1px" }}>Previous Sales</th>
                    <th style={{ padding: "1px" }}>Opening</th>
                    <th style={{ padding: "1px" }}>Receipts</th>
                    <th style={{ padding: "1px" }}>Sales</th>
                    <th style={{ padding: "1px" }}>Sale Value</th>
                    <th style={{ padding: "1px" }}>Closing Value</th>
                  </tr>
                </thead>
                <tbody
                  style={{
                    fontSize: "10px",
                  }}
                >
                  <tr>
                    <td style={{ padding: "1px" }}>{summary.prevSale}</td>
                    <td style={{ padding: "1px" }}>{summary.opening}</td>
                    <td style={{ padding: "1px" }}>{summary.receipts}</td>
                    <td style={{ padding: "1px" }}>{summary.saleVal}</td>
                    <td style={{ padding: "1px" }}>{summary.saleVal}</td>
                    <td style={{ padding: "1px" }}>{summary.clVal}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="row" style={{ padding: "10px", borderRadius: "4px" }}>
            <div
              className="col-lg-12"
              style={{
                backgroundColor: "#fcfcfc",
                padding: "10px",
                borderRadius: "4px",
              }}
            >
              <div className="row">
                <div className="col-lg-8" style={{ backgroundColor: "" }}>
                  <span>Detailed Stock And Sales Statement</span>
                </div>
                <div className="col-lg-4" style={{ backgroundColor: "" }}>
                  <button
                    type="button"
                    className="btn btn-info"
                    style={{
                      float: "right",
                      marginRight: "5px",
                    }}
                    onClick={() => {
                      document();
                    }}
                  >
                    Download
                  </button>
                </div>
              </div>

              <br />
              <table
                style={{ width: "100%" }}
                className="table table-striped table-bordered "
                id="tabel"
              >
                <thead
                  style={{
                    fontSize: "10px",
                    color: "#3F1FB7",
                    backgroundColor: "#86DEFF",
                  }}
                >
                  <tr>
                    <th style={{ padding: "1px" }}>Product Name</th>
                    <th style={{ padding: "1px" }}>Packing</th>
                    <th style={{ padding: "1px" }}>Rate</th>
                    <th style={{ padding: "1px" }}>Prev Sale</th>
                    <th style={{ padding: "1px" }}>Opening</th>
                    <th style={{ padding: "1px" }}>Receipts</th>
                    <th style={{ padding: "1px" }}>Sales</th>
                    <th style={{ padding: "1px" }}>Total Sale</th>
                    <th style={{ padding: "1px" }}>Sale Value</th>
                    <th style={{ padding: "1px" }}>AdjQty</th>
                    <th style={{ padding: "1px" }}>Stock</th>
                    <th style={{ padding: "1px" }}>Total Closing</th>
                    <th style={{ padding: "1px" }}>Closing Value</th>
                    <th style={{ padding: "1px" }}>Instq</th>
                    <th style={{ padding: "1px" }}>Transit</th>
                    <th style={{ padding: "1px" }}>Order1</th>
                    <th style={{ padding: "1px" }}>Order2</th>
                    <th style={{ padding: "1px" }}>Order3</th>
                  </tr>
                </thead>
                <tbody
                  style={{
                    fontSize: "10px",
                    padding: "0px",
                    // color: "#3F1FB7",
                    // backgroundColor: "#86DEFF",
                  }}
                >
                  {stockAndSale.map((item, i) => (
                    <tr key={i}>
                      <td style={{ padding: "1px" }}>{item.productName}</td>
                      <td style={{ padding: "1px" }}>{item.pack}</td>
                      <td style={{ padding: "1px" }}>{item.rate}</td>
                      <td style={{ padding: "1px" }}>{item.prevSale}</td>
                      <td style={{ padding: "1px" }}>{item.opening}</td>
                      <td style={{ padding: "1px" }}>{item.receipts}</td>
                      <td style={{ padding: "1px" }}>{item.sq1}</td>
                      <td style={{ padding: "1px" }}>{item.sqTot}</td>
                      <td style={{ padding: "1px" }}>{item.saleVal}</td>
                      <td style={{ padding: "1px" }}>{item.adjQty}</td>
                      <td style={{ padding: "1px" }}>{item.stock}</td>
                      <td style={{ padding: "1px" }}>{item.clqtot}</td>
                      <td style={{ padding: "1px" }}>{item.clVal}</td>
                      <td style={{ padding: "1px" }}>{item.insti}</td>
                      <td style={{ padding: "1px" }}>{item.transit}</td>
                      <td style={{ padding: "1px" }}>{item.order1}</td>
                      <td style={{ padding: "1px" }}>{item.order2}</td>
                      <td style={{ padding: "1px" }}>{item.order3}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  {/* <tr style={{ fontSize: "12px" }}>
                  <td>{stockAndSale.productName}</td>
                  <td>{stockAndSale.pack}</td>
                  <td>{stockAndSale.rate}</td>
                  <td>{stockAndSale.opening}</td>
                  <td>{stockAndSale.prevSale}</td>
                  <td>{stockAndSale.receipts}</td>
                  <td>{stockAndSale.sq1}</td>
                  <td>{}</td>
                  <td>{stockAndSale.saleVal}</td>
                  <td>{stockAndSale.adjQty}</td>
                  <td>{stockAndSale.clq1}</td>
                  <td>{}</td>
                  <td>{stockAndSale.clVal}</td>
                  <td>{stockAndSale.insti}</td>
                  <td>{stockAndSale.transit}</td>
                  <td>{stockAndSale.order1}</td>
                  <td>{stockAndSale.order2}</td>
                  <td>{stockAndSale.order3}</td>
                </tr> */}
                </tfoot>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
