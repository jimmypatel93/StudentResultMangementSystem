import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export const CustomDialog = (props) => {
  const {
    showDialog,
    setShowDialog,
    dialogHeaderText,
    dialogConfirmText,
    dialogConfirmBtnText,
    dialogCancelBtnText,
    handleConfirm,
  } = props;

  const handleClose = () => {
    setShowDialog(false);
  };

  return (
    <Modal show={showDialog} onHide={handleClose}>
      {dialogHeaderText && (
        <Modal.Header>
          <Modal.Title>{dialogHeaderText}</Modal.Title>
        </Modal.Header>
      )}
      {dialogConfirmText && <Modal.Body>{dialogConfirmText}</Modal.Body>}
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {dialogCancelBtnText || 'Cancel'}
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          {dialogConfirmBtnText || 'Confirm'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
