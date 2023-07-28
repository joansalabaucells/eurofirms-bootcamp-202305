function retrieveUser(userId) {
    if (typeof userId !== 'string') throw new Error('UserId is not a string')

    return fetch('http://localhost:9000/users/', {
        method: 'GET',
        headers: {
              Authorization: `Bearer ${userId}`
        }
    })
        .then(res => {
            if (res.status === 200)
                return res.json()
                    .then(body => {
                        const user = body
                        return user
                    })
            else if (res.status === 400)
                return res.json()
                    .then(body => {
                        const message = body.error
                        throw new Error(message)
                    })
        })
}