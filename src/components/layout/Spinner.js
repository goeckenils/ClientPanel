import React from "react";

function Spinner() {
  return (
    <div>
      <img
        src={require("./spinner.gif")}
        alt="Loading..."
        style={{
          width: "150px",
          height: "150px",
          marginTop: "25vh",
          marginLeft: "auto",
          marginRight: "auto",
          display: "block"
        }}
      />
    </div>
  );
}

export default Spinner;
