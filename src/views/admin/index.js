import { AdminAPIs } from 'API/admin.js';
import Admin from 'layouts/Admin.js';
import React, { useEffect, useState } from 'react';
import { Redirect, Route, useParams } from 'react-router-dom';
import { useStore } from 'store/store.js';

export default function AdminRouter() {
  const { dayStarted, setDayStarted } = useStore();
  const { id } = useParams();
  const userId = id;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDayStarted = async () => {
      const adminDayStarted = await AdminAPIs?.getAdminDayStarted();
      setDayStarted(adminDayStarted);
      setIsLoading(false);
      console.log(adminDayStarted);
    };
    getDayStarted();
  }, []);

  return (
    <Route>
      {
                (!isLoading) && (
                  dayStarted[Number(userId)]
                    ? <Admin />
                    : <Redirect to={`/admin/${userId.toString()}/start`} />
                )
}
    </Route>
  );
}
