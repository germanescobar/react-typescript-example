import * as React from 'react'

export default props => {
  return (
    <div className={`form-group ${props.error ? 'has-error' : null}`}>
      {props.children}
      {props.error ? <span className="error-help">{props.error}</span> : null}
    </div>
  )
}
