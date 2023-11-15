import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LuArrowDownUp } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { IoArrowBackCircleSharp } from "react-icons/io5";

import "./UserList.css";

const formatTime = (timeString) => {
  const date = new Date(timeString);
  const randomHour = Math.floor(Math.random() * (20 - 3)) + 3;
  const randomMinute = Math.floor(Math.random() * 60);

  date.setHours(randomHour, randomMinute);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
};

const UserList = () => {
  const [usersData, setUsersData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/users");
        setUsersData(response.data.users);
        console.log("response", response.data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div>
      <div className="main-container mt-4 container">
        <div className="row">
          <div className="col-12 d-flex justify-content-between align-item-center">
            <div className="col-6">
              <h4>Users</h4>
              <p>Here all are the users for this project.</p>
            </div>
            <button className="col-1 new-user-btn">
              <GoPlus />
              New User
            </button>
          </div>
          <div className="col-12 input-div mb-4 d-flex jusify-content-between">
            <div className="col-4 form-group has-search">
              <CiSearch className="form-control-feedback" />

              <input
                type="text"
                className="form-control rounded-pill"
                placeholder="Search"
              />
            </div>
            <IoArrowBackCircleSharp
              className="col-8 back-icon"
              onClick={handleBack}
            />
          </div>

          <table className="col-12 table table-hover align-middle mb-0 bg-white">
            <thead className="bg-light">
              <tr>
                <th>
                  Name <LuArrowDownUp />
                </th>
                <th>
                  User ID
                  <LuArrowDownUp />
                </th>
                <th>
                  Role
                  <LuArrowDownUp />
                </th>
                <th>
                  Last Login
                  <LuArrowDownUp />
                </th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={user.image}
                        alt="userimage"
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle border"
                      />
                      <div className="ms-3">
                        <p
                          // onClick={() => handleUserClick(user)}
                          className="fw-bold mb-1 user-name"
                          data-bs-toggle="modal"
                          data-bs-target="#myModal2"
                        >
                          {`${user.firstName} ${user.lastName}`}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>{user.id}</td>
                  <td>{user.company.department}</td>
                  <td>{formatTime(user.birthDate)}</td>
                  <td>
                    <BsThreeDotsVertical />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* modal */}

          <div
            className="modal fade right"
            id="myModal2"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="myModalLabel2"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <h4 className="modal-title" id="myModalLabel2">
                    User Details
                  </h4>
                </div>

                <div className="modal-body">
                  <p>
                    Anim pariatur cliche reprehenderit, enim eiusmod high life
                    accusamus terry richardson ad squid. 3 wolf moonskateboard
                    dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                    Brunch 3 wolf moon tempor, sunt aliqua put a bird on it
                    squid single-origin coffee nulla assumenda shoreditch et.
                    Nihil anim keffiyeh helvetica, craft beer labore wes
                    anderson cred nesciunt sapiente ea proident. Ad vegan
                    excepteur butcher vice lomo. Leggings occaecat craft beer
                    farm-to-table, raw denim aesthetic synth nesciunt you
                    probably haven't heard of them accusamus labore sustainable
                    VHS.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* modal */}
        </div>
      </div>
    </div>
  );
};

export default UserList;
