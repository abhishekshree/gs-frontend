import React from 'react';
import DynamicPoint from 'components/modals/DynamicPoint';
import { useParams } from 'react-router-dom';

export default function Dynamic() {
  const { id } = useParams();
  const userId = id;

  return (
    <div className="pt-12">
      <DynamicPoint adminId={userId} />
    </div>
  );
}
