const TOKEN_KEY = "access_token";


export const saveToken = (token:string) => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const getToken = ()=> {
    const token = localStorage.getItem(TOKEN_KEY);
    if(token) return token;
    else return null; 
}


export const clearToken = ()=> {
    localStorage.removeItem(TOKEN_KEY);
}

export const isLoggedIn = () => {
    return getToken();
}

