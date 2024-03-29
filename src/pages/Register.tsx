import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/AuthContext';
import { useKeyboardEvent } from '../hooks/useKeyboard';

interface FormData {
  username: string;
  password: string;
  rePassword: string;
}

const Login = () => {
  const navigate = useNavigate();
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [isFailed, setIsFailed] = React.useState(false);
  const { login } = useAuthContext();

  const onSubmit = (data: FormData) => {
    setIsFailed(false);
    const localStorageUSer = localStorage.getItem('users');
    if (localStorageUSer) {
      const users = JSON.parse(localStorageUSer);
      if (users.find((user: FormData) => user.username === data.username)) {
        setIsFailed(true);
      } else {
        users.push({
          username: data.username,
          password: data.password,
          tasks: [],
        });
        localStorage.setItem('users', JSON.stringify(users));
        login(data.username, []);
        navigate('/');
      }
    } else {
      localStorage.setItem(
        'users',
        JSON.stringify([
          { username: data.username, password: data.password, tasks: [] },
        ])
      );
      login(data.username, []);
      navigate('/');
    }
  };
  useKeyboardEvent(() => onSubmit(getValues()));

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            WOW todo
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign up account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your username
                  </label>
                  <input
                    type="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    {...register('username', { required: true })}
                  />
                  {errors.username && (
                    <span className="text-red-500 text-sm">
                      User name is required
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register('password', { required: true })}
                  />
                  {errors.password && (
                    <span className="text-red-500 text-sm">
                      Password is required
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Confirm Password
                  </label>
                  <input
                    type="password"
                    id="rePassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register('rePassword', {
                      required: true,
                    })}
                  />
                  {errors.rePassword && (
                    <span className="text-red-500 text-sm">
                      Confirm password is required
                    </span>
                  )}
                </div>
                <button
                  onClick={handleSubmit(onSubmit)}
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Register
                </button>
                {isFailed && (
                  <div className="text-red-500 text-sm text-center">
                    User has been created
                  </div>
                )}
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Do have an account already?{' '}
                  <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
