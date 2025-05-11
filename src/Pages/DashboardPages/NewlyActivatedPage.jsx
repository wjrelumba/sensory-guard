import React, { useState } from 'react'
import { supabase } from '../../Essentials/Supabase'
import { showErrorToast } from '../../Essentials/ShowToast';
import { useNavigate } from 'react-router-dom';

export default function NewlyActivatedPage() {
    const navigate = useNavigate();

    const [passwordValue, setPasswordValue] = useState(null);
    const [confPasswordValue, setConfPasswordValue] = useState(null);

    const updatePassword = async() => {
        if(passwordValue && passwordValue.length > 0 && confPasswordValue && confPasswordValue.length > 0){
            if((passwordValue == confPasswordValue)){
                const {data: {session}} = await supabase.auth.getSession();
                if(session){
                    const {error} = await supabase.auth.updateUser({password: passwordValue});
                    if(error){
                        showErrorToast(error.message);
                    }
                    else{
                        const {error} = await supabase.from('accounts').update({activated: true}).eq('user_id', session.user.id);
                        if(error){
                            showErrorToast(error.message);
                        }
                        else{
                            navigate('/dashboard');
                        }
                    };
                }
            }
            else{
                showErrorToast('Password and Confirm Password do not match.');
            };
        }
        else{
            showErrorToast('That is not a valid password')
        };
    };

    const cancel = async() => {
        const {error} = await supabase.auth.signOut();
        if(error){
            showErrorToast(error.message);
        }
        else{
            navigate('/login');
        }
    }

    const inputHandler = (e) => {
        const {value, name} = e.target;

        switch(name){
            case 'password':
                setPasswordValue(value);
                console.log(value);
                break;
            case 'confPass':
                setConfPasswordValue(value);
                console.log(value);
                break;
        }
    };

  return (
    <div className='w-full h-full p-4'>
        <div className='w-full h-full flex flex-col border border-gray-500 rounded-lg p-2'>
            <h1 className='text-blue-600 font-bold text-lg'>Change your Password</h1>
            <div className='w-full h-full flex mt-5 items-center'>
                <label className='w-[14rem]'>Password:</label>
                <input name='password' onChange={inputHandler} className='border border-gray-400 rounded-md px-1 w-full' type="password" />
            </div>
            <div className='w-full h-full flex mt-1 items-center'>
                <label className='w-[14rem]'>Confirm Password:</label>
                <input name='confPass' onChange={inputHandler} className='border border-gray-400 rounded-md px-1 w-full' type="password" />
            </div>
            <button onClick={updatePassword} className='bg-blue-600 px-2 py-1 rounded-lg mt-5 text-white'>Update Password</button>
        </div>
        <button onClick={cancel} className='bg-gray-600 px-2 py-1 rounded-lg mt-5 text-white w-full'>Cancel</button>
    </div>
  )
}
