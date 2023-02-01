import React from "react";

export default function CardDrawer({props}) {
  return (
    <div className="w-full p-4 rounded-2xl bg-white dark:bg-slate-800 flex flex-col ease-linear duration-300 md:flex-row-reverse">
      <div className=" h-full w-full mr-2 rounded-2xl ">
        <div class="divide-y8 divide-solid">
            <div>
                <p className="m-2 font-bold pl-1 text-lg text-indigo-800">Address</p>
                <p className="m-2 text-2xl font-bold dark:text-white">
                    {props.address}
                </p>
                <hr class="h-px my-8 bg-indigo-700"/>
            </div>

            <div>
                <p className="text-lg font-light leading-relaxed mt-6 mb-4 text-blueGray-800">
                    Product Id:
                </p>
                <p className="text-lg font-light leading-relaxed mt-6 mb-4 text-lightBlue-800">
                    <b>{props.product_id}</b>
                </p>
            </div>
        </div>
        <div className=" pt-4 pr-2 pl-2 flex flex-row justify-around flex-wrap">
          <div className="flex flex-row items-center m-2">
            <h1 className="pl-1 dark:text-white">Recipient Name: {props.name}</h1>
          </div>
        </div>

        <div className="flex flex-row">
            <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                View All Deliveries
            </button>
        </div>
      </div>
    </div>
  );
}
