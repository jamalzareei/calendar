import React from "react";
import { Link, Route, BrowserRouter, Switch, Routes } from "react-router-dom";
import Calender from "../pages/calendar";
import Home from "../pages/Home";

export default function RouterMain() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/calendar">calendar</Link>
            </li>
          </ul>
        </nav>

            <Routes>
                <Route  path="/" element={<Home />} />
                <Route path="calendar" element={<Calender />} />
            </Routes>
      </div>
    </BrowserRouter>
  );
}
