import React from 'react';
import TonersTable from '../components/TonerTable';

const Toners = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Stock de Toners</h1>
      <TonersTable />
    </div>
  );
};

export default Toners;