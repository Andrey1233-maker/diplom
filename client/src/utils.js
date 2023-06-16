import { adminRoleString, bankerRoleString, playerRoleString } from "./consts"
import { defaultProfilePicture } from './consts'

export const getRoleByEmun = (roleNumber) => {
    switch(roleNumber) {
        case 2:
            return adminRoleString;
        case 1:
            return bankerRoleString;
        default:
            return playerRoleString;
    }
}

export const getColorByStyleCard = (styleNumber) => {
    switch(styleNumber) {
        case 1:
            return '#0C2CBA'
        case 2:
            return '#F50E00'
        case 3:
            return '#00C22A'
        case 4:
            return '#F5ED00'
        case 5:
            return '#D500E4'
        default:
            return '#909090'
    }
}

export const getProfilePictureByUser = (user) => user.picture ?? defaultProfilePicture
