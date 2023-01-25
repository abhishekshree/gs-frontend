import React from "react";

// components

import MapExample from "components/Maps/MapExample.js";

export default function Maps() {
  return (
    <>
      {/* <div className="flex flex-wrap"> */}
        <div className="h-screen px-1">
          {/* <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"> */}
            <MapExample />
          {/* </div> */}
        </div>
      {/* </div> */}
    </>
  );
}
