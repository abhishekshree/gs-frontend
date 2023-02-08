import React from 'react';
import DriverCard from './driverCard.js';

export default function DriverList({ drivers, handleLoadDriver }) {
  return (
    <div className="mx-auto px-4">
      <div className="flex flex-wrap">
        {drivers.map((driver) => (
          <DriverCard props={driver} handleLoadDriver={handleLoadDriver} />
        ))}
      </div>
    </div>
  );
}
