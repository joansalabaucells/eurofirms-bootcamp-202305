function retrievePost(userId, postId) {
    if (typeof userId !== 'string') throw new Error('userId is not a string')
    if (typeof postId !== 'string') throw new Error('postId is not a string')


    return fetch(`http://localhost:9000/posts/${postId}`, {
        headers: {
            Authorization: `Bearer ${userId}`
        }
    })
        .then(res => {
            if (res.status === 200)
                return res.json()
            else if (res.status === 400)
                return res.json()
                    .then(body => {
                        const message = body.error

                        throw new Error(message)
                    })
        })
}