import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import "./Todo.css";
import jsonData from "../../data.json";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const [flatPayout, setFlatPayout] = useState("");
  const [selectedSubProducts, setSelectedSubProducts] = useState([]);
  const [subProductData, setSubProductData] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState("flatPayout");
  const [isProductSelected, setIsProductSelected] = useState(false);

  const navigate = useNavigate();

  const handleProductSelect = (event) => {
    const selectedProduct = event.target.value;
    setIsProductSelected(!!selectedProduct);
  };
  const handleFlatPayoutChange = (event) => {
    setFlatPayout(event.target.value);
  };
  const handleBack = () => {
    navigate("/home");
  };

  const handleRadioChange = (selectedOption) => {
    setSelectedRadio(selectedOption);
    if (selectedOption === "flatPayout") {
      setFlatPayout("");
    }
    window.location.reload();
  };
  const handleFlatPayoutSelect = () => {
    const otherInputs = document.querySelectorAll(".sub-product-payout");
    otherInputs.forEach((input) => {
      input.value = flatPayout;
    });
  };

  const handleCheckboxChange = (event, subProductId) => {
    if (!isProductSelected) {
      alert("Please select a product first to input the payout percentage.");
      event.preventDefault();
      return;
    }
    const isChecked = event.target.checked;
    if (isChecked) {
      const newSelectedSubProduct = { subProductId, percentage: flatPayout };
      setSelectedSubProducts((prevSelectedSubProducts) => [
        ...prevSelectedSubProducts,
        newSelectedSubProduct,
      ]);
    } else {
      setSelectedSubProducts((prevSelectedSubProducts) =>
        prevSelectedSubProducts.filter(
          (item) => item.subProductId !== subProductId
        )
      );
    }
  };

  const getSubProductPayoutValue = (subProductId) => {
    const selectedSubProduct = selectedSubProducts.find(
      (item) => item.subProductId === subProductId
    );
    return selectedSubProduct ? selectedSubProduct.percentage : "";
  };
  const handleSubProductPayoutChange = (event, subProductId) => {
    if (!isProductSelected) {
      alert("Please select a product first to input the payout percentage.");
      event.preventDefault();
      return;
    }
    const newPayoutValue = event.target.value;
    const updatedSelectedSubProducts = [...selectedSubProducts];

    const index = updatedSelectedSubProducts.findIndex(
      (item) => item.subProductId === subProductId
    );

    if (index !== -1) {
      updatedSelectedSubProducts[index] = {
        subProductId,
        percentage: newPayoutValue,
      };
    } else {
      updatedSelectedSubProducts.push({
        subProductId,
        percentage: newPayoutValue,
      });
    }

    setSelectedSubProducts(updatedSelectedSubProducts);
  };

  useEffect(() => {
    console.log("Selected Sub-Products:", selectedSubProducts);
    setSubProductData(jsonData);
  }, [selectedSubProducts]);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 m-3 d-flex justify-content-start">
            <RxCross1 className="mt-1" />
            <h5 className="ms-3">Add Proposed Products & Payment</h5>
            <IoArrowBackCircleSharp
              className="col-8 back-icon"
              onClick={handleBack}
            />
          </div>
          <div className="col-12 mb-4">
            <select name="product" id="product" className="w-100 dropproduct">
              <option value="value1">value1</option>
              <option value="value2">value2</option>
              <option value="value3">value3</option>
            </select>
          </div>
          <div className="col-12 mt-3 loan-text">
            <h5>Loan</h5>
          </div>
          <div className="col-12 d-flex flex-column mb-2">
            <span className="mt-3">
              {" "}
              <input
                type="radio"
                checked={selectedRadio === "flatPayout"}
                onChange={() => handleRadioChange("flatPayout")}
              />{" "}
              Set flat payout% for all sub-products
            </span>
            <span className="mt-3">
              {" "}
              <input
                type="radio"
                checked={selectedRadio === "perSubProduct"}
                onChange={() => handleRadioChange("perSubProduct")}
              />{" "}
              Set payout % per sub-product
            </span>
          </div>
          <div className="col-12 m-2 d-flex justify-content-between">
            <label htmlFor="pay"> Enter Flat Payout</label>

            <div className="input-num">
              {" "}
              {selectedRadio === "flatPayout" ? (
                <>
                  <input
                    type="number"
                    className="flat-payout"
                    value={flatPayout}
                    onChange={handleFlatPayoutChange}
                  />
                  <span> %</span>
                </>
              ) : (
                <input
                  type="number"
                  className="flat-payout"
                  value={flatPayout}
                  onChange={handleFlatPayoutChange}
                  style={{ display: "none" }}
                  disabled
                />
              )}
            </div>
          </div>

          <div className="col-12 m-2 d-flex justify-content-between">
            <span>Sub Product</span>
            <span>Payout %</span>
          </div>

          <div className="col-12">
            <input
              type="checkbox"
              id="selectall"
              name="selectall"
              value="selectall"
              checked
              onChange={handleProductSelect}
            />
            <label className="ms-2" htmlFor="selectall">
              Select All
            </label>
          </div>
          {subProductData.map((item) => (
            <React.Fragment key={item.id}>
              <div className="col-12 mb-3 mt-3 d-flex justify-content-between">
                <div className="raio-btn">
                  {" "}
                  <input
                    type="checkbox"
                    id={`sub-product-${item.id}`}
                    name={`sub-product-${item.id}`}
                    onChange={(e) =>
                      handleCheckboxChange(e, item.id.toString())
                    }
                  />
                  <label className="ms-2" htmlFor={`sub-product-${item.id}`}>
                    {item.category_name}
                  </label>
                </div>
                {selectedRadio === "perSubProduct" ? (
                  <input
                    type="number"
                    className="sub-product-payout"
                    value={getSubProductPayoutValue(item.id)}
                    onChange={(e) =>
                      handleSubProductPayoutChange(e, item.id.toString())
                    }
                  />
                ) : (
                  <input
                    type="number"
                    className="sub-product-payout"
                    value={flatPayout}
                    onChange={handleFlatPayoutSelect}
                  />
                )}
              </div>
            </React.Fragment>
          ))}

          <div>
            <div className="col-12 text-center">
              <button className="col-6 btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
