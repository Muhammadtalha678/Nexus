import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { loginValidationSchema } from '../validations/auth_validation';
import axios from 'axios';
import { useState } from 'react';
import {AppRoutes} from '../constants/AppRoutes'
import {useAuth} from '../context/Authcontext'
const Login = () => {
  const navigate = useNavigate();
  const {setUser} = useAuth();
  const [serverError, setServerError] = useState(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: joiResolver(loginValidationSchema),
  });

  const onSubmit = async (data) => {
    setServerError(null);
    try {
      const res = await axios.post(AppRoutes.login, data); // Adjust endpoint as needed
      // const res = await axios.post('http://localhost:5000/api/auth/login', data); // Adjust endpoint as needed
      // console.log(res);
      
      const { accessToken} = res.data.data;

      // Save token and role in localStorage
      localStorage.setItem('authToken', accessToken);
      setUser(res.data?.data)

      // Navigate to role-based dashboard
      // navigate(`/dashboard/${role}`);
    } catch (err) {
      // console.log(err);
      
      const apiErrors = err.response?.data?.errors || {};

      // User is not registered
      if (apiErrors.email) {
        setError('email', { type: 'manual', message: apiErrors.email });
      }

      // Unverified user
      if (apiErrors.isVerified === false) {
        // Redirect to verify email page with email as query param
        navigate(`/verify-email?email=${data.email}`);
      }

      // Password error
      if (apiErrors.password || apiErrors.general) {
        setError('password', {
          type: 'manual',
          message: apiErrors.password || apiErrors.general,
        });
      }

      // General fallback error
      if (!apiErrors.email && !apiErrors.password && !apiErrors.general) {
        setServerError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">Business Nexus</h1>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">Sign in to your account</h2>
        </div>

        {serverError && <p className="text-red-600 text-center text-sm">{serverError}</p>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <input
                {...register('email')}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                className={`w-full px-3 py-2 border rounded-t-md text-gray-900 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <input
                {...register('password')}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                className={`w-full px-3 py-2 border rounded-b-md text-gray-900 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            {/* <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2 text-black" />
              Remember me
            </label> */}
            <div className="text-sm">
              <a href="#" className="text-blue-600 hover:text-blue-500">Forgot your password?</a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
            >
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-500">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
