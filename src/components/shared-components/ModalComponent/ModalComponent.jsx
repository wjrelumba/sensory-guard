export default function ModalComponent({ 
  show,
  onClose,
  closeButtonShow = true,
  closeButtonMessage = 'Close',
  title, 
  message=null, 
  acceptMessage='Save Changes', 
  acceptClassname="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
  acceptFunction=null,
  color='bg-white',
})
{
  if (!show) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed z-40 inset-0 bg-black opacity-50" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="fixed z-50 inset-0 flex items-center justify-center animate-in">
        <div className={`${color} rounded-lg shadow-lg w-11/12 max-w-lg`}>
          <div className="px-6 py-4">
            <h2 className="text-xl font-bold w-full border-b-[2px] border-gray-300 font-mono">{title}</h2>
            {message && (<p>{message}</p>)}
          </div>
          <div className="flex justify-end px-6 py-4">
            {closeButtonShow && (
              <button
              className="mr-2 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
              onClick={onClose}
            >
              {closeButtonMessage}
            </button>
          )}
            <button
              className={acceptClassname}
              onClick={acceptFunction ? acceptFunction : onClose} // Replace with your save function
            >
              {acceptMessage}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
