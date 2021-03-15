function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
export async function login(email: string, password: string) {
    await sleep(2000)
    if(password === '123'){
        return true
    }
    return false
}
