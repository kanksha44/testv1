import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LuArrowDownUp } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { IoStatsChartOutline } from "react-icons/io5";

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
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/users");
        setUsersData(response.data.users);
       // console.log("response", response.data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleBack = () => {
    navigate("/home");
  };

  const handleUserClick = (userId) => {
    console.log("userId", userId);
    const user = usersData.find((user) => user.id === userId);
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
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
              {usersData.map((user) => (
                <tr key={user.id}>
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
                          onClick={() => handleUserClick(user.id)}
                          className="fw-bold mb-1 user-name"
                          // data-bs-toggle="modal"
                          // data-bs-target="#myModal2"
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
          {selectedUser && showModal && (
            // <div
            //   className="modal fade right"
            //   id="myModal2"
            //   tabIndex="-1"
            //   role="dialog"
            //   aria-labelledby="myModalLabel2"
            //   onClick={handleCloseModal}
            // >
            //   <div className="modal-dialog" role="document">
            //     <div className="modal-content">
            //       <div className="modal-header">
            //         <button
            //           type="button"
            //           className="close"
            //           data-dismiss="modal"
            //           aria-label="Close"
            //         >
            //           <span aria-hidden="true">&times;</span>
            //         </button>
            //         <h4 className="modal-title" id="myModalLabel2">
            //           User Details
            //         </h4>
            //       </div>

            //       <div className="modal-body">
            //         <p>
            //           Name:{" "}
            //           {`${selectedUser.firstName} ${selectedUser.lastName}`}
            //         </p>
            //         <p>Email: {selectedUser.email}</p>
            //         <p>Phone: {selectedUser.phone}</p>
            //       </div>
            //     </div>
            //   </div>
            // </div>

            <div className="custom-modal">
              <div className="modal-content">
                <span className="close" onClick={handleCloseModal}>
                  &times;
                </span>
                <div className="modal-body">
                  <h4 className="m-4">User Details</h4>
                  {selectedUser && (
                    <>
                      <div className="header-custom m-4">
                        <img
                          src={selectedUser.image}
                          alt={selectedUser.firstName}
                          className="header-img"
                        />
                        <div className="header-contents m-4">
                          <p>
                            {`${selectedUser.firstName} ${selectedUser.lastName}`}
                          </p>
                          <p>{selectedUser.id}</p>
                          <button className="btn btn-success rounded-5">
                            Active
                          </button>
                        </div>
                      </div>

                      <div className="body-sidepanel m-3">
                        <div className="div1">
                          <FaRegUserCircle className="user-icon m-3" />
                          <span className="m-1">Basic & Account Details</span>
                        </div>
                        <div className="div2 d-flex flex-column m-3">
                          <span>
                            {`${selectedUser.firstName} ${selectedUser.lastName}`}
                          </span>
                          <span className="full-name">Full Name</span>
                        </div>
                        <div className="div3 d-flex flex-column m-3">
                          <span>{selectedUser.company.department}</span>
                          <span className="roles">Roles</span>
                        </div>
                      </div>

                      <div className="div4 m-3">
                        {" "}
                        <IoStatsChartOutline className="m-3" />
                        <span>User Data</span>
                      </div>
                      <div className="div-5">
                        <span className=" d-flex flex-column m-4">
                          {formatTime(selectedUser.birthDate)}
                        </span>
                        <span className="last-login m-4">Last Login</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* modal */}
        </div>
      </div>
    </div>
  );
};

export default UserList;
