import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function CardDelivered({props}) {
  return(
      <div v-for="card in cards" className="flex flex-col md:flex-row overflow-hidden rounded-lg shadow-xl  mt-4 w-100 mx-2" style={{backgroundColor:"#D3DFD1"}}>
      <div className="w-full py-4 px-6 flex flex-col justify-between text-wrap">
        <div className="flex justify-center items-center content-center mb-4 rounded-lg shadow-md" style={{backgroundColor:"#c6f99c"}}>
          <div className="p-2">
            <CheckCircleIcon />
          </div>
          <div>
            <h4 className="w-full text-lg font-bold leading-normal mt-0 text-gray-800">COMPLETED</h4>
          </div>
        </div>
        <h3 className="text-gray-500 font-semibold text-lg leading-tight text-wrap mb-4">{ props?.address }</h3>
        <p className="text-gray-700 mt-2 font-semibold  uppercase">
          { "Product ID : " + props?.product_id }
        </p>
        <p className="text-sm text-gray-500 tracking-wide mt-2">
          { "Recipient Name : " + props?.name } 
        </p>
      </div>
    </div>
  )
}