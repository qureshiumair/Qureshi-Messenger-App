import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import error_page_icon from '../static/error_page.gif';

export default function ErrorElement() {
  const error = useRouteError();
  let message = null;
  if (isRouteErrorResponse(error) && error.status == "404"){
    message = "404 - PAGE NOT FOUND";
  }

  else {
    message = "Seems like our API is down!!!"; 
  }

  return (
    <div>
      <img
        src={error_page_icon}
        alt="404 not found"
        className="error_page"
      />{" "}
      <center>
        <h4>
          <b>{ message}</b>
        </h4>
        <a
          href="https://www.linkedin.com/in/qureshi-u-3b3875117"
          target="_blank"
        >
          Report us
        </a>
      </center>
    </div>
  );
}
