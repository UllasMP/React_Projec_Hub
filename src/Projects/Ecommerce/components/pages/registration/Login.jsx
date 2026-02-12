import { Link, useNavigate } from 'react-router-dom';
import myContext from "@/Projects/Ecommerce/context/data/myContext";

import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../../firebase/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Loader from '../../loader/Loader';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const navigate = useNavigate();

  const signin = async () => {
    if (!email || !password) {
      toast.warn("Please fill all fields ⚠️");
      return;
    }

    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      // Save user
      localStorage.setItem('user', JSON.stringify(result));

      // Success toast
      toast.success('Signin Successful 🎉', {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });

      setLoading(false);

      // Redirect after toast
      setTimeout(() => {
        navigate('/Ecommerce');
      }, 2000);

    } catch (error) {
      console.error(error);

      toast.error('Signin Failed ❌', {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });

      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      {loading && <Loader />}

      <div className='bg-gray-800 px-10 py-10 rounded-xl'>
        <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white outline-none'
          placeholder='Email'
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white outline-none'
          placeholder='Password'
        />

        <button
          onClick={signin}
          className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg'
        >
          Login
        </button>

        <h2 className='text-white mt-3'>
          Don't have an account?{" "}
          <Link className='text-yellow-500 font-bold' to='/Ecommerce/signup'>
            Signup
          </Link>
        </h2>
      </div>
    </div>
  );
}

export default Login;
