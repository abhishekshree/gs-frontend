import React from "react";

export default function FooterAdmin() {
  return (
    <>
      <footer className="block py-4" style={{backgroundColor:"#18191a"}}>
        <div className="container mx-auto px-4">
          <hr className="mb-4 border-b-1 border-blueGray-200" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">
              <div className="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left">
              © {new Date().getFullYear()}{" "} Grow Simplee. 
                
                  Inter IIT Tech Meet 11.0
                
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
