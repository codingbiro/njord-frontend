import axios from 'axios';

interface ICredentials {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  email: string;
  name: string;
}

interface ILoginResponse extends IUser {
  token: string;
}

interface Response<T> {
  data: T;
  headers: Record<string, string>;
}

export async function login(credentials: ICredentials): Promise<Response<ILoginResponse> | undefined> {
  try {
    const response = await axios.post<ILoginResponse>(`${process.env.REACT_APP_API_ROOT}/auth/login`, credentials);
    return response;
  } catch (e) {
    return undefined;
  }
}

export async function whoami(): Promise<Response<IUser> | undefined> {
  try {
    const response = await axios.get<IUser>(`${process.env.REACT_APP_API_ROOT}/auth/whoami`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('uToken')}` },
    });
    return response;
  } catch (e) {
    return undefined;
  }
}
