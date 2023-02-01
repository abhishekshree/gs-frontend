import React from 'react'
import CardDestination from 'components/Cards/CardDestination'

export default function DestinationList({completedDest,deliveryLocations}){
    return(
        <div class="container w-100 lg:w-4/5 mx-auto flex flex-col">
            {
                deliveryLocations.map((location) => <CardDestination props={location}/>)

            }
            <hr />
            {
                completedDest.map((location) => <CardDestination props={location}/>)
            }
        </div>
    )
}