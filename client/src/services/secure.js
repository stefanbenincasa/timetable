export async function isAuthenticated() {
    const response = await fetch(`http:///localhost:5000/authenticate`, { credentials: "include" })
    return response.status === 200 ?  { response: response, result: true } : { response: response, result: false }
}
