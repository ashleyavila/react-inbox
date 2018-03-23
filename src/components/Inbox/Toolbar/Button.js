import React from 'react'

const Button = ({callback, innerFunc, disabled, colorClass}) => {
    return (
        <button
            onClick={callback} className={`btn ${colorClass || 'btn-default'}`} disabled={disabled || false}>
            {innerFunc()}
        </button>
    )
}

export default Button