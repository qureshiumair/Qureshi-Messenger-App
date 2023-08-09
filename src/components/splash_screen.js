import React from "react";
import app_logo from "../static/app_logo.png";

export default function SplashScreen() {
  const interval_id = setInterval(() => {
    set_width();
  }, 100);
  function set_width() {
    let ele = document.getElementById("progress_bar");
    let current_width = Number(ele.style.width.split("%")[0]);
    if (current_width > 85) {
      clearInterval(interval_id);
    }
    ele.style.width = String(current_width + 10) + "%";
  }

  return (
    <center id="splash_screen">
      <img
        src={app_logo}
        width="8%"
        alt="splash_screen_img"
        id="splash_screen_img"
      />
      <div className="progress" style={{ height: "5px", width: "15%" }}>
        <div
          className="progress-bar"
          role="progressbar"
          id="progress_bar"
          style={{ width: "5%" }}
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </center>
  );
}
