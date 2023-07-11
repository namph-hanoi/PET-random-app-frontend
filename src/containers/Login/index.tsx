import type { AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form';
import axiosInstance from 'src/utils/request';

async function postData(data = {}) {
  axiosInstance()({
    method: 'post',
    url: '/api/v1/auth/login',
    data,
  }).then((response: AxiosResponse) => {
    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
  });
}

function Login() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log(['🚀 ~ file: index.tsx:24 ~ onSubmit ~ data:', data]);
    postData(data).then((response) => console.log(response));
  };

  return (
    <>
      <div className="w-full max-w-xs">
        <form
          className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="username"
            >
              User name
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="username"
              type="text"
              placeholder="username"
              {...register('username')}
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="email"
              type="email"
              placeholder="Email"
              {...register('email')}
            />
          </div>
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border border-red-500 py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="password"
              type="password"
              placeholder="******************"
              {...register('password')}
            />
            <p className="text-xs italic text-red-500">
              Please choose a password.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
              type="submit"
            >
              Login
            </button>
            <a
              className="inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
        <p className="text-center text-xs text-gray-500">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
    </>
  );
}

export default Login;
