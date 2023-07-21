import {React,useState,useContext,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import createUserContext from '../context/createUserContext'
import { toast } from 'react-toastify';

function Login() {

  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem("token"))
      navigate("/home");
    // eslint-disable-next-line
  },[]);

  const {loginApi} = useContext(createUserContext);

  const [loginState,setloginState] = useState({email:"",password:""});
  const onChangeHandler = (e)=>{
    setloginState({...loginState,[e.target.name]:e.target.value});
  }

  const submitLogin = (e)=>{
    e.preventDefault();

    if(!loginState.email || !loginState.password)
    {
      toast.info("All fields are");
      return;
    }
    const res = loginApi(loginState);
    if(res)
      navigate("/home");
  }

  return (
    <>
      <div className='flex flex-col justify-center items-center h-[80vh]'>
        <div className='md:w-[50vw] shadow-xl rounded-md'>
            <div className='my-5'>
              <h1 className='uppercase font-semibold text-xl text-black text-center'>Login</h1>
            </div>
            <form className='md:w-[50vw] my-2 w-full px-20' onSubmit={submitLogin}>
                <div className="">
                    <div className="mb-6">
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email address</label>
                      <input onChange={onChangeHandler} type="email" name='email' id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="john.doe@company.com"/>
                    </div> 
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                    <input onChange={onChangeHandler} type="password" name='password' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="•••••••••"/>
                    </div> 
                </div>
                <div className="flex flex-col justify-center items-center mb-6">
                    <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Login</button>
                </div>
                <div className="flex flex-col justify-center items-end mb-6">
                    <Link to={"/signup"} className="text-blue-800 underline">Signup</Link>
                </div>
            </form>
          </div>
      </div>
    </>
  )
}

export default Login