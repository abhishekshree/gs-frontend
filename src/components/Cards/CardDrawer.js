import React from "react";
import CallIcon from '@mui/icons-material/Call';

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);

  var hDisplay = h > 0 ? h + "h " : "";
  var mDisplay = m > 0 ? m + "m " : "";
  var sDisplay = s > 0 ? s + "s " : "";
  return hDisplay + mDisplay + sDisplay; 
}

export default function CardDrawer({props}) {
  return (
    <div className="w-full p-4 rounded-2xl bg-white dark:bg-slate-800 flex flex-col ease-linear duration-300 md:flex-row-reverse" style={{backgroundColor:"#E6E8EB"}}>
      <div className=" h-full w-full mr-2 rounded-2xl ">
        <div className="divide-y8 divide-solid">
            <div className="flex justify-between mb-6 divide-x">
              <span className="font-bold">{"Estimated Delivery Time\n : " + secondsToHms(props?.EDT)}</span>
              <span className="rounded-full p-2 shadow-lg font-bold" style={{backgroundImage: "linear-gradient(#fcb900,#daa003)"}}>{props?.pickup ? "Pickup" : "Delivery"}</span>
            </div>
            <div className="rounded-lg">
                <h2 className="m-2 font-semibold pl-1 text-md text-gray-800">Address</h2>
                <p className="m-2 text-md font-bold dark:text-white">
                    {props?.address}
                </p>
                <hr className="h-px my-8 bg-indigo-700"/>
            </div>

            <div className="flex hustify-center">
                <p className="text-lg font-light leading-relaxed text-blueGray-800">
                    Product Id:
                </p>
                <p className="text-lg font-light leading-relaxed text-lightBlue-800 mx-2">
                    <b>{props?.product_id}</b>
                </p>
            </div>
        </div>
        <div className="pt-4 flex flex-wrap">
            <h1 className="pl-1 dark:text-white">Recipient Name: {props?.name}</h1>
            <div className="bg-gray-300 rounded-full" style={{marginLeft: "40px"}}>
              <CallIcon />
            </div>
        </div>
      </div>
    </div>
  );
}
