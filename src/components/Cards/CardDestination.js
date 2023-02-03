import React from "react";

export default function CardDestination({props}) {
    return(
        <div v-for="card in cards" className="flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-xl  mt-4 w-100 mx-2">
        <div className="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
          <h3 className="font-semibold text-lg leading-tight truncate">{ props?.address }</h3>
          <p className="mt-2">
            { "Product ID : " + props?.product_id }
          </p>
          <p className="text-sm text-gray-700 uppercase tracking-wide font-semibold mt-2">
            { "Recipient Name" + props?.name } 
          </p>
        </div>
      </div>
    )
}