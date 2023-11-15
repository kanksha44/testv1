import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import "./Todo.css";

const Todo = () => {
  const [flatPayout, setFlatPayout] = useState("");
  const [selectedSubProducts, setSelectedSubProducts] = useState([]);

  const handleFlatPayoutChange = (event) => {
    setFlatPayout(event.target.value);
  };

  const handleFlatPayoutSelect = () => {
    // Logic to update other input fields with the flat payout value
    const otherInputs = document.querySelectorAll(".sub-product-payout");
    otherInputs.forEach((input) => {
      input.value = flatPayout;
    });
  };

  const handleCheckboxChange = (event, subProductId) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      const newSelectedSubProduct = { subProductId, percentage: flatPayout };
      setSelectedSubProducts([...selectedSubProducts, newSelectedSubProduct]);
    } else {
      const updatedSubProducts = selectedSubProducts.filter(
        (item) => item.subProductId !== subProductId
      );
      setSelectedSubProducts(updatedSubProducts);
    }
  };
  useEffect(() => {
    // Log selected sub-products whenever selectedSubProducts changes
    console.log("Selected Sub-Products:", selectedSubProducts);
  }, [selectedSubProducts]);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 m-3 d-flex justify-content-start">
            <RxCross1 className="mt-1" />
            <h5 className="ms-3">Add Proposed Products & Payment</h5>
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
              <input type="radio" /> Set flat payout% for all sub-products
            </span>
            <span className="mt-3">
              {" "}
              <input type="radio" /> Set payout % per sub-product
            </span>
          </div>
          <div className="col-12 m-2 d-flex justify-content-between">
            <label htmlFor="pay"> Enter Flat Payout</label>

            <div className="input-num">
              {" "}
              <input
                type="number"
                className="flat-payout"
                value={flatPayout}
                onChange={handleFlatPayoutChange}
              />
              <span> %</span>
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
            />
            <label className="ms-2" htmlFor="selectall">
              Select All
            </label>
          </div>

          <div className="col-12 mb-3 mt-3 d-flex justify-content-between">
            <div className="raio-btn">
              {" "}
              <input
                type="checkbox"
                id="homeLoan"
                name="homeLoan"
                onChange={(e) => handleCheckboxChange(e, "1")}
              />
              <label className="ms-2" htmlFor="selectall">
                Home Loan
              </label>
            </div>
            <input
              type="number"
              className="sub-product-payout"
              value={flatPayout}
              onChange={handleFlatPayoutSelect}
            />
          </div>
          <div className="col-12 mb-3 d-flex justify-content-between">
            <div className="raio-btn">
              {" "}
              <input
                type="checkbox"
                id="loanAgainstProperty"
                name="loanAgainstProperty"
                onChange={(e) => handleCheckboxChange(e, "2")}
              />
              <label className="ms-2" htmlFor="loanAgainstProperty">
                Loan Against Property
              </label>
            </div>
            <input
              type="number"
              className="sub-product-payout"
              value={flatPayout}
              onChange={handleFlatPayoutSelect}
            />
          </div>
          <div className="col-12 mb-3 d-flex justify-content-between">
            <div className="raio-btn">
              {" "}
              <input
                type="checkbox"
                id="PersonalLoan"
                name="PersonalLoan"
                onChange={(e) => handleCheckboxChange(e, "3")}
              />
              <label className="ms-2" htmlFor="sePersonal Loanlectall">
                Personal Loan
              </label>
            </div>
            <input
              type="number"
              className="sub-product-payout"
              value={flatPayout}
              onChange={handleFlatPayoutSelect}
            />
          </div>
          <div className="col-12 mb-3 d-flex justify-content-between">
            <div className="raio-btn">
              {" "}
              <input
                type="checkbox"
                id=" BuisnessLoan"
                name=" BuisnessLoan"
                onChange={(e) => handleCheckboxChange(e, "4")}
              />
              <label className="ms-2" htmlFor=" Buisnessoan">
                Buisness Loan
              </label>
            </div>
            <input
              type="number"
              className="sub-product-payout"
              value={flatPayout}
              onChange={handleFlatPayoutSelect}
            />
          </div>
          <div className="col-12 mb-3 d-flex justify-content-between">
            <div className="raio-btn">
              {" "}
              <input
                type="checkbox"
                id="  LifeInsurance"
                name="  LifeInsurance"
                onChange={(e) => handleCheckboxChange(e, "5")}
              />
              <label className="ms-2" htmlFor="LifeInsurance">
                Life Insurance
              </label>
            </div>
            <input
              type="number"
              className="sub-product-payout"
              value={flatPayout}
              onChange={handleFlatPayoutSelect}
            />
          </div>
          <div className="col-12 mb-3 d-flex justify-content-between">
            <div className="raio-btn">
              {" "}
              <input
                type="checkbox"
                id="   HealthInsurance"
                name="   HealthInsurance"
                onChange={(e) => handleCheckboxChange(e, "6")}
              />
              <label className="ms-2" htmlFor="HealthInsurance">
                Health Insurance
              </label>
            </div>
            <input
              type="number"
              className="sub-product-payout"
              value={flatPayout}
              onChange={handleFlatPayoutSelect}
            />
          </div>
          <div className="col-12 text-center">
            <button className="col-6 btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
