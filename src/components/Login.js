import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
   const [formData, setFormData] = useState({
      email: '',
      password: ''
   });

   const [error, setError] = useState('');
   const navigate = useNavigate();

   useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
         navigate('/main');
      }
   }, [navigate]);

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.post('http://localhost:5000/login', formData);
         const { data } = response;
         if (data.token) {
            localStorage.setItem('token', data.token);
            navigate('/main');
         } else {
            setError(data.error || 'Login failed');
         }
      } catch (error) {
         setError('Login failed');
      }
   };


   return (
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
         <div className="max-w-md mx-auto">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign In Your Account</h2>
            <div className="mt-8 bg-gray-100 py-8 px-4 shadow rounded-lg sm:px-10">
               <form className="space-y-6" onSubmit={handleSubmit}>
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
                           placeholder='Enter your mail...'
                           value={formData.email}
                           onChange={handleChange}
                           required
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
                           placeholder='Enter your password...'
                           value={formData.password}
                           onChange={handleChange}
                           required
                           className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                     </div>
                  </div>
                  <div>
                     <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                     >
                        Log In
                     </button>
                  </div>
               </form>
               {error && <p className="text-red-500 text-center pt-1">{error}</p>}
            </div>
            <p className="text-center text-gray-600 my-4">Don't have an Account <Link to="/register" className="text-indigo-600 hover:underline">Register here</Link>.</p>
         </div>
      </div>
   );
};

export default Login;
