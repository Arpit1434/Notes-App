import React from 'react'

const Alert = (props) => {
  const capitalize = (word) => {
    if (word==="danger") {
      word = "error"
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  }

  return (
    <>
      {props.alert && <div className='container mt-4 fixed-top'>
          <div className={`alert alert-${props.alert.type} fade show`} role="alert">
              <strong>{capitalize(props.alert.type)}</strong>: {props.alert.message}
          </div>
      </div>}
    </>
  )
}

export default Alert