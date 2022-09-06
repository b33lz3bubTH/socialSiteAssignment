

const server = "http://139.59.89.220";

export default {
    mediaUpload: () => `${server}/upload`,
    registration: () => `${server}/register`,
    login: () => `${server}/login`,
    imageView: (media) => `${server}/images/${media}`,
    update: () => `${server}/update/profile`,
    listAllUsers: () => `${server}/friend/all`,
    addFriend: () => `${server}/friend/add`,
    listAllFriends: (currentUser) => `${server}/profile/friends?email=${currentUser}`
}

export async function postData(url = '', data = {}, headers = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}
