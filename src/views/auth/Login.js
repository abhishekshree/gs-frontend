import React from "react";
import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";
import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "context/gobalContext.js";
import { AdminAPIs } from "API/admin.js";

export default function Login() {
  // const navigate = useNavigate();
  const {dayStarted,setDayStarted} = useContext(GlobalContext);
  const history = useHistory();
  const [role, setRole] = useState("admin");
  const [userId,setUserId] = useState(0);
  const [showCredentials,setShowCredentials] = useState("hidden");
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
  const handleCreateAdmin = async () => {
    const res = await AdminAPIs.createAdmin()
    if(res){
      setRole("admin");
      setUserId(res?.id);
      setShowCredentials("block");
      const temp = dayStarted;
      temp[res.id] = false;
      console.log(temp);
      setDayStarted(temp);
    }
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
                          Admin/Driver
                        </label>
                        <select
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value={role}
                          onChange={handleSelectRole}
                        >
                          <option value="admin">Admin</option>
                          <option value="driver">Driver</option>
                        </select>
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          User ID
                        </label>
                        <input
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value = {userId}
                          onChange = {handleChangeUserId}
                        />
                      </div>
                      <div className="text-center mt-6">
                        <button
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="button"
                          onClick={handleLogin}
                        >
                          Log In
                        </button>
                        <button
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="button"
                          onClick={handleCreateAdmin}
                        >
                          Create Admin
                        </button>
                        <div className={showCredentials}><p className="text-base font-light leading-relaxed mt-0 mb-4 text-blueGray-800 ">
                          Admin has been created with the following credentials:
                          </p>
                          <p className="text-lg font-light leading-relaxed mt-6 mb-4 text-red-800">Admin Id :  {userId}</p>
                        </div>
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
