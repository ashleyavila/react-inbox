import React from 'react'

const Checkbox = ({isChecked, callback}) => {
    return (
        <div className="col-xs-2">
            <input onChange={callback} type="checkbox" checked={isChecked ? 'checked' : ''}/>
        </div>
    )
}

export default Checkbox