import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const RegistrationPage = () => {
   const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: ''
   });
   const [error, setError] = useState('');
   const navigate = useNavigate(); // Import useNavigate from 'react-router-dom'

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.post('http://localhost:5000/register', formData);
         const { data } = response;
         if (data.token) {
            // Registration successful, show SweetAlert
            Swal.fire({
               title: 'Registration Successful!',
               text: 'You have successfully registered.',
               icon: 'success',
               confirmButtonText: 'OK'
            }).then(() => {
               // Navigate to login page after SweetAlert is closed
               navigate('/');
            });
         } else {
            setError(data.error || 'Registration failed');
         }
      } catch (error) {
         setError('Registration failed');
      }
   };

   return (
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
         <div className="max-w-md mx-auto">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an Account</h2>
            <div className="mt-8 bg-gray-100 py-8 px-4 shadow rounded-lg sm:px-10">
               <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                     <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                     </label>
                     <div className="mt-1">
                        <input
                           id="username"
                           name="username"
                           type="text"
                           autoComplete="username"
                           placeholder='Enter your Username...'
                           required
                           value={formData.username}
                           onChange={handleChange}
                           className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                     </div>
                  </div>
                  <div>
                     <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                     </label>
                     <div className="mt-1">
                        <input
                           id="email"
                           name="email"
                           type="email"
                           autoComplete="email"
                           placeholder='Enter your Mail...'
                           required
                           value={formData.email}
                           onChange={handleChange}
                           className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                     </div>
                  </div>
                  <div>
                     <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                     </label>
                     <div className="mt-1">
                        <input
                           id="password"
                           name="password"
                           type="password"
                           autoComplete="current-password"
                           placeholder='Enter your Password...'
                           required
                           value={formData.password}
                           onChange={handleChange}
                           className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                     </div>
                  </div>
                  <div>
                     <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                     >
                        Create Account
                     </button>
                  </div>
               </form>
               {error && <p className="text-red-500 text-center">{error}</p>}
            </div>
            <p className="text-center text-gray-600 my-4">Already registered? <Link to="/" className="text-indigo-600 hover:underline">Login here</Link>.</p>
         </div>
      </div>
   );
};

export default RegistrationPage;
