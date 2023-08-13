const { ObjectId } = require('mongodb')
const context = require('./context')
const { validateId } = require('./helpers/validators')

function toggleFavPost(userId, postId) {
    // STEPS
    // 1. validate user and post exists
    validateId(userId)
    validateId(postId)

    // 2. toggle postId in user.favs ([])
    const { users, posts } = context
    //pasar variables a formato MongoDB para poder tratar
    const userObjectId = new ObjectId(userId)
    const postObjectId = new ObjectId(postId)

    // 3. save user
    return Promise.all([users.findOne({ _id: userObjectId }),
    posts.findOne({ _id: postObjectId })])
        .then(([user, post]) => {
            if (!user) throw new Error('user not found')
            if (!post) throw new Error('post not found')

            if (!user.favs) {
                user.favs = []
            }
            const index = user.favs.findIndex((idMongoPost) => idMongoPost.toString() === postId)
            //hace referencia a cada post

            if (index === -1) {
                user.favs.push(postObjectId)
            } else {
                user.favs.splice(index, 1) // quitar sólo   1
            }
            return context.users.updateOne({ _id: userObjectId }, { $set: { favs: user.favs } })
                .then(() => { })
        })
}
module.exports = toggleFavPost