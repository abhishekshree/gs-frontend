import React from 'react';

import User from './User.js';

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
      <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
        <a
          className="text-white text-2xl uppercase hidden lg:inline-block font-semibold"
          href="#pablo"
          onClick={(e) => e.preventDefault()}
        >
          GrowSimplee
        </a>
        <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
          <User />
        </ul>
      </div>
    </nav>
  );
}
