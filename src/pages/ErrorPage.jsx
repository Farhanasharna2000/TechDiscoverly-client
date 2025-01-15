import { Link, useNavigate } from 'react-router-dom'
import img from '../assets/404 Error-amico.png'
const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <section className='bg-white '>
      <div className='container flex items-center min-h-screen px-6 py-12 mx-auto'>
        <div className='flex flex-col items-center max-w-sm mx-auto text-center'>
         <img src={img} alt="" />
          <h1 className='mt-3 text-2xl font-semibold text-gray-800  md:text-3xl'>
            Something Went Wrong!
          </h1>
       

          <div className='flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto'>
          
            <Link  to={'/'} >
            <button
           
           className="btn  font-extrabold hover:bg-[#D39D55] bg-[#8D0B41] text-white  hover:scale-105 transition-transform w-full"
            >
              Go back
            </button>
            </Link>
            
           
          </div>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage
