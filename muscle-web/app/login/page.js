'use client'
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '@/database/firebase';
import { toast } from 'react-toastify';

// Validation function
function validateLoginForm(email, password) {
  const errors = {};

  // Email validation
  if (!email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email address is invalid";
  }

  // Password validation
  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}/.test(password)) {
    errors.password = "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character";
  }

  return errors;
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
  };

  // const handleSubmit1 = (e) => {
  //   e.preventDefault();
  //   const validationErrors = validateLoginForm(email, password);
  //   setErrors(validationErrors);
  //   if (Object.keys(validationErrors).length === 0) {
  //     // Proceed with login logic
  //     console.log('Form submitted successfully');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/";
      toast.success("User logged in Successfully", {
        position: "top-center"
      });
    } catch (error) {
      console.log(error.message);
      toast.error("Incorrect email or password. Please try again", {
        position: "bottom-center"
      });

    }
  };


  return (
    <div className="mx-auto max-w-screen-xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold bg-gradient-to-r from-orange-300 via-red-700 to-red-900 text-transparent bg-clip-text sm:text-3xl">
          Get started
        </h1>

        <p className="mx-auto mt-6 max-w-md text-center text-white">
          Login to start building Musules
        </p>

        <form
          onSubmit={handleSubmit}
          className="mb-0 mt-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 "
        >
          <p className="text-center text-2xl font-bold bg-white text-transparent bg-clip-text sm:text-3xl ">
            Sign in to your account
          </p>

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="w-full rounded-lg border-white p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-gradient-to-r from-red-900 via-red-700 to-orange-600 px-5 py-3 text-sm font-medium text-white"
          >
            Sign in
          </button>

          <p className="text-center text-sm text-gray-500">
            No account?
            <a className="underline" href="/register">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;