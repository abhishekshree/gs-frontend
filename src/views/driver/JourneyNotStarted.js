import React from "react";
import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function Login() {
  // const navigate = useNavigate();
  const history = useHistory();
  const [role, setRole] = useState("admin");
  const [userId,setUserId] = useState(0);

  const handleSelectRole = (e) => {
    setRole(e.target.value);
  }
  const handleChangeUserId = (e) => {
    setUserId(e.target.value);
  }
  const handleLogin = () => {
    // navigate(`/${role}/${userId}`);
    history.push(`/${role}/${userId}`);
  }
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
            <div
              className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
              style={{
                backgroundImage:
                  "url(" + require("assets/img/register_bg_2.png").default + ")",
              }}
            ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-8">
                    <form>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                            <div className="text-center text-4xl" >
                          JOURNEY NOT STARTED
                          </div>
                        </label>
                       
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          
                        </label>
                        
                      </div>
                      <div className="text-center mt-6">
                        
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <FooterSmall absolute />
      </main>
    </>
  );
}
