export default function ModalComponent({ 
  show,
  onClose,
  closeButtonShow = true,
  closeButtonMessage = 'Close',
  closeButtonClassname = 'bg-gray-300 hover:bg-gray-400 text-black px-4 rounded-full',
  title,
  message=null, 
  acceptMessage='Save Changes', 
  acceptClassname="bg-blue-500 hover:bg-blue-700 text-white px-4 rounded-full mr-1",
  acceptFunction=null,
  color='bg-white',
  mode = 'confirmation', // Modes: confirmation, input, notfication
  inputElement = null, // This takes in a jsx function
})
{
  if (!show) return null;

  if(mode == 'confirmation') return (
    <>
      {/* Overlay */}
      <div className="fixed z-40 inset-0 bg-black opacity-50" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="fixed z-50 inset-0 flex items-center justify-center animate-in">
        <div className={`${color} rounded-lg shadow-lg w-11/12 max-w-lg`}>
          <div className="px-6 py-4">
            <h2 className="text-xl text-gray-700 font-bold w-full border-b-[2px] border-gray-600 pb-1 font-mono">{title}</h2>
            {message && (<p>{message}</p>)}
          </div>
          <div className="flex justify-end px-6 py-4">
            <button
              className={acceptClassname}
              onClick={acceptFunction ? acceptFunction : onClose} // Replace with your save function
            >
              {acceptMessage}
            </button>
            {closeButtonShow && (
              <button
              className={closeButtonClassname}
              onClick={onClose}
            >
              {closeButtonMessage}
            </button>
          )}
          </div>
        </div>
      </div>
    </>
  );

  if(mode == 'input') return (
    <>
      {/* Overlay */}
      <div className="fixed z-40 inset-0 bg-black opacity-50" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="fixed z-50 inset-0 flex items-center justify-center animate-in">
        <div className={`${color} rounded-lg shadow-lg w-11/12 max-w-lg`}>
          <div className="px-6 py-4">
            <div className="w-full flex justify-center items-center gap-1">
              <h2 className="text-xl font-bold text-blue-600">{title.first}</h2>
              <h2 className="text-xl font-bold text-gray-700">{title.second}</h2>
            </div>
            {inputElement}
          </div>
          <div className="flex justify-end gap-1 px-6 py-4">
            <button
              className={acceptClassname}
              onClick={acceptFunction ? acceptFunction : onClose} // Replace with your save function
            >
              {acceptMessage}
            </button>
            {closeButtonShow && (
              <button
              className={closeButtonClassname}
              onClick={onClose}
            >
              {closeButtonMessage}
            </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
