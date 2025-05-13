import { Link, useNavigate } from 'react-router';
import { registerValidationSchema } from '../validations/auth_validation';
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios'
import { AppRoutes } from '../constants/AppRoutes';
import { useState } from 'react';
const Register = () => {
  const navigate = useNavigate();
  const { register,handleSubmit,formState:{errors,isSubmitting},setError} = useForm({
      resolver:joiResolver(registerValidationSchema)
  })
    const [successMsg, setSuccessMsg] = useState(null);
  const onSubmit = async (data) => {
      try {
        const res = await axios.post(AppRoutes.register,{name:data.name,email:data.email,role:data.role,password:data.password});
        console.log(res);
        
        const { email, message } = res.data?.data;

        // Show success message
        setSuccessMsg(message || 'User registered successfully! OTP sent to your email.');
    
        setTimeout(() => {
          navigate(`/verify-email?email=${email}`);
          
        }, 2000);
      } catch (err) {
        const backendErrors = err.response?.data?.errors;
        if (backendErrors?.email) {
          setError('email', { type: 'manual', message: backendErrors.email });
        }
  
        if (backendErrors?.general) {
          setError('general', { type: 'manual', message: backendErrors.general });
        }
  
        if (!backendErrors) {
          alert('Something went wrong. Please try again.');
        }
      }
    };
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">Business Nexus</h1>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">Create your account</h2>
        </div>
        {successMsg && <p className="text-green-600 text-center">{successMsg}</p>}
        {errors.general && (
          <p className="text-red-600 text-center">{errors.general.message}</p>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <input  {...register('name')}
                type="text"
                placeholder="Full Name"
                className={`w-full px-3 text-black py-2 border border-gray-300
                 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <input  {...register('email')}
                type="email"
                placeholder="Email address"
                className={`w-full px-3 text-black py-2 border border-gray-300
                 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div>
  <select {...register('role')} className="w-full px-3 text-black py-2 border border-gray-300 rounded-md">
    <option value="">Select Role</option>
    <option value="entrepreneur">Entrepreneur</option>
    <option value="investor">Investor</option>
  </select>
  {errors.role && <p className="text-sm text-red-600">{errors.role.message}</p>}
</div>
            <div>
              <input  {...register('password')}
                type="password"
                placeholder="Password"
                className={`w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
            </div>

            <div>
              <input  {...register('confirm_password')}
                type="password"
                placeholder="Confirm Password"
                className={`w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.confirm_password && (
  <p className="text-sm text-red-600">{errors.confirm_password.message}</p>
)}
            </div>
          </div>

          <div>
          <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {isSubmitting ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Register'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
