import { server } from '../services/api';

export interface AuthProps {
  email: string;
  password: string;
}

export interface UserProps {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

interface ResponseAuthProps {
  user: UserProps;
  access_token: string;
}

export async function auth(props: AuthProps): Promise<ResponseAuthProps | false> {
  return await server.post('/auth', props).then(response => {
    return response.data;
  }).catch(() => {
    return false;
  });
}

export async function findUser(userId: number): Promise<UserProps | false> {
  return await server.get(`/user/${userId}`).then(response => {
    return response.data;
  }).catch(() => {
    return false;
  });
}
