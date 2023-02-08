import React from 'react';
import { useParams } from 'react-router-dom';

function User() {
  const { id } = useParams();

  return (
    <div className="items-center flex">
      <span className="p-2">
        <p className="text-white text-lg uppercase hidden lg:inline-block font-semibold">
          Admin
          {id}
        </p>
      </span>
      <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
        <img
          alt=""
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          className="rounded-full mx-auto max-w-120-px"
          height="100%"
          width="100%"
        />
      </span>
    </div>
  );
}

export default User;
