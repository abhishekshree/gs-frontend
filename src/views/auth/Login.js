import React from "react";
import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "context/gobalContext.js";
import { AdminAPIs } from "API/admin.js";

export default function Login() {
  // const navigate = useNavigate();
  const history = useHistory();
  const [role, setRole] = useState("admin");
  const [userId, setUserId] = useState(0);
  const [showCredentials, setShowCredentials] = useState("hidden");
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
    if (res) {
      setRole("admin");
      setUserId(res?.id);
      setShowCredentials("block");
    }
  }
  return (
    <>
      <main>
        <section className="relative w-full h-full py-40 min-h-screen content-center">
          <div
            className="absolute top-0 w-full h-full bg-no-repeat bg-full content-center"
            style={{
              backgroundColor: "#1E293B"
            }}
          >
            <span className="mb-10 text-center">
              <h1 className="text-5xl font-normal leading-normal mt-0 mb-2 text-blueGray-300">
                GROW SIMPLEE
              </h1>
            </span>
              <hr style={{width:'90%'}} className="mx-auto border-t border-blueGray-300 my-20"/>
            <div className="container mx-auto px-4 content-center h-full place-self-center" >
              <div className="flex content-center items-center content-center justify-center h-full place-self-center">
                <div className="w-full lg:w-4/12 px-4 content-center place-self-center">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 place-self-center content-center"  >
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-8 place-self-center content-center" >
                      <form>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            admin/driver
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
                            user id
                          </label>
                          <input
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            value={userId}
                            onChange={handleChangeUserId}
                          />
                        </div>
                        <div className="text-center mt-6">
                          <button
                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg hover:bg-teal-200 outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
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
          </div>
        </section>

      </main>
    </>
  );
}
