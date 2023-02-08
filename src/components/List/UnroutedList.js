import React from 'react';
import CardDestination from 'components/Cards/CardDestination';

export default function UnroutedList({ deliveryLocations }) {
  return (
    <div className="container w-100 lg:w-4/5 mx-auto flex flex-col">
      {
                deliveryLocations.map((location) => <CardDestination props={location} />)
            }
      {
                deliveryLocations.length === 0
                && (
                <div>
                  <img
                    alt=""
                        // src={require("assets/img/All-Good.gif").default}
                    src="https://i.ibb.co/nnHZYNh/All-Good.gif"
                    className="w-1/2 mx-auto mt-6"
                  />
                  <h2 className="text-5xl font-bold leading-normal mt-0 mb-2 text-blueGray-800 text-center">
                    No Unrouted Points
                  </h2>
                </div>
                )
            }
    </div>
  );
}
