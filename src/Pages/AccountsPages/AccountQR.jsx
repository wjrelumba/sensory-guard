import { QRCodeSVG } from "qrcode.react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"

export default function AccountQR() {
    const location = useLocation();
    const navigate = useNavigate();

    const goBackToDashboard = () => {
        navigate(-1);
    }
    
    useEffect(() => {
    },[]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4">
        <h1>Activation State: {location.state.activated ? 'True' : 'False'}</h1>
        <h1 className="text-xl mb-5 text-center">QR Code for: {location.state.email}</h1>
        <div className="bg-white w-full h-full p-4">
            <QRCodeSVG className="w-full h-full" value={JSON.stringify({email: location.state.email, password: 'asdfasdf'})}/>
        </div>
        <button onClick={goBackToDashboard} className="mt-2 bg-blue-800 text-white w-full px-3 py-2 rounded-md">
            Back to Accounts Page
        </button>
    </div>
  )
}
