/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

// components

import PagesDropdown from "components/Dropdowns/PagesDropdown.js";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="top-3 absolute z-50 w-full flex flex-wrap items-center justify-center px-7 py-20 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-center">
         
           <div className="text-xl text-center outline-4  outline-blue-500 border-4 font-semibold inline-block rounded-br-lg py-3 px-3 uppercase rounded text-lightBlue-600 bg-lightBlue-200 uppercase last:mr-0 mr-1 p-6 m-8">
              GROWSIMPLEE | IITK
           </div>
            </div>
      </nav>
    </>
  );
}
