import React from "react";

export default function AboutMe() {
  const app_version = process.env.REACT_APP_NEWS_VERSION;
  return (
    <>
      <center className="about_me">
        <p
          style={{
            width: "48%",
            textAlign: "justify",
            marginTop: "6px",
            overflow: "auto",
          }}
        >
          <b>Hi Qureshi Umair here</b>, the developer of Qureshi News app hope
          you have found this app quite interesting and user friendly. If you
          have any suggestion or you have face any difficulty while using my app
          kindly do let me know by sending mail on qureshiumair08@gmail.com
          &#128578;
        </p>
        <a
          href="https://www.linkedin.com/in/qureshi-u-3b3875117"
          target="_blank"
        >
          View my linkedin profile
        </a>
        <br />
        {`version ${app_version}`}{" "}
      </center>
    </>
  );
}
