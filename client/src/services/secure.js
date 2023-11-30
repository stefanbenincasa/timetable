export async function isAuthenticated() {
    const response = await fetch(`http:///localhost:5000/authenticate`, { credentials: "include" })
    if(response.status === 200) {
        return true 
    }
    else {
        return false
    }
}