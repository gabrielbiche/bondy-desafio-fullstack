import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from 'src/graphql/mutations/login';

interface LoginResponse {
  login: {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
      company: string;
    };
  };
}

interface LoginVariables {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [login, { data, loading, error }] = useMutation<LoginResponse, LoginVariables>(LOGIN_MUTATION);

  return { login, data, loading, error };
};
