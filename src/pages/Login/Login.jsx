import { Link, useLocation, useNavigate } from 'react-router-dom'

import loginImg from '../../assets/login.png'

import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'
import SocialLogin from './SocialLogin'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location?.state || '/'
 
  const { signIn} = useAuth()


  // Email Password Signin
  const handleSignIn = async e => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const pass = form.password.value
   
    try {
      //User Login
      await signIn(email, pass)
      toast.success('Signin Successful')
      navigate(from, { replace: true })
    } catch (err) {
     
      toast.error(err?.message)
    }
  }
 
  return (
    <div className='flex justify-center items-center px-3 md:pt-24 pb-5'>
      <div className='flex w-full max-w-sm mx-auto overflow-hidden bg-gray-50 rounded-lg shadow-lg  lg:max-w-4xl '>
      <div className='hidden md:flex md:w-1/2 items-center justify-center'>
        <img src={loginImg} alt="" />
</div>

        <div className='w-full px-6  py-6 md:px-8 md:w-1/2'>
          <div className='flex justify-center mx-auto'>
            
          </div>

          <p className='mt-3 text-xl text-center text-gray-600 '>
            Welcome back!
          </p>

          <SocialLogin/>

          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b  lg:w-1/4'></span>

            <div className='text-xs text-center text-red-500 uppercase  hover:underline'>
              or login with email
            </div>

            <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>
          </div>
          <form onSubmit={handleSignIn}>
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
                className="btn  font-extrabold hover:bg-[#D39D55] bg-[#8D0B41] text-white  hover:scale-105 transition-transform w-full"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b  md:w-1/4'></span>

            <Link
              to='/signup'
              className='text-xs text-red-500 uppercase  hover:underline'
            >
              or sign up
            </Link>

            <span className='w-1/5 border-b  md:w-1/4'></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
