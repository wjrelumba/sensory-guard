import { useLocation, useNavigate } from 'react-router-dom'
import DetailedAccountsCard from '../../components/shared-components/AccountsCard/DetailedAccountsCard';
import { supabase } from '../../Essentials/Supabase';
import { showErrorToast, showSuccessToast } from '../../Essentials/ShowToast';

export default function IndividualAccountHome() {
    const navigate = useNavigate();
    const location = useLocation();
    const dataValues = location.state;

    console.log(dataValues);

    const goToEdit = () => {
        navigate('/dashboard/individualAcc/edit', {state: dataValues})
    };

    const deleteAcc = async () => {
      try {
        const res = await fetch('https://sensory-guard.vercel.app/api/delete-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_id: dataValues.user_id })
        });

        const result = await res.json();

        if (!res.ok) {
          showErrorToast('Error deleting account:', result.error);
        } else {
          showSuccessToast('Account deleted successfully:', result.message);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    };

  return (
    <>
        <DetailedAccountsCard
        dataObject={dataValues}
        editClick={goToEdit}
        />
    </>
  )
}
