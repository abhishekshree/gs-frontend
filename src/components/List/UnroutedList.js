import React from 'react'
import CardDestination from 'components/Cards/CardDestination'

export default function UnroutedList({deliveryLocations}){
    return(
        <div className="container w-100 lg:w-4/5 mx-auto flex flex-col">
            {
                deliveryLocations.map((location) => <CardDestination props={location}/>)
            }
        </div>
    )
}