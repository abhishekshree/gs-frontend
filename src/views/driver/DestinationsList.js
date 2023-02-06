import React from 'react'
import CardDestination from 'components/Cards/CardDestination'
import CardDelivered from 'components/Cards/CardDelivered'

export default function DestinationList({completedDest,deliveryLocations}){
    return(
        <div className="container w-100 lg:w-4/5 mx-auto flex flex-col bg-blueGray-200">
            {
                deliveryLocations.map((location,index) => <CardDestination props={location}/>)
            }
            <hr className="divide-y-4 divide-solid mt-10"/>
            {
                completedDest.map((location,index) => <CardDelivered props={location}/>)
            }
        </div>
    )
}