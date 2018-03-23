import React from 'react'

const Dropdown = ({optionArr, nullText, changeCallback, disabled}) => {
    return (
        <select onChange={changeCallback} className="form-control label-select" disabled = {disabled}>
            <option value=''>{nullText}</option>
            {optionArr.map((option, index) => <option key = { index } value = { option }>{ option }</option>)}
        </select>
    )
}

export default Dropdown