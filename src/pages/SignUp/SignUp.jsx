import { Link, useNavigate } from 'react-router-dom'

import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'

import signupImg from '../../assets/Sign up-rafiki.png'
import SocialLogin from '../Login/SocialLogin'
import useAxiosPublic from '../../hooks/useAxiosPublic'

const SignUp = () => {
  const navigate = useNavigate()
  const {  createUser, updateUserProfile, setUser } =useAuth()
   const axiosPublic=useAxiosPublic() 

  const handleSignUp = async e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const photo = form.photo.value;
    const pass = form.password.value;

    // Password validation
   
    if (!/[A-Z]/.test(pass)) {
      toast.error('Password must contain at least one uppercase letter');
      return;
    }
    if (!/[a-z]/.test(pass)) {
      toast.error('Password must contain at least one lowercase letter');
      return;
    }
    if (!pass.length >= 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      // User SignUp
      const result = await createUser(email, pass);

      // Update user profile
      await updateUserProfile(name, photo);
      setUser({ ...result.user, photoURL: photo, displayName: name });

      // Post user data to the database
      const newUser = { email, name, photo, role: 'User' };
       await axiosPublic.post('/users', newUser);
      toast.success('Signup Successful');
      navigate('/');
    } catch (err) {
      toast.error(err?.message );
    }
  };


  return (
    <div className='flex justify-center items-center px-3 md:pt-24  pb-5'>
      <div className='flex w-full max-w-sm mx-auto overflow-hidden bg-gray-50 rounded-lg shadow-lg  lg:max-w-4xl '>
        <div className='w-full px-6 py-8 md:px-8 md:w-1/2'>
              <div className='flex justify-center mx-auto'>
                    </div>

          <p className='mt-3 text-xl text-center text-gray-600 '>
            Get Your Free Account Now.
          </p>

          <SocialLogin/>

          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b  lg:w-1/4'></span>

            <div className='text-xs text-center text-red-500 uppercase  '>
              or SignUp with email
            </div>

            <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>
          </div>
          <form onSubmit={handleSignUp}>
            <div className='mt-4'>
              <label
                className='block mb-2 text-sm font-medium text-gray-600 '
                htmlFor='name'
              >
                Username
              </label>
              <input
                id='name'
                autoComplete='name'
                name='name'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type='text'
              />
            </div>
            <div className='mt-4'>
              <label
                className='block mb-2 text-sm font-medium text-gray-600 '
                htmlFor='photo'
              >
                Photo URL
              </label>
              <input
                id='photo'
                autoComplete='photo'
                name='photo'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type='text'
              />
            </div>
            <div className='mt-4'>
              <label
                className='block mb-2 text-sm font-medium text-gray-600 '
                htmlFor='LoggingEmailAddress'
              >
                Email Address
              </label>
              <input
                id='LoggingEmailAddress'
                autoComplete='email'
                name='email'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type='email'
              />
            </div>

            <div className='mt-4'>
              <div className='flex justify-between'>
                <label
                  className='block mb-2 text-sm font-medium text-gray-600 '
                  htmlFor='loggingPassword'
                >
                  Password
                </label>
              </div>

              <input
                id='loggingPassword'
                autoComplete='current-password'
                name='password'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type='password'
              />
            </div>
            <div className='mt-6'>
              <button
                type='submit'
               className="btn font-extrabold hover:bg-[#D39D55] bg-[#8D0B41] text-white   hover:scale-105 transition-transform w-full">
                Sign Up
              </button>
            </div>
          </form>

          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b  md:w-1/4'></span>

            <Link
              to='/login'
              className='text-xs text-red-500 uppercase  hover:underline'
            >
              or sign in
            </Link>

            <span className='w-1/5 border-b  md:w-1/4'></span>
          </div>
        </div>
        <div className='hidden md:flex items-center justify-center md:w-1/2'>
          <img src={signupImg} alt="" />
</div>
        
      </div>
    </div>
  )
}

export default SignUp
