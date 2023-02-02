/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

// components

import PagesDropdown from "components/Dropdowns/PagesDropdown.js";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      {/* <nav className="top-3 absolute z-50 w-full flex flex-wrap items-center justify-center px-7 py-20 navbar-expand-lg"> */}
        <div className="">
          <h2 className="text-5xl font-normal leading-normal mt-0 mb-2 text-blueGray-300">
            GROW SIMPLEE
          </h2>
        </div>
      {/* </nav> */}
    </>
  );
}
