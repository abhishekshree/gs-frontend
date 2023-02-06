import { useState } from "react";
import { AdminAPIs } from "API/admin.js";
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const [role, setRole] = useState("admin");
  const [userId, setUserId] = useState(0);
  const [newAdminId, setNewAdminId] = useState(0);
  const [showCredentials, setShowCredentials] = useState("hidden");
  const handleSelectRole = (e) => {
    setRole(e.target.value);
  };
  const handleChangeUserId = (e) => {
    setUserId(e.target.value);
  };
  const handleLogin = () => {
    history.push(`/${role}/${userId}/drivers`);
  };
  const handleCreateAdmin = async () => {
    const res = await AdminAPIs.createAdmin();
    if (res) {
      setRole("admin");
      setUserId(res?.id);
      setNewAdminId(res?.id);
      setShowCredentials("block");
    }
  };
  return (
    <>
      <main>
        <section className="absolute w-full h-full min-h-screen content-center">
          <div
            className="flex flex-col items-start w-full h-full bg-no-repeat bg-full content-center mx-0"
            style={{ backgroundHeight:"auto", backgroundImage: "url(https://static1.bigstockphoto.com/0/2/4/large1500/420303436.jpg)", backgroundRepeat:"repeat-y", backgroundColor:"#708090",
            }}
          >
            <div className="container pt-1 h-14  px-4 content-center  place-self-center " >
              <span className="text-center bg-indigo-500" style = {{ width: "20%"}}>
                <h1 className="text-5xl bold leading-normal mt-10 mb-0 text-blueGray-200 " style = {{
                  backgroundColor: "#000000", fontFamily: "Courier New", borderColor:"#446879", borderStyle: "solid", borderWidth: "7px",
                  outlineStyle:"solid", outlineWidth: "5px", outlineColor: "#779eb2", borderRadius: "10px", padding: "10px", textAlign: "center",
                  background: "linear-gradient(90deg, 	#536872, #293c49, #536872)"
                  }}>
                  <div style = {{fontWeight:"bold"}}>
                  GROW SIMPLEE
                  </div>
                </h1>
                {/* <div className="items-center" style={{alignItems: "center"}}>
                  <img alt="GROW SIMPLEE" src={require("assets/img/gslogo.png").default} width="500rem"/>
                </div> */}
              </span>
              
            </div>
            <div className="container h-12 mx-auto h-full w-full pt-32" >
               <div className="flex justify-center h-full w-full"  /*style={{backgroundColor:"#253f4b", borderTopStyle: "solid", borderLeftStyle: "solid", borderRightStyle: "solid", borderWidth:"8px", borderTopLeftRadius:"15px", borderTopRightRadius:"15px", borderColor: "#536872"}} */>
                <div className=" w-full lg:w-4/12 ">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 place-self-center content-center" 
                  style={{backgroundColor:"#daeaf0"}}>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-8 place-self-center content-center">
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
                          <div className={showCredentials}>
                            <p className="text-base font-light leading-relaxed mt-0 mb-4 text-blueGray-800 ">
                              Admin has been created with the following
                              credentials:
                            </p>
                            <p className="text-lg font-light leading-relaxed mt-6 mb-4 text-red-800">
                              Admin Id : {newAdminId}
                            </p>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              
              
            </div>
            
          </div>
          {/* <div style={{position:"absolute", bottom:"0px",backgroundColor:"#000000" ,width:"100vw"}}><FooterAdmin></FooterAdmin></div> */}
        </section>
      </main>
    </>
  );
}
