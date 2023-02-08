import { DriverAPIs } from 'API/driver.js';
import { successNotification, errorNotification } from 'components/alerts/Alerts';
import React, { useState } from 'react';
import { useParams } from 'react-router';

export default function OTPModal({
  showOTPModal,
  setShowOTPModal,
  userId,
  getDriverDestinations,
}) {
  const dId = useParams();
  const [OTP, setOTP] = useState('');
  const handleChangeOTP = (e) => {
    setOTP(e.target.value);
  };

  const generateOTP = async () => {
    await DriverAPIs.generateOTP();
    successNotification('new OTP Generated');
  };

  const handleSubmitOTP = async () => {
    // post request to submit OTP
    let res = await DriverAPIs.verifyOTP(OTP);
    if (!res) {
      errorNotification('Invalid OTP \n Re-enter correct OTP');
      setOTP('');
      return;
    }
    res = await DriverAPIs.putDeliveryCompleted(dId);
    if (!res) {
      console.log('Delivery Update Failed \n Try again');
      setOTP('');
      return;
    }
    setOTP('');
    console.log('delivery completed');
    successNotification('Delivery Completed');
    getDriverDestinations(userId);
    setShowOTPModal(false);
  };

  return (
    <div>
      {showOTPModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    OTP
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowOTPModal(false)}
                  >
                    <span className="bg-blueGray-900 text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <p className="text-base font-light leading-relaxed mt-0 mb-4 text-lightBlue-800">close</p>
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <input type="text" placeholder="OTP" className="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline mr-2" value={OTP} onChange={handleChangeOTP} />
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={generateOTP}
                  >
                    Generate Again
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmitOTP}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      ) : null}
    </div>
  );
}
