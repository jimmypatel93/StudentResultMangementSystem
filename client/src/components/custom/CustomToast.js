/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { TOAST_TYPES } from '../../utils/constants';

export const CustomToast = (props) => {
  const { showToast, toastMessage, toastType } = props;

  useEffect(() => {
    if (showToast) {
      switch (toastType) {
        case TOAST_TYPES.INFO:
          toast.info(toastMessage);
          break;
        case TOAST_TYPES.SUCCESS:
          toast.success(toastMessage);
          break;
        case TOAST_TYPES.WARNING:
          toast.warning(toastMessage);
          break;
        case TOAST_TYPES.ERROR:
          toast.error(toastMessage);
          break;
        default:
          toast.success(toastMessage);
          break;
      }
    }
  }, [showToast]);

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      closeOnClick
      theme="colored"
    />
  );
};
