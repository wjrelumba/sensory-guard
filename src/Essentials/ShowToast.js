import { toast } from "react-toastify";

export const showErrorToast = (message) => {
    toast.error(message, {
        position: "top-left",
        autoClose: 2500, // Time in ms before the toast automatically closes
        hideProgressBar: false, 
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored", // Options: "light", "dark", "colored"
        style: {
          backgroundColor: '#d52e2e', // Custom background color Dark red = #d52e2e , glowy red = #ff3c3c
          color: '#fff', // Custom text color
          borderRadius: '5px',
          width: '75%',
          marginTop: '0.5rem',
          marginLeft: '0.5rem',
        },
        icon: "🚨", // Custom icon
    });
}

export const showSuccessToast = (message) => {
  toast.success(message, {
      position: "top-left",
      autoClose: 2500, // Time in ms before the toast automatically closes
      hideProgressBar: false, 
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored", // Options: "light", "dark", "colored"
      style: {
        backgroundColor: '#1d4ea1', // Custom background color #1d4ea1 = Blue color #166534 = Green
        color: '#fff', // Custom text color
        borderRadius: '5px',
        width: '75%',
        marginTop: '0.5rem',
        marginLeft: '0.5rem',
      },
      icon: "🚨", // Custom icon
  });
}