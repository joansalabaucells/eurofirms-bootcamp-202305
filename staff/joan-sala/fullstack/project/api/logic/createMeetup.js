const { validateId, validateUrl, validateText } = require('./helpers/validators')
const { User, Meetup } = require('../data')

function createMeetup(userId, image, video, text, type, adress) {
    validateId(userId)
    validateUrl(image)
    if (video) {
        validateUrl(video)
    }
    validateText(text)
    validateText(type)
    validateText(adress)

    return User.findById(userId)
        .then(user => {
            if (!user) throw new Error('User not found')

            return Meetup.create({ author: userId, image, video, text, type, adress})
        })
        .then(() => { })
}
module.exports = createMeetup
