'use client'
import React, { useState } from 'react';
import { auth, database } from '../../database/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {setDoc, doc} from "firebase/firestore"
import reg from './test';
import { toast } from 'react-toastify';


// signup validation
function validateSignupForm(firstName, lastName, email, password, confirmPassword) {
  const errors = {};

  if (!firstName) {
    errors.firstName = "First Name is required";
  } 

  if (!lastName) {
    errors.lastName = "Last Name is required";
  }

  if (!email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email address is invalid";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}/.test(password)) {
    errors.password = "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}

function Reg() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [marketingAccept, setMarketingAccept] = useState(false);
  const [errors, setErrors] = useState({});
  const [accountCreated, setAccountCreated] = useState(false);


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const errors = validateSignupForm(firstName, lastName, email, password, passwordConfirmation);
  //   if (Object.keys(errors).length === 0) {
  //     // Form is valid, proceed with submission
  //     console.log('Form submitted successfully');
  //     // Simulate account creation (you can replace this with your actual logic)
  //     setTimeout(() => {
  //       setAccountCreated(true);
  //     }, 1000); // Assuming 1 second delay for demonstration
  //   } else {
    
  //     // Form validation failed, set errors state
  //     setErrors(errors);
  //   }
  // };
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateSignupForm(firstName, lastName, email, password, passwordConfirmation);
    if (Object.keys(errors).length === 0) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        setAccountCreated(true);
        // Corrected the usage of email and password variables
        await setDoc(doc(database, "users", email), {
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password
        });
        toast.success("User registered successfully!", {
          position: "bottom-center"
        });
      } catch (error) {
        toast.error(error.message, {
          position: "bottom-center"
        });
            }
    } else {
      setErrors(errors);
    }
  };
  

  return (
    <section className="bg-white dark:bg-primary">
      {/* comment */}
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="/OIG3.jpeg"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="#">
              <span className="sr-only">Home</span>
              <img
                alt=''
                src='logo1.png'
                width={120} height={90}
              />
            </a>
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to Muscle builder 
            </h2>
            <p className="mt-4 leading-relaxed text-white/90"></p>
          </div>
        </section>
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20 dark:bg-gray-900"
                href="#"
              >
                <span className="sr-only">Home</span>
                <img
                  alt=''
                  src='logo1.png'
                  width={120} height={90}
                />
              </a>
              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
                Welcome to Muscle builder 
              </h1>
              <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
                quibusdam aperiam voluptatum.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-6 gap-10">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="firstName" className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
                <span
    class="absolute start-3 top-3 -translate-y-1/2 text-xs text-black transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs dark:text-black"
  >
    First Name
  </span>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm dark:text-black"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </label>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="lastName" className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
                <span
    class="absolute start-3 top-3 -translate-y-1/2 text-xs text-black transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs dark:text-black"
  >
    Last Name
  </span>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm dark:text-black"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </label>
              </div>
              <div className="col-span-6">
                <label htmlFor="email" className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
                <span
    class="absolute start-3 top-3 -translate-y-1/2 text-xs text-black transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs dark:text-black"
  >
    Email
  </span>                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm dark:text-black"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </label>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="password" className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
                <span
    class="absolute start-3 top-3 -translate-y-1/2 text-xs text-black transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs dark:text-black"
  >
    Password
  </span>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm dark:text-black"
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </label>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="passwordConfirmation" className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
<span
    class="absolute start-3 top-3 -translate-y-1/2 text-xs text-black transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs dark:text-black"
  >
Password Confirmation
  </span>                  <input
                    type="password"
                    id="passwordConfirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm dark:text-black"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </label>
              </div>
              <div className="col-span-6">
                <label htmlFor="marketingAccept" className="flex gap-4">
                  <input
                    type="checkbox"
                    id="marketingAccept"
                    name="marketing_accept"
                    checked={marketingAccept}
                    onChange={(e) => setMarketingAccept(e.target.checked)}
                    className="size-5 rounded-md border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-offset-gray-900"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-200">
                    I want to receive emails about events, product updates and company announcements.
                  </span>
                </label>
              </div>
              <div className="col-span-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  By creating an account, you agree to our
                  <a href="#" className="text-gray-700 underline dark:text-gray-200">
                    terms and conditions
                  </a>
                  and
                  <a href="#" className="text-gray-700 underline dark:text-gray-200"> privacy policy </a>.
                </p>
              </div>
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                {/* Display "Account Created" if accountCreated is true, otherwise display the button */}
                {accountCreated ? (
                  <p className="inline-block shrink-0 rounded-md border bg-green-500 text-white px-12 py-3 text-sm font-medium">
                    Account Created
                  </p>
                ) : (
                  <button
                    type="submit"
                    className="inline-block shrink-0 rounded-md border border-red-900 bg-gradient-to-r from-red-900 via-red-700 to-orange-700 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                  >
                    Create an account
                  </button>
                )}
                <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
                  Already have an account?
                  <a href="/login" className="text-gray-700 underline dark:text-gray-200">Log in</a>.
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}

export default Reg;
//done