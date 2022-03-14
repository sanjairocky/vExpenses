import React from "react";

export default ({ iconStyle = "", className = "", value = "" }) => (
  <span
    className={`material-icons${iconStyle ? `-${iconStyle}` : ``} ${className}`}
  >
    {value}
  </span>
);
