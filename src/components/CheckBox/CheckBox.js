import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import * as S from "./style";
import { ToggleOff } from "@material-ui/icons";

const CheckBox = (props) => {
  let isChecked;

  const handleToggle = () => {
    isChecked = props.toggle();
  };
  
  return (
    <S.CheckBox>
      <FormControlLabel
        control={<Checkbox checked={isChecked} onChange={() => handleToggle()} color="primary" />}
        label={props.label}
      />
    </S.CheckBox>
  );
};

export default CheckBox;
