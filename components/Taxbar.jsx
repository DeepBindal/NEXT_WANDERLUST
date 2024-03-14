
import React from "react";

const Taxbar = ({taxes, setTaxes}) => {
  return (
    <button onClick={setTaxes(!taxes)}>Click me</button>
  );
};

export default Taxbar;
