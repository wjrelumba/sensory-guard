import React from 'react';
import DetailedAccountsCard from '../components/shared-components/AccountsCard/DetailedAccountsCard';

export default function TestingPage() {
  const tempObj = {
    name: "Kyle Kryzel Carandang",
    email: "kyy@gmail.com",
    created_at: "December 3, 2024",
    role: "Admin",
    last_modified: "",
  };

  return (
    <div className='p-2'>
      <DetailedAccountsCard dataObject={tempObj} />
    </div>
  );
}
