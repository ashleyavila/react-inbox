import React from 'react'

const Labels = ({labelArr = []}) => {
    return labelArr.map((label, index) => <span key = {index} className="label label-warning">{label}</span>)
}

export default Labels