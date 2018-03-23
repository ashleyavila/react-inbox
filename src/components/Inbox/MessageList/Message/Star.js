import React from 'react'

const Star = ({filled, callback}) => {
    return (
        <div className="col-xs-2">
            <i onClick={callback} className={`star fa ${filled ? 'fa-star' : 'fa-star-o'}`}></i>
        </div>
    )
}
    

export default Star