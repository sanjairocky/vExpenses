import moment from "moment";
import React from "react";

import defaultImg from "./defaultImg";

export default ({ imageUrl = defaultImg, name, createdAt }) => (
  <div className="d-flex border-bottom p-3 my-1 mx-3">
    <div style={{ height: "50px" }} className="mx-2">
      <img src={imageUrl} className="w-100 h-100 rounded-circle" />
    </div>
    <div className="d-flex flex-column justify-content-center flex-grow-1 px-2">
      <span>{name}</span>
      <span>{`joined : ${moment(createdAt).calendar()}`}</span>
    </div>
  </div>
);
