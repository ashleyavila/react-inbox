const _getMessages = async () => {
    let messagesResponse = await fetch(`${process.env.REACT_APP_API_URL}`)
    let messagesJson = await messagesResponse.json()
    let { messages } = messagesJson._embedded
    return messages
}

const _postMessage = async ({body, subject}) => {
    let createdResponse = await fetch(`${process.env.REACT_APP_API_URL}`, {
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        method: 'POST',
        body: JSON.stringify({subject, body})
    })
    let createdJson = await createdResponse.json()
    return createdJson
}

const _updateMessages = async (messageIdArray, command, newValue) => {
    let key = command.includes('Label') ? 'label' : command
    let patchObject = {
        messageIds: messageIdArray,
        command
    }
    if (command !== 'delete') patchObject[key] = newValue
        await fetch(`${process.env.REACT_APP_API_URL}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify(patchObject)
    })
    return true
}


export {_getMessages, _postMessage, _updateMessages}
