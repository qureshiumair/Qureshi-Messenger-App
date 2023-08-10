import React from "react";
import spinner_gif from "../static/spinner.gif";

export default function Spinner() {
  return (
    <div style={{color:"blue"}}>
      <img className="rounded mx-auto my-8 d-block " src={spinner_gif} alt="loading spinner"/>
    </div>
  );
}
