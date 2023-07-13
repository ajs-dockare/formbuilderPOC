import React from "react";
import myxss from "./myxss";

const ComponentLabel = (props) => {
  const hasRequiredLabel =
    props.data.hasOwnProperty("required") &&
    props.data.required === true &&
    !props.read_only;
  const labelText = myxss.process(props.data.label);
  return (
    <label className={props.className || "col-sm-6 p-0 m-0"}>
      <span
        dangerouslySetInnerHTML={{ __html: labelText }}
        style={{
          width: "100%",
          fontFamily: "Inter",
          fontStyle: "normal",
          fontSize: "16px",
          fontWeight: "400",
          lineHeight: "19px",
          letterSpacing: "0.03em",
          color: "#A7A7A7",
        }}
      />
      {hasRequiredLabel && (
        <span className="label-required badge badge-danger">Required</span>
      )}
    </label>
  );
};

export default ComponentLabel;
