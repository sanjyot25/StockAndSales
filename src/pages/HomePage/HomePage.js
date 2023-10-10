import React, { useCallback, useEffect, useRef, useState } from "react";
import "../../App.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { wcClient } from "../../components/Login/LoginForm";
import axios from "axios";
import PDF, { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Table } from "react-bootstrap";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import dateFormat from "dateformat";

const typeOptions = [
  {
    value: false,
    label: "running",
  },
  {
    value: true,
    label: "monthly",
  },
];

const initialValues = {
  companies: [],
  localUrl: "",
  repCode: null,
  reports: [],
  showProductWiseSale: false,
  wclientid: "",
};

const initialSummary = {
  adjQty: null,
  clVal: null,
  clq1: null,
  clq2: null,
  clq3: null,
  clq4: null,
  clqtot: null,
  dtf: null,
  dtt: null,
  flag: null,
  insti: null,
  instiV: null,
  opening: null,
  order1: null,
  order2: null,
  order3: null,
  pack: null,
  prevSale: null,
  productName: null,
  rate: null,
  receipts: null,
  saleVal: null,
  sq1: null,
  sq2: null,
  sq3: null,
  sq4: null,
  sqTot: null,
  transfer: null,
  transit: null,
};

function HomePage() {
  let navigate = useNavigate();

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedType, setSelectedType] = useState(typeOptions[0]);

  //   const [showStockandSales, setShowStockandSales] = useState(false);

  const [showData, setShowData] = useState(false);
  const [vieworder, setVieworder] = useState(false);
  const [data, setData] = useState(initialValues);
  const [summary, setSummary] = useState(initialSummary);
  const [summaryName, setSummaryName] = useState([]);
  const [stockAndSale, setStockAndSale] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [detailedOrderList, setDetailedOrderList] = useState(false);
  const [orderNo, setOrderNo] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);

  const handleChangeCompany = (selectedComp) => {
    setSelectedCompany(selectedComp);
    // setSelectedType(seclectedtype);
  };

  const handleChangeType = (type) => {
    setSelectedType(type);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
    // setIsLoggedin(false);
  };

  const showDataList = () => {
    const getToken = JSON.parse(localStorage.getItem("user-info"));
    const data = JSON.parse(localStorage.getItem("user-info"));
    console.log(data.code);
    axios
      .post(
        "https://popsv3.relysoft.in/api/OwnAppConfigs/CompanyLoginConfig/",
        {
          wclientid: wcClient.toString(),
          repCode: data.code,
        },
        { headers: { Authorization: `Bearer ${getToken.token}` } }
      )
      .then(function (response) {
        console.log(response);
        // console.log("data", response.data.companies[0].companyName);
        const data = response;
        setData(data.data);
      });
  };

  const showSummary = () => {
    const getToken = JSON.parse(localStorage.getItem("user-info"));
    const companyCode = data.companies.find(
      (data) => data.comCode === selectedCompany.value
    ).comCode;

    console.log("company code", companyCode);

    axios
      .post(
        "https://popsv3.relysoft.in/api/StockAndSales/StockAndSale/",
        {
          wclientid: wcClient.toString(),
          compCode: companyCode,
          monthly: selectedType.value,
        },
        { headers: { Authorization: `Bearer ${getToken.token}` } }
      )
      .then(function (res) {
        // const summary = res.data;
        const response = res.data.stockandsale;
        let stockAndSalesDetails = response.map(function (data, i) {
          return data;
        });

        console.log(stockAndSalesDetails);
        setStockAndSale(stockAndSalesDetails);
        // setProductName(res.data.stockandsale[0].productName);
        // var arr = Object.keys(res.data.stockandsale).map(function (key) {
        //   return res.data.stockandsale[key];
        // });
        // setStockAndSale(arr);
        // const productName = res.data.stockandsale[0].productName;
        // console.log(arr);
        setSummary(res.data.summary);
        setSummaryName(Object.keys(res.data.summary));
        // console.log("summary", Object.keys(res.data.stockandsale.productName));
      });
  };

  const viewOrder = () => {
    const getToken = JSON.parse(localStorage.getItem("user-info"));
    const companyCode = data.companies.find(
      (data) => data.comCode === selectedCompany.value
    ).comCode;

    axios
      .post(
        "https://popsv3.relysoft.in/api/StockAndSales/OrderList/",
        {
          wclientid: wcClient.toString(),
          compCode: companyCode,
          monthly: selectedType.value,
        },
        { headers: { Authorization: `Bearer ${getToken.token}` } }
      )
      .then(function (result) {
        const orderListData = result.data;
        console.log("orderlist data", orderListData);
        let ordernumber = orderListData.map(function (data, i) {
          return data.orderNo;
        });
        // console.log(roots);
        setOrderNo(ordernumber);
        setOrderList(result.data);
      });
  };

  const orders = (orderNumber) => {
    const getToken = JSON.parse(localStorage.getItem("user-info"));
    const companyCode = data.companies.find(
      (data) => data.comCode === selectedCompany.value
    ).comCode;
    axios
      .post(
        "https://popsv3.relysoft.in/api/StockAndSales/OrderDetails/",
        {
          wClientId: wcClient.toString(),
          compCode: companyCode,
          orderNo: orderNumber,
        },
        { headers: { Authorization: `Bearer ${getToken.token}` } }
      )
      .then(function (result) {
        const OrderDetails = result.data;
        setOrderDetails(OrderDetails);
        console.log(OrderDetails);
      });
  };

  useEffect(() => {
    showDataList();
    return () => {};
  }, []);

  // console.log("state data", data);

  useEffect(() => {
    console.log(selectedCompany);
    return () => {};
  }, [selectedCompany]);

  useEffect(() => {
    console.log(selectedType);
    return () => {};
  }, [selectedType]);

  useEffect(() => {
    console.log("type", selectedType.value);
    return () => {};
  }, [selectedType]);

  // var node = document.getElementById("order");

  const downloadImage = () => {
    // htmlToImage
    //   .toJpeg(document.getElementById("order"), { quality: 0.95 })
    //   .then(function (dataUrl) {
    //     var link = document.createElement("a");
    //     link.download = "my-image-name.jpeg";
    //     link.href = dataUrl;
    //     link.click();
    //   });
  };

  const PDF = () => {
    // const companyName = data.companies.find(
    //   (data) => data.comCode === selectedCompany.value
    // ).companyName;
    const doc = new jsPDF("l", "mm", "a4");
    // doc.text(`${companyName}`, 10, 10);
    doc.autoTable({ html: "#stockandsales" });
    doc.save("table.pdf");
  };

  const orderDetailsPdf = () => {
    // const companyName = data.companies.find(
    //   (data) => data.comCode === selectedCompany.value
    // ).companyName;
    const doc = new jsPDF("l", "mm", "a4");
    // doc.text(`${companyName}`, 10, 10);
    doc.autoTable({ html: "#orderlist" });
    doc.save("orderDetails.pdf");
  };

  return (
    <>
      <div className="">
        <div className="row mx-0">
          <div className="col-md-4">
            <h6 className="pl-2">HomePage</h6>
          </div>
          <div className="col-md-4">
            <h4 style={{ textAlign: "center", fontSize: "20px" }}>
              pharmastockandsale.com
            </h4>
          </div>
          <div className="col-md-4 d-flex justify-content-end ">
            <button onClick={logout} className="btn btn-primary btn-sm">
              Log Out
            </button>
          </div>
        </div>
      </div>

      <div className="row " style={{ margin: "0px" }}>
        <div
          className="col-md-8"
          style={{
            backgroundColor: "#fff",
            padding: "15px",
            borderRadius: "2px",
          }}
        >
          <p className="Header1">TIRUPATI SALES COPORATION, NASHIK</p>
          <form>
            <div className="row">
              <div className=" col-md-6 " style={{ fontSize: "10px" }}>
                <div className="form-group">
                  <p style={{ fontSize: "15px", margin: "0" }}> Company name</p>
                  <Select
                    options={data.companies.map((data) => {
                      return {
                        label: data.companyName,
                        value: data.comCode,
                      };
                    })}
                    value={selectedCompany}
                    onChange={handleChangeCompany}
                    id="compname"
                  ></Select>
                </div>
              </div>

              <div
                className="form-group col-md-6 "
                style={{ fontSize: "11px" }}
              >
                <p style={{ fontSize: "15px", margin: "0" }}> Type</p>
                <Select
                  id="type"
                  options={typeOptions.map((item) => {
                    return {
                      label: item.label,
                      value: item.value,
                    };
                  })}
                  // defaultValue={{ label: "running", value: 1 }}
                  // defaultValue={typeOptions.label}
                  value={selectedType}
                  onChange={handleChangeType}
                ></Select>
              </div>
            </div>
          </form>
          <br />
          <div style={{ fontSize: "10px" }}>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              onClick={() => {
                // setSelectedCompany();
                showSummary();
                setVieworder(false);
                setShowData(true);
              }}
            >
              Stock and Sales
            </button>{" "}
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              onClick={() => {
                viewOrder();
                setVieworder(true);
                setShowData(false);
              }}
            >
              View Order
            </button>
          </div>
        </div>

        {data && selectedCompany && showData && (
          <>
            <div
              className="col-md-8 "
              style={{
                borderRadius: "4px",
                // marginTop: "12px",
                backgroundColor: "#DCDCDC",
                height: "84px",
                marginLeft: "0px",
              }}
            >
              <div className="row">
                <div
                  className="col-lg-12 "
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
            </div>

            <div className="col-lg-12" style={{ marginTop: "2px" }}>
              <div
                className=""
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

            <div
              className="col-lg-12"
              style={{ padding: "10px", borderRadius: "4px" }}
            >
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
                        PDF();
                      }}
                    >
                      Download
                    </button>
                  </div>
                </div>

                <br />
                <table
                  // style={{ width: "100%" }}
                  id="stockandsales"
                  className="table table-condensed table-striped table-bordered "
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
                    }}
                  >
                    {stockAndSale.map((item, i) => (
                      <tr key={i}>
                        <td style={{ padding: "1px" }}>{item.productName}</td>
                        <td style={{ padding: "1px" }}>{item.pack}</td>
                        <td style={{ padding: "1px", textAlign: "right" }}>
                          {item.rate}
                        </td>
                        <td style={{ padding: "1px", textAlign: "right" }}>
                          {item.prevSale}
                        </td>
                        <td style={{ padding: "1px", textAlign: "right" }}>
                          {item.opening}
                        </td>
                        <td style={{ padding: "1px", textAlign: "right" }}>
                          {item.receipts}
                        </td>
                        <td style={{ padding: "1px", textAlign: "right" }}>
                          {item.sq1}
                        </td>
                        <td style={{ padding: "1px", textAlign: "right" }}>
                          {item.sqTot}
                        </td>
                        <td style={{ padding: "1px", textAlign: "right" }}>
                          {item.saleVal}
                        </td>
                        <td style={{ padding: "1px", textAlign: "right" }}>
                          {item.adjQty}
                        </td>
                        <td style={{ padding: "1px", textAlign: "right" }}>
                          {item.stock}
                        </td>
                        <td style={{ padding: "1px", textAlign: "right" }}>
                          {item.clqtot}
                        </td>
                        <td style={{ padding: "1px", textAlign: "right" }}>
                          {item.clVal}
                        </td>
                        <td style={{ padding: "1px", textAlign: "right" }}>
                          {item.insti}
                        </td>
                        <td style={{ padding: "1px", textAlign: "right" }}>
                          {item.transit}
                        </td>
                        <td style={{ padding: "1px", textAlign: "right" }}>
                          {item.order1}
                        </td>
                        <td style={{ padding: "1px", textAlign: "right" }}>
                          {item.order2}
                        </td>
                        <td style={{ padding: "1px", textAlign: "right" }}>
                          {item.order3}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {vieworder && (
          <>
            <div
              className="col-md-8"
              style={{
                backgroundColor: "#fcfcfc",
                margin: "10px",
                borderRadius: "4px",
              }}
            >
              <h5>Order List</h5>

              <Table bordered hover responsive size="sm" style={{}}>
                <thead
                  style={{
                    fontSize: "10px",
                    color: "#3F1FB7",
                    backgroundColor: "#86DEFF",
                  }}
                >
                  <tr>
                    <th style={{ padding: "1px" }}>Order No.</th>
                    <th style={{ padding: "1px" }}>Order Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orderList.map((data, i) => (
                    <tr key={i}>
                      <td
                        onClick={() => {
                          setDetailedOrderList(true);
                          orders(data.orderNo);
                        }}
                        style={{ padding: "1px", fontSize: "12px" }}
                      >
                        {data.orderNo}
                      </td>
                      <td style={{ padding: "1px", fontSize: "12px" }}>
                        {dateFormat(data.orderDt, "dd-mm-yyyy")}
                        {/* {new Date(data.orderDt)} */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </>
        )}

        {vieworder && detailedOrderList && (
          <>
            <div className="col-lg-12">
              <div className="col-md-8">
                <div className="row">
                  <div className="col-lg-8" style={{ backgroundColor: "" }}>
                    <label>Detailed Order Table</label>
                  </div>
                  <div
                    className="col-lg-4 d-flex justify-content-end"
                    style={{ backgroundColor: "" }}
                  >
                    <button
                      className="btn btn-info btn-sm "
                      onClick={() => {
                        orderDetailsPdf();
                      }}
                    >
                      Download
                    </button>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <label>Supplier Name</label>
                    <p>{selectedCompany.label}</p>
                  </div>

                  <div className="col-md-3">
                    <label>Order no.</label>
                    {/* <p>{orders.data.orderNo}</p> */}
                  </div>
                  <div className="col-md-3">
                    <label>Order Date</label>

                    {/* <p>{dateFormat(data.orderDt, "dd-mm-yyyy")}</p> */}
                  </div>
                </div>
              </div>

              <div
                className="col-md-12"
                style={{ marginTop: "12px", backgroundColor: "" }}
              >
                <div style={{ marginTop: "20px" }}>
                  <Table
                    id="orderlist"
                    bordered
                    hover
                    striped
                    responsive
                    size="sm"
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
                        <th style={{ padding: "1px" }}>Quantity</th>
                        <th style={{ padding: "1px" }}>Free</th>
                        <th style={{ padding: "1px" }}>Pack</th>
                        <th style={{ padding: "1px" }}>Remark</th>
                        <th style={{ padding: "1px" }}>Dispatch Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails.map((data, i) => (
                        <tr key={i}>
                          <td style={{ padding: "1px", fontSize: "12px" }}>
                            {data.prodName}
                          </td>
                          <td style={{ padding: "1px", fontSize: "12px" }}>
                            {data.qty1}
                          </td>
                          <td style={{ padding: "1px", fontSize: "12px" }}>
                            {data.free1}
                          </td>
                          <td style={{ padding: "1px", fontSize: "12px" }}>
                            {data.pack}
                          </td>
                          <td style={{ padding: "1px", fontSize: "12px" }}>
                            {data.remark}
                          </td>
                          <td style={{ padding: "1px", fontSize: "12px" }}>
                            {/* {data.dispDt1} */}
                            {dateFormat(data.dispDt1, "dd-mm-yyyy")}
                          </td>
                        </tr>
                      ))}
                      {/* <tr>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr> */}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default HomePage;
