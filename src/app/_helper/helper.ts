import { User } from "../_model/user"

const defaulAvatar = '/assets/human.png'
const defaulPhotoOfTheDay = '/assets/noimg.png'

function getAvater(user: User): string {
    if (user.photos) {
        const avatar = user.photos.find(p => p.is_avatar === true)
        if (avatar)
            return avatar.url
    }

    return defaulAvatar
}
function getPhotoOfTheDay(user: User): string {
    if (user.photos && user.photos.length > 0) {
        const index = Math.floor(Math.random() * user.photos.length)
        return user.photos[index].url
    }
    return defaulPhotoOfTheDay
}
export function parseUserPhoto(user: User): User {
    user.avatar = getAvater(user)
    user.photoOfTheDay = getPhotoOfTheDay(user)
    return user
}
