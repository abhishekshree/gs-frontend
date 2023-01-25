import React from 'react'
import CardDestination from 'components/Cards/CardDestination'

export default function DestinationList(){
    return(
        <div class="container w-100 lg:w-4/5 mx-auto flex flex-col">
            <CardDestination address="Hall-3, IIT Kanpur, Kalyanpur, Kanpur" product="xyz" name="abc" contact="+91-9696969696"/>
        </div>
    )
}