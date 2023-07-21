import {React,useState,useContext,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import createUserContext from '../context/createUserContext'
import { toast } from 'react-toastify';

function Signup() {

  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem("token"))
      navigate("/home");
    // eslint-disable-next-line
  },[]);

  const {signupApi} = useContext(createUserContext);

  const [signupState,setSignupState] = useState({name:"",email:"",password:"",confirmPassword:""});
  const onChangeHandler = (e)=>{
    setSignupState({...signupState,[e.target.name]:e.target.value});
  }

  const submitSignup = async (e)=>{
    e.preventDefault();

    if(!signupState.name || !signupState.email || !signupState.password || !signupState.confirmPassword)
    {
      toast.info("All fields are");
      return;
    }
    const res = await signupApi(signupState);
    if(res)
      navigate("/home");
  }


  return (
    <>
      <div className='flex flex-col justify-center items-center h-[80vh]'>
        <div className='md:w-[50vw] shadow-xl rounded-md'>
          <div className='my-5 text-center'>
            <h1 className='uppercase font-semibold text-xl text-black'>Signup</h1>
          </div>
          <form className='my-2 w-full px-20' onSubmit={submitSignup}>
              <div className="">
                  <div className="mb-6">
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                      <input onChange={onChangeHandler} type="text" name='name' id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Shubham Mishra"/>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email address</label>
                    <input onChange={onChangeHandler} type="email" name='email' id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="mishrashubh38@gmail.com"/>
                    <label htmlFor="email" className="ml-2 mb-6 text-xs font-light text-gray-500">We will never share your email.</label>
                  </div> 
                  <div className="mb-6">
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                      <input onChange={onChangeHandler} type="password" name='password' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="•••••••••"/>
                  </div> 
                  <div className="mb-6">
                      <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                      <input onChange={onChangeHandler} type="password" name='confirmPassword' id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="•••••••••"/>
                  </div> 
              </div>
              <div className="flex flex-col justify-center items-center mb-6">
                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Signup</button>
              </div>
              <div className="flex flex-col justify-center items-end mb-6">
                  <Link to={"/"} className="text-blue-800 underline">Login</Link>
              </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup