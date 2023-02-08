import React from 'react';
import { useStore } from 'store/store.js';
import UnroutedList from 'components/List/UnroutedList.js';

export default function Unrouted() {
  const { unroutedPoints } = useStore();
  return (
    <div className="h-100">
      <UnroutedList deliveryLocations={unroutedPoints} />
    </div>
  );
}
