import React from "react";
import PropTypes from "prop-types";
import Button from "../../../../components/Button/Button";
import { dialogStyles } from "./ConfirmationPopupStyles.js";
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
      PaperProps={{ sx: { padding: dialogStyles.paper } }}
      open={open}
      onClose={onCancel}
      closeAfterTransition={open}
    >
      <DialogTitle sx={dialogStyles.title}>Confirm Action</DialogTitle>
      <DialogContent sx={dialogStyles.content}>
        <DialogContentText>
          Are you sure you want to perform this action?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={dialogStyles.actions}>
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
