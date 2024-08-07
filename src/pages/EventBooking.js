import React, { useState, useEffect } from 'react';
import logo from "../assets/Logo.png";
import { FaRegClock, FaGlobeAsia } from "react-icons/fa";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FiPhoneCall } from "react-icons/fi";
import { IoMailOpenOutline } from "react-icons/io5";
import { LuMapPin } from "react-icons/lu";
import { FaCircleArrowRight, FaCircleArrowLeft } from "react-icons/fa6";
import { BiSolidQuoteRight } from "react-icons/bi";
import { useFormik } from "formik";
import * as Yup from "yup";
import success from "../assets/success.mp4";

function EventBooking() {
  const [date, setDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [singaporeTime, setSingaporeTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    generateTimeSlots(newDate);
  };

  const generateTimeSlots = (selectedDate) => {
    const startHour = 10;
    const endHour = 19;
    const intervalMinutes = 30; // 30 minutes interval
    const slots = [];

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minutes = 0; minutes < 60; minutes += intervalMinutes) {
        const time = new Date(selectedDate);
        time.setHours(hour, minutes, 0);
        slots.push(time);
      }
    }

    // For the final slot at 7:00 PM
    const finalTime = new Date(selectedDate);
    finalTime.setHours(endHour, 0, 0);
    slots.push(finalTime);

    setTimeSlots(slots);
  };

  const handleDateSlotClick = (time) => {
    setSelectedDate(time);
  };

  const getSingaporeTime = () => {
    const singaporeTimeZone = 'Asia/Singapore';
    const options = {
      timeZone: singaporeTimeZone,
      hour12: true,
      hour: '2-digit',
      minute: '2-digit'
    };
    const time = new Date().toLocaleTimeString('en-US', options);
    setSingaporeTime(time);
  };

  useEffect(() => {
    getSingaporeTime();
    const interval = setInterval(getSingaporeTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const validationSchema1 = Yup.object({
    fullName: Yup.string().required("*Full Name is required"),
    email: Yup.string()
      .email("*Invalid Email Address")
      .required("*Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, "*Must be a Number")
      .min(8, "*Invalid Phone Number")
      .max(10, "*Invalid Phone Number")
      .required("*Phone Number is required")
  });

  const formik1 = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      message: ""
    },
    validationSchema: validationSchema1,
    onSubmit: (values) => {
      console.log("Contact Datas:", values);
      setIsBookingConfirmed(true);
    },
  });

  const validationSchema2 = Yup.object({
    firstName: Yup.string().required("*First Name is required"),
    lastName: Yup.string().required("*Last Name is required"),
    email: Yup.string()
      .email("*Invalid Email Address")
      .required("*Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, "*Must be a Number")
      .min(8, "*Invalid Phone Number")
      .max(10, "*Invalid Phone Number")
      .required("*Phone Number is required")
  });

  const formik2 = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: ""
    },
    validationSchema: validationSchema2,
    onSubmit: (values) => {
      console.log("Contact Datas:", values);
    },
  });

  const today = new Date();
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, 0);

  const formatSelectedDate = () => {
    if (!date) return '';
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleNextClick = () => {
    setShowForm(true);
  };

  const handleBackClick = () => {
    setShowForm(false);
  };

  const handleNewBookingClick = () => {
    setIsBookingConfirmed(false);
    formik1.resetForm();
    setDate(null);
    setSelectedDate(null);
    setShowForm(false);
  };

  const leftColumnClass = date && !showForm ? 'col-md-4 col-12' : 'col-md-6 col-12';
  const calendarColumnClass = date && !showForm ? 'col-md-4 col-12' : 'col-md-6 col-12';
  const rightColumnClass = date && !showForm ? 'col-md-3 col-12' : 'col-md-6 col-12';

  return (
    <section className='mt-5 contactUs'>
      <div className='container-fluid py-5'>
        <div className='row'>
          <div className='offset-lg-1 col-lg-10 col-12'>
            <div className='card contactCard'>
              <div className='row'>
                {!isBookingConfirmed ? (
                  <>
                    <div className={leftColumnClass + ' py-5'}>
                      <div className='d-flex align-items-center justify-content-center mb-5'>
                        <img
                          src={logo}
                          height="70"
                          className="d-inline-block align-top"
                          alt="ECS Training"
                        />
                        <div className='logoText mt-2'>
                          <h2 className='mb-0 fw-bold'>ECS</h2>
                          <h6 className='fw-bold'>Training</h6>
                        </div>
                      </div>
                      <hr className='mb-4' />
                      <div className='text-start' style={{ marginLeft: "50px" }}>
                        <h6 className='logoText fw-bold'>Design Team</h6>
                        <h2>30 Minute Meeting</h2>
                        <div className='logoText d-flex align-items-center'>
                          <FaRegClock />
                          <span className='fw-medium mx-1'>30 min</span>
                        </div>
                      </div>
                    </div>
                    {!showForm && (
                      <div className={calendarColumnClass + ' py-4 text-start contactCard-right'}>
                        <h5 className='fw-bold mb-4 mx-2'>Select a Date & Time</h5>
                        <div className='row'>
                          <div className='col-md-12'>
                            <div className="calendar-container">
                              <Calendar
                                onChange={handleDateChange}
                                value={date}
                                minDate={today}
                                maxDate={maxDate}
                                minDetail="month"
                                maxDetail="month"
                                // tileDisabled={tileDisabled}
                                className='mb-4'
                              />
                            </div>
                            <h5 className='fw-bold mb-3 mx-2'>Time Zone</h5>
                            <div className='time-zone'>
                              <FaGlobeAsia color='#515B6F' /><span className='mx-1'>Singapore Time ({singaporeTime})</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {date && !showForm && (
                      <div className={rightColumnClass + ' py-5 text-center'}>
                        <h6 className='mb-4 mt-3 mx-5'>{formatSelectedDate()}</h6>
                        <button className="next-btn" onClick={handleNextClick}>To Book</button>
                      </div>
                    )}
                    {showForm && (
                      <div className='col-md-6 contactCard-right'>
                        <div className="back-arrow text-start mt-3" onClick={handleBackClick} style={{ cursor: 'pointer' }}>
                          <FaCircleArrowLeft />
                        </div>
                        <div className='row mt-3'>
                          <div className='offset-1 col-10 text-start'>
                            <h2 className='mb-3'>Add your Details</h2>
                            <form onSubmit={formik1.handleSubmit}>
                              <div className='mb-3'>
                                <label className='form-label'>Full Name<span className='text-danger'>*</span></label>
                                <input type='text'
                                  className={`form-control ${formik1.touched.fullName && formik1.errors.fullName
                                    ? "is-invalid"
                                    : ""
                                    }`}
                                  {...formik1.getFieldProps("fullName")}
                                />
                                {formik1.touched.fullName && formik1.errors.fullName && (
                                  <div className="invalid-feedback">
                                    {formik1.errors.fullName}
                                  </div>
                                )}
                              </div>
                              <div className='mb-3'>
                                <label className='form-label'>Email<span className='text-danger'>*</span></label>
                                <input type='text'
                                  className={`form-control ${formik1.touched.email && formik1.errors.email
                                    ? "is-invalid"
                                    : ""
                                    }`}
                                  {...formik1.getFieldProps("email")}
                                />
                                {formik1.touched.email && formik1.errors.email && (
                                  <div className="invalid-feedback">
                                    {formik1.errors.email}
                                  </div>
                                )}
                              </div>
                              <div className='mb-3'>
                                <label className='form-label'>Phone Number<span className='text-danger'>*</span></label>
                                <input type='text'
                                  className={`form-control ${formik1.touched.phoneNumber && formik1.errors.phoneNumber
                                    ? "is-invalid"
                                    : ""
                                    }`}
                                  {...formik1.getFieldProps("phoneNumber")}
                                />
                                {formik1.touched.phoneNumber && formik1.errors.phoneNumber && (
                                  <div className="invalid-feedback">
                                    {formik1.errors.phoneNumber}
                                  </div>
                                )}
                              </div>
                              <div className='mb-4'>
                                <label className='form-label'>Message</label>
                                <textarea
                                  rows={5}
                                  className='form-control'
                                  {...formik1.getFieldProps("message")}
                                />
                              </div>
                              <div className='mb-5'>
                                <button type='submit' className='btn btn-primary'>Schedule the Event</button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className='col-12 py-5 text-center'>
                    <div className='mb-4'>
                      <video
                        src={success}
                        autoPlay
                        loop
                        muted
                        style={{ maxHeight: '150px' }}
                      />
                      <h5 className='fw-bold text-success'>Thank you for scheduling your event!</h5>
                    </div>
                    <div className='d-flex align-items-center justify-content-center mb-5'>
                      <img
                        src={logo}
                        height="70"
                        className="d-inline-block align-top"
                        alt="ECS Training"
                      />
                      <div className='logoText mt-2'>
                        <h2 className='mb-0 fw-bold'>ECS</h2>
                        <h6 className='fw-bold'>Training</h6>
                      </div>
                    </div>
                    <hr className='mb-5' />
                    <h6 className='mb-3'>Your appointment scheduled for {formatSelectedDate()} {selectedDate && ` at ${selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`} has been confirmed.</h6>
                    <p className='paraText mb-3'>For further details check your mail.</p>
                    <button className='btn btn-primary' onClick={handleNewBookingClick}>New Booking</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container py-5' style={{ overflowX: "hidden" }}>
        <div className='row'>
          <div className='col-lg-6 col-xl-4 col-12'>
            <div className='card contactDetails p-4'>
              <div className='row'>
                <div className='col-lg-3 col-12 d-flex justify-content-center align-items-center'>
                  <FiPhoneCall color='#e41111' size={60} />
                </div>
                <div className='col-lg-9 col-12'>
                  <h3 className='text-start fw-bold'>Phone</h3>
                  <hr className='my-4' />
                  <p className='text-start fw-medium paraText'>+65 8894 1306</p>
                </div>
              </div>
            </div>
            <div className='arrow-icon mb-5'>
              <a href="tel:8608163189"><FaCircleArrowRight /></a>
            </div>
          </div>
          <div className='col-lg-6 col-xl-4 col-12'>
            <div className='card contactDetails p-4'>
              <div className='row'>
                <div className='col-lg-3 col-12 d-flex justify-content-center align-items-center'>
                  <IoMailOpenOutline color='#e41111' size={60} />
                </div>
                <div className='col-lg-9 col-12'>
                  <h3 className='text-start fw-bold'>Email</h3>
                  <hr className='my-4' />
                  <p className='text-start fw-medium paraText'>info@ecscloudinfotech.com</p>
                </div>
              </div>
            </div>
            <div className='arrow-icon mb-5'>
              <a href="mailto:info@ecscloudinfotech.com" target="_blank"><FaCircleArrowRight /></a>
            </div>
          </div>
          <div className='col-lg-6 col-xl-4 col-12'>
            <div className='card contactDetails p-4'>
              <div className='row'>
                <div className='col-lg-3 col-12 d-flex justify-content-center align-items-center'>
                  <LuMapPin color='#e41111' size={60} />
                </div>
                <div className='col-lg-9 col-12'>
                  <h3 className='text-start fw-bold'>Location</h3>
                  <hr className='my-4' />
                  <p className='text-start fw-medium paraText'>The Alexcier, 237 Alexandra Road, #04-10, Singapore-159929.</p>
                </div>
              </div>
            </div>
            <div className='arrow-icon mb-5'>
              <a href="https://maps.app.goo.gl/Y4UnULL1Gs7nAGRS8" target="_blank"><FaCircleArrowRight /></a>
            </div>
          </div>
        </div>
      </div>
      <div className='container-fluid contactDetails1'>
        <div className='container py-5'>
          <div className='row py-5'>
            <div className='col-lg-6 col-12'>
              <form onSubmit={formik2.handleSubmit}>
                <div className='card text-start p-5' style={{ border: "none", borderRadius: "30px" }}>
                  <h3 className='fw-bold mb-5'>We Are Ready To Help You</h3>
                  <div className='mb-3'>
                    <label className='form-label'>First Name<span className='text-danger'>*</span></label>
                    <input type='text'
                      className={`form-control ${formik2.touched.firstName && formik2.errors.firstName
                        ? "is-invalid"
                        : ""
                        }`}
                      {...formik2.getFieldProps("firstName")}
                    />
                    {formik2.touched.firstName && formik2.errors.firstName && (
                      <div className="invalid-feedback">
                        {formik2.errors.firstName}
                      </div>
                    )}
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>Last Name<span className='text-danger'>*</span></label>
                    <input type='text'
                      className={`form-control ${formik2.touched.lastName && formik2.errors.lastName
                        ? "is-invalid"
                        : ""
                        }`}
                      {...formik2.getFieldProps("lastName")}
                    />
                    {formik2.touched.lastName && formik2.errors.lastName && (
                      <div className="invalid-feedback">
                        {formik2.errors.lastName}
                      </div>
                    )}
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>Email<span className='text-danger'>*</span></label>
                    <input type='text'
                      className={`form-control ${formik2.touched.email && formik2.errors.email
                        ? "is-invalid"
                        : ""
                        }`}
                      {...formik2.getFieldProps("email")}
                    />
                    {formik2.touched.email && formik2.errors.email && (
                      <div className="invalid-feedback">
                        {formik2.errors.email}
                      </div>
                    )}
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>Phone Number<span className='text-danger'>*</span></label>
                    <input type='text'
                      className={`form-control ${formik2.touched.phoneNumber && formik2.errors.phoneNumber
                        ? "is-invalid"
                        : ""
                        }`}
                      {...formik2.getFieldProps("phoneNumber")}
                    />
                    {formik2.touched.phoneNumber && formik2.errors.phoneNumber && (
                      <div className="invalid-feedback">
                        {formik2.errors.phoneNumber}
                      </div>
                    )}
                  </div>
                  <div className='mb-4'>
                    <label className='form-label'>Message</label>
                    <textarea className='form-control' rows={5}
                      {...formik2.getFieldProps("message")}
                    ></textarea>
                  </div>
                  <div className='mb-3'>
                    <button type='submit' className='btn btn-danger py-2' style={{ width: "100%" }}>Send</button>
                  </div>
                </div>
              </form>
            </div>
            <div className='col-lg-6 col-12 text-start mt-5 px-5'>
              <h1 className='fw-bold mb-3'>Get in Touch with Us for Your ECS Cloud Training Needs</h1>
              <p className='fw-medium paraText mb-4'>Our ECS Cloud Training System operates with precision and speed, effortlessly handling the movement and storage of pallets within your warehouse.</p>
              <div className='d-flex align-items-center justify-content-center mb-4' style={{ marginLeft: "1.25rem" }}>
                <span> <BiSolidQuoteRight size={70} color='#e41111' /></span>
                <h5 className='fw-bold' style={{ marginLeft: "0.5rem" }}>Streamline Your Warehouse Operations with ECS Cloud Training!</h5>
              </div>
              <div className='card' style={{ borderRadius: "30px" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8044732252415!2d103.81118677348974!3d1.2916846617631323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1bb95520771b%3A0xf2b9dfa378aa9a6e!2sThe%20Alexcier!5e0!3m2!1sen!2sin!4v1722418479744!5m2!1sen!2sin"
                  width="100%"
                  height="400"
                  style={{ borderRadius: "30px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventBooking;