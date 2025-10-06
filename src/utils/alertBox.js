import toast from 'react-hot-toast';

export const alertBox = (type, msg) => {
  if (type === "success") {
    toast.success(msg);
  }
  if (type === "error") {
    toast.error(msg);
  }
};