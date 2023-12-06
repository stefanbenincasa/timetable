export async function isAuthenticated() {
    const response = await fetch(`http:///localhost:5000/authenticate`, { credentials: "include" })
    return response.status === 200 ?  { response: response, result: true } : { response: response, result: false }
}

export function getCookie(name) { 
    const cookieString = document.cookie
    const cookies = cookieString.split(';')
    
    for (let cookie of cookies) {
        cookie = cookie.trim()
        const [cookieName, cookieValue] = cookie.split('=')
        
        if (cookieName === name) {
            return cookieValue
        }
    }
    
    return null
}

export function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}
