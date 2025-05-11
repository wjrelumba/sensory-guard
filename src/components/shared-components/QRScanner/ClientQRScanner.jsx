import { useNavigate } from "react-router-dom";
import QRScanner from "./QRScanner";

export default function ClientQRScanner() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-2">
        <div className="mb-2">
            <h1 className="text-xl">
                Scan QR Provided by Admin
            </h1>
        </div>
        <div className="w-full h-full p-2 bg-gray-900 rounded-lg border-[2px] border-blue-400">
            <QRScanner/>
        </div>
        <button className="mt-4 bg-gray-700 text-white px-6 py-1 rounded-xl" onClick={goBack}>Go Back</button>
    </div>
  )
}