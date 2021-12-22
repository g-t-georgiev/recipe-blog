import { userCachKey, accessTokenKey } from '../constants';

export default function getAccessToken() {
    try {
        let item = localStorage.getItem(userCachKey);
        return item && JSON.parse(item)[accessTokenKey];
    } catch (error) {
        console.log(error);
        return null;
    }
}