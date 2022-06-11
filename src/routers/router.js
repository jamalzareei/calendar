import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Header from "../components/Header";
import Calender from "../pages/calendar";
import CalenderExpert from "../pages/calender-expert";
import CalenderExpertV2 from "../pages/calender-expert-2";
import Home from "../pages/Home";

export default function RouterMain() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container mt-5 pt-5">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="calendar" element={<Calender />} />
          <Route path="calendar-expert" element={<CalenderExpert />} />
          <Route path="calendar-expert-v2" element={<CalenderExpertV2 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
