import { useLocation, useNavigate } from "react-router-dom";
import monthExtractor from "../../Essentials/MonthExtractor";
import { useEffect, useState } from "react";
import { supabase } from "../../Essentials/Supabase";
import { showErrorToast } from "../../Essentials/ShowToast";
import ModalComponent from "../../components/shared-components/ModalComponent/ModalComponent";


export default function EditAccount() {
    const location = useLocation();
    const dataValues = location.state;
    const navigate = useNavigate();

    const [nameValue, setNameValue] = useState(null);
    const [roleValue, setRoleValue] = useState(null);

    const [showSaveModal, setShowSaveModal] = useState(true);

    const goBack = () => {
        navigate(-1);
    };

    const inputHandler = (e) => {
        const {value, name} = e.target;
        switch(name){
            case 'name':
                setNameValue(value);
                break;
            case 'role':
                setRoleValue(value);
                break;
        };
    };

    const closeSaveModal = () => {
        setShowSaveModal(false);
    };

    const openSaveModal = () => {
        if(nameValue || roleValue){
            setShowSaveModal(true);
        }
        else{
            showErrorToast(`You haven't done any changes.`)
        }
    }

    const updateData = async () => {
        const updates = {};
        const hasName = nameValue && nameValue.length > 0;
        const hasRole = roleValue && roleValue.length > 0;

        if (hasName) updates.name = nameValue;
        if (hasRole) updates.role = roleValue;

        if (Object.keys(updates).length === 0) {
            showErrorToast('You need to edit something to save this');
            return;
        }

        const { error } = await supabase
            .from('accounts')
            .update(updates)
            .eq('user_id', dataValues.user_id);

        if (error) {
            showErrorToast(error.message);
        } else {
            navigate('/dashboard/accounts');
        }
    };

    useEffect(() => {
        console.log(dataValues);

        return () => {
            setShowSaveModal(false);
            setNameValue(null);
            setRoleValue(null);
        }
    },[])

  return (
    <>
        <ModalComponent
        show={showSaveModal}
        title={{first: 'Apply', second: 'Changes'}}
        message={'Do you want to save changes made with this user?'}
        acceptMessage="Yes, Save"
        closeButtonMessage="Cancel"
        onClose={closeSaveModal}
        acceptFunction={updateData}
        />
        <div className='border border-gray-300 rounded-lg w-full flex flex-col gap-1 p-4'>
            <div className='flex flex-col gap-1'>
                {/* Name Section */}
                <div className='flex gap-1 items-center'>
                    <h1 className='text-sm w-[3rem] font-bold text-gray-600'>Name:</h1>
                    <input onChange={inputHandler} name='name' defaultValue={dataValues.name} className='text-sm text-gray-600 border border-gray-300 rounded-lg w-full px-2 py-1'/>
                </div>

                {/* Email Section */}
                {/* <div className='flex gap-1'>
                    <h1 className='text-sm w-[2.5rem]'>Email:</h1>
                    <h1 className='text-sm text-gray-400'>{dataValues.email}</h1>
                </div> */}

                {/* Role section */}
                <div className='flex gap-1 items-center'>
                    <h1 className='text-sm w-[3rem] font-bold text-gray-600'>Role:</h1>
                    <select onChange={inputHandler} name='role' defaultValue={dataValues.role} className='text-sm text-gray-600 border border-gray-300 rounded-lg w-full px-1 py-1' id="">
                        <option value="Admin">Admin</option>
                        <option value="Analyst">Analyst</option>
                    </select>
                </div>

                {/* Created on section */}
                <div className='flex gap-1 mt-2'>
                    <h1 className='text-sm italic text-gray-400'>Created on:</h1>
                    <h1 className='text-sm text-gray-400 italic'>{monthExtractor(dataValues.date_created.month)} {dataValues.date_created.day}, {dataValues.date_created.year}</h1>
                </div>

                {/* Last modified section */}
                <div className='flex gap-1'>
                    <h1 className='text-sm italic text-gray-400'>Last modified:</h1>
                    <h1 className='text-sm text-gray-400 italic'>{dataValues.last_modified}</h1>
                </div>

                {/* Buttons section */}
                <div className='w-full flex justify-end gap-1'>
                    <button onClick={openSaveModal} className='rounded-full px-4 bg-blue-600 text-sm text-white'>Save</button>
                    <button onClick={goBack} className='rounded-full px-4 bg-gray-300 text-sm text-gray-600'>Cancel</button>
                </div>
            </div>
        </div>
    </>
  );
}
