import * as React from "react";

export default props => {
  return (
    <div className={`alert ${props.variant ? "alert-" + props.variant : 'alert-info'}`}>
      {props.children}
    </div>
  )
}
