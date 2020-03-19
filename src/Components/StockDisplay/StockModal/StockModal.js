import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {
  StockDetailsModal,
  TitlePaper,
  DetailPaper,
  H2,
  P
} from "./../StockDisplayStyles";

const StockModal = props => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = e => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleClose = e => {
    e.stopPropagation();
    setOpen(false);
  };

  const { symbol, stockObject } = props;
  const { name, price, description, employeeTotal, country, gsector } =
    stockObject || {};

  const modalData = {
    Name: name,
    Price: price,
    Description: description,
    "Employee Number": employeeTotal,
    Country: country,
    "Global Sector": gsector
  };

  const formatData = () => {
    return Object.keys(modalData).map((d, i) => {
      return (
        <P key={`Modal-${symbol}-${i}`}>
          <strong>{d}:</strong> {`${d === "Price" ? "$ " : ""}`}
          {modalData[d]}
        </P>
      );
    });
  };

  return (
    <div>
      <Button variant="contained" color="default" onClick={handleClickOpen}>
        More...
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <StockDetailsModal>
          <TitlePaper style={{ background: "#024574" }}>
            <H2>{symbol || "DUMMY"}</H2>
          </TitlePaper>
          <DetailPaper style={{ background: "#024574" }}>
            {formatData()}
          </DetailPaper>
        </StockDetailsModal>
      </Dialog>
    </div>
  );
};

export default StockModal;
