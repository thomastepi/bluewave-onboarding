import React from "react";
import PropTypes from "prop-types";
import Button from "../../../../components/Button/Button";
import "./ConfirmationPopupStyles.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ConfirmationPopup = ({ open, onConfirm, onCancel }) => {
  return (
    <Dialog
      PaperProps={{ className: "dialog-paper" }}
      open={open}
      onClose={onCancel}
      closeAfterTransition={open}
    >
      <DialogTitle className="dialog-title">Confirm Action</DialogTitle>
      <DialogContent className="dialog-content">
        <DialogContentText>
          Are you sure you want to perform this action?
        </DialogContentText>
      </DialogContent>
      <DialogActions className="dialog-actions">
        <Button
          text="Cancel"
          buttonType="secondary"
          variant="text"
          onClick={onCancel}
        />
        <Button
          text="Confirm"
          onClick={onConfirm}
          variant="contained"
          buttonType="secondary"
        />
      </DialogActions>
    </Dialog>
  );
};

ConfirmationPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmationPopup;
