import axios from "axios";

interface ICredentials {
  email: string;
  password: string;
}


export interface IUser {
  id: number;
  email: string;  
}

interface ILoginResponse extends IUser {
  token: string;
}

export async function login(credentials: ICredentials): Promise<ILoginResponse | undefined> {
  try {
    const response = await axios.post<ILoginResponse>(`${process.env.REACT_APP_API_ROOT}/auth/login`, credentials);
    if (response.data) localStorage.setItem('uToken', response.data.token);
    return response.data;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
  
export function logout(): void {
  localStorage.removeItem('uToken');
}

export async function whoami(): Promise<IUser | undefined> {
  try {
    const response = await axios.get<IUser>(`${process.env.REACT_APP_API_ROOT}/auth/whoami`, { headers: {'Authorization': `Bearer ${localStorage.getItem('uToken')}`}});
    if (response.headers['authorization']) localStorage.setItem('uToken', response.headers['authorization']);
    return response.data;
  } catch (e) {
    console.log(e);
    return undefined;
  }  
}
