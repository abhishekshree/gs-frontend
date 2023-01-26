import React from "react";
import { useState,useContext } from 'react';
import Loading from "components/Loading/loading.js";
import { GlobalContext } from "context/gobalContext.js";
import { useHistory } from "react-router-dom";
import Admin from "API/admin/admin.js"

export default function Start(props) {
    var FormData = require('form-data');
    const {role,userId} = props;
    const {dayStarted,setDayStarted} = useContext(GlobalContext);
    const [loading,setLoading] = useState(false);
    const [file, setFile] = useState();
    const history = useHistory();

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
    
    const handleUploadClick = () => {
        if (!file) {
          return;
        }
        setLoading(true)

        var destinationsData = new FormData()
        destinationsData.append('file',file);
        destinationsData.append('no-of_drivers',)
        Admin.postAdminInput()

        fetch('/admin/destinations', {
          method: 'POST',
          body: file,
          headers: {
            'content-type': file.type,
            'content-length': `${file.size}`,
          },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            // handleJourneyStarted()
            setDayStarted(true);
            const redirectUrl = "/admin/" + userId.toString()
            history.replace(redirectUrl)
        })
        .catch((err) => console.error(err));
        setDayStarted(true);
        const redirectUrl = "/admin/" + userId.toString() //to be removed
        history.replace(redirectUrl)
    };

    return (
        <div className="flex flex-wrap p-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                {
                    (!loading)&&(
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form>
                            <div className="flex flex-wrap">
                                <div class="flex justify-center">
                                    <div class="mb-3 w-96">
                                        <label for="formFile" class="form-label inline-block mb-2 text-gray-700">drop destinations file</label>
                                        <input class="form-control
                                            block
                                            w-full
                                            px-3
                                            py-1.5
                                            text-base
                                            font-normal
                                            text-gray-700
                                            bg-white bg-clip-padding
                                            border border-solid border-gray-300
                                            rounded
                                            transition
                                            ease-in-out
                                            m-0
                                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>
                                <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-1/4 ml-auto" type="button" onClick={handleUploadClick}>
                                    Start Journey
                                </button>
                            </div>
                            <hr className="mt-6 border-b-1 border-blueGray-300" />
                        </form>
                    </div>
                    )
                }
                {(loading)&&(<Loading />)}
            </div>
        </div>
    );
}
