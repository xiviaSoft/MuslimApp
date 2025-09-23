import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import { CustomButton } from "@muc/components";
import { COLORS } from "@muc/constants";
import { Close, Search } from "@mui/icons-material";
import DeepSearch from "../DeepSearch/DeepSearch";

const DeepSearchDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <CustomButton
        title="Deep Search"
        background={COLORS.secondary.main}
        color="white"
        icon={<Search />}
        variant="contained"

        onClick={handleClickOpen}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DeepSearch />
        </DialogContent>
        <DialogActions sx={{ bgcolor: COLORS.gray.whiteGray, borderTop: `1px solid ${COLORS.gray.lightGray}`, padding: 1 }}>
          <CustomButton
            onClick={handleClose}
            title="Close"
            variant="contained"
            height="100%"
            width="120px"
            icon={<Close />}
            background={COLORS.red.main}
            color={COLORS.white.main}
          />
          <CustomButton
            title="Search"
            variant="contained"
            height="100%"
            width="120px"
            icon={<Search />}
            background={COLORS.secondary.main}
            color={COLORS.white.main}
          />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeepSearchDialog;
