import { React } from "react";
import PropTypes from "prop-types";
import { popupStyles } from "./PopUpMessages";
import Button from "../Button/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const PopUpMessages = ({
  open,
  header,
  leftButtonClickHandler,
  rightButtonClickHandler,
  leftButtonText,
  rightButtonText,
  children,
}) => {
  return (
    <Dialog
      PaperProps={{ sx: popupStyles.paper }}
      open={open}
      onClose={leftButtonClickHandler}
      closeAfterTransition={open}
    >
      <DialogTitle sx={popupStyles.title}>{header}</DialogTitle>

      <DialogContent sx={popupStyles.content}>{children}</DialogContent>

      <DialogActions sx={popupStyles.actions}>
        <Button
          text={leftButtonText}
          buttonType="secondary"
          variant="text"
          onClick={leftButtonClickHandler}
          sx={popupStyles.contentText}
        />
        <Button
          text={rightButtonText}
          onClick={rightButtonClickHandler}
          variant="contained"
          buttonType="secondary"
          sx={popupStyles.contentText}
        />
      </DialogActions>
    </Dialog>
  );
};

PopUpMessages.propTypes = {
  open: PropTypes.bool.isRequired,
  header: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  leftButtonClickHandler: PropTypes.func.isRequired,
  rightButtonClickHandler: PropTypes.func.isRequired,
  leftButtonText: PropTypes.string.isRequired,
  rightButtonText: PropTypes.string.isRequired,
};

export default PopUpMessages;
