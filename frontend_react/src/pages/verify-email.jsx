import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import axios from 'axios';
import { AppRoutes } from '../constants/AppRoutes';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const email = new URLSearchParams(search).get('email');

  const [timerKey, setTimerKey] = useState(0);
  const [resendAllowed, setResendAllowed] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError: setFormError,
  } = useForm();

  useEffect(() => {
    if (!email) navigate('/register');
  }, [email, navigate]);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(AppRoutes.verifyEmail, {
        email,
        token: data.otp,
      });

      setSuccessMsg(res.data?.data?.message || 'OTP verified!');
      setError(null);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      const apiErrors = err.response?.data?.errors || {};
      if (apiErrors.otp) {
        setFormError('otp', { type: 'manual', message: apiErrors.otp });
      } else {
        setError(apiErrors.general || 'Something went wrong');
      }
    }
  };

  const handleResend = async () => {
    try {
      const res = await axios.post(AppRoutes.resendEmail, { email });
      setSuccessMsg(res.data?.data?.message || 'OTP resent successfully.');
      setError(null);
      setResendAllowed(false);
      setTimerKey((prev) => prev + 1); // Reset the timer
    } catch (err) {
      const msg = err.response?.data?.errors?.general || 'Failed to resend OTP';
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold text-center">Verify Your Email</h2>
        <p className="text-center text-sm text-gray-600">
          A 6-digit code has been sent to <strong>{email}</strong>.
        </p>

        {successMsg && <p className="text-green-600 text-center">{successMsg}</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register('otp', {
              required: 'OTP is required',
              pattern: {
                value: /^\d{6}$/,
                message: 'OTP must be a 6-digit number',
              },
            })}
            maxLength={6}
            inputMode="numeric"
            placeholder="Enter 6-digit code"
            className="w-full px-4 py-2 border rounded-md text-black"
          />
          {errors.otp && (
            <p className="text-sm text-red-600">{errors.otp.message}</p>
          )}

          {/* Countdown Timer */}
          <div className="flex justify-center">
            <CountdownCircleTimer
              key={timerKey}
              isPlaying
              duration={300}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[7, 5, 2, 0]}
              size={100}
              strokeWidth={8}
              onComplete={() => {
                setResendAllowed(true);
                return { shouldRepeat: false };
              }}
            >
              {({ remainingTime }) => {
                const minutes = Math.floor(remainingTime / 60);
                const seconds = String(remainingTime % 60).padStart(2, '0');
                return (
                  <div className="text-md font-bold text-black">
                    {minutes}:{seconds}
                  </div>
                );
              }}
            </CountdownCircleTimer>
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={isSubmitting ? true : false}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isSubmitting ? 'Verifying...' : 'Verify'}
          </button>

          {/* Resend Button */}
          {resendAllowed && (
            <button
              type="button"
              onClick={handleResend}
              className="w-full bg-gray-200 text-white py-2 rounded-md hover:bg-gray-300"
            >
              Resend Code
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
