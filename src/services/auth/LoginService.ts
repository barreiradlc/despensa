export interface LoginDTO{
    username: string;
    password: string;
}

export async function handleLoginService(loginDTO: LoginDTO) {
    const { username, password } = loginDTO

    console.log({ username, password })

}