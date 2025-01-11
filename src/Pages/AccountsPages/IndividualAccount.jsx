import React from 'react'
import { useLocation } from 'react-router-dom'
import DetailedAccountsCard from '../../components/shared-components/AccountsCard/DetailedAccountsCard';

export default function IndividualAccount() {
    const location = useLocation();
    const dataValues = location.state;

    console.log(dataValues);
  return (
    <>
        <DetailedAccountsCard
        dataObject={dataValues}
        />
    </>
  )
}
