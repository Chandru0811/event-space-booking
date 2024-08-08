import React from 'react'
import { BrowserRouter } from "react-router-dom";
import AdminHeader from '../components/AdminHeader';
import AdminFooter from '../components/AdminFooter';
import EventBooking from '../pages/EventBooking';
import { ToastContainer } from 'react-toastify';

const User = ({ handleLogin }) => {
  return (
    <>
      <BrowserRouter>
        <div className="container-fluid p-0">
          <ToastContainer position="top-center" />
          <AdminHeader handleLogin={handleLogin} />
          <div
            style={{
              minHeight: "90vh",
            }}
          >
            <hr></hr>
            <EventBooking></EventBooking>
          </div>
          <AdminFooter />
        </div>
      </BrowserRouter>
    </>
  );
}

export default User