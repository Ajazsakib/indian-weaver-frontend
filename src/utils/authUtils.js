// authUtils.js
export const addAuthHeaders = () =>
{
    if (localStorage.getItem('userInfo')) {
        const user = localStorage.getItem('userInfo');
        return user
    }

};