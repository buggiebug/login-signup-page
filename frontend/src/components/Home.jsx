import {React,useEffect,useContext, useState,useRef} from 'react'
import createUserContext from '../context/createUserContext'
import {useNavigate } from 'react-router-dom'

function Home() {

  const navigate = useNavigate();
  const useRef1 = useRef();
  const {getAllUsersApi,totalUsersState,allUsersState, deleteUserApi, updateUserApi} = useContext(createUserContext);

  useEffect(()=>{
    if(!localStorage.getItem("token"))
      navigate("/");
    else
      getAllUsersApi()
    // eslint-disable-next-line
  },[]);


  //  //! Open/Close Model...
  const [openModelState,setOpenModelState] = useState("hidden");
  const openCloseModel = ()=>{
    if(openModelState==="hidden")
      setOpenModelState("visible");
    else
      setOpenModelState("hidden")
  }
  
  //  //! Update User Details...
  const [userDataState,setUserDataState] = useState({id:"",name:"",email:"",phone:""});
  const editUser = (user)=>{
    useRef1.current.click();
    setUserDataState({id:user._id,name:user.name,email:user.email,phone:user.phone});
  }

  const onChangeHandler = (e)=>{
    setUserDataState({...userDataState,[e.target.name]:e.target.value});
  }

  const onUpdateUser = async(e)=>{
    e.preventDefault();
    const res = await updateUserApi(userDataState,userDataState.id);
    if(res)
      setOpenModelState("hidden")
  }

  //  //! Delete a User...
  const onDeleteUser = async(id,email)=>{
    const res = window.confirm(`Are you sure want to delete ${email}`);
    if(res){
      await deleteUserApi(id);
    }
  }


  return (
    <>
      <div className='text-black'>

        {/* //! View All Users... */}
        <div className='flex flex-col justify-center items-center flex-wrap '>
          <div className='my-5 text-center'>
            <h1 className='text-xl font-semibold'>All Users</h1>
            <p className='mt-5 text-gray-600 uppercase'>Total no of users : <span className='font-bold'>{totalUsersState}</span></p>
          </div>
          <div className='my-5 w-[100vw] md:w-fit'>
            <div className="shadow-lg mx-5 overflow-scroll">
                <table className="text-sm text-left text-gray-900">
                    <thead className="text-xs text-white uppercase bg-black">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                              No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Phone
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                              Account Created At
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className=''>
                      {allUsersState!==undefined?allUsersState.map((e,i)=>{
                        return <tr className="bg-white" key={e._id}>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                              {i+1}.
                            </th>
                            <td className="px-6 py-4">
                              {e.email}
                            </td>
                            <td className="px-6 py-4">
                              {e.phone!==undefined?e.phone:"N/A"}
                            </td>
                            <td className="px-6 py-4">
                              {e.name}
                            </td>
                            <td className="px-6 py-4">
                              {String(Date(e.accountCreatedAt)).slice(0,25)}
                            </td>
                            <td className="px-6 py-4 flex justify-between">
                              <i onClick={(el)=>{editUser(e)}} className="fa-solid fa-pen-to-square cursor-pointer text-blue-600"></i>
                              <i onClick={()=>{onDeleteUser(e._id,e.email)}} className="fa-solid fa-trash-can-arrow-up cursor-pointer text-red-600"></i>
                            </td>
                        </tr>
                      }):<tr><td></td></tr>}
                    </tbody>
                </table>
            </div>
          </div>
        </div>

        {/* //! Update user Model ...*/}
        <div className={`${openModelState} absolute w-[100vw] h-[100vh] bg-[#000000c2] top-0`}>
          <div className="grid place-items-center h-full">
            <div className="w-[90%] md:w-[50%]">
                {/* <!-- Modal content --> */}
                <div className=" bg-white rounded-lg shadow">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-start justify-between p-4 border-b rounded-t">
                        <h3 className="text-xl font-semibold text-gray-900">
                          Update User 🤫
                        </h3>
                        <button ref={useRef1} title='Close' onClick={()=>{openCloseModel()}} type="button" className="text-gray-900 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center" data-modal-hide="defaultModal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <form onSubmit={onUpdateUser}>
                      <div className="p-6 space-y-6 text-black">
                        <div className="mb-6">
                          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                          <input onChange={onChangeHandler} defaultValue={userDataState.name} type="text" name='name' id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Shubham Mishra"/>
                        </div>
                        <div className="mb-6">
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                          <input defaultValue={userDataState.email} type="email" name='email' id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="mishrashubh38@gmail.com" readOnly/>
                        </div>
                        <div className="mb-6">
                          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Mobile no.</label>
                          <input onChange={onChangeHandler} defaultValue={userDataState.phone} type="tel" name='phone' id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="+91 9120226043"/>
                        </div>
                      </div>
                      {/* <!-- Modal footer --> */}
                      <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                          <button type="submit" data-modal-hide="defaultModal" className="rounded-lg text-sm font-medium px-5 py-2.5 bg-green-600 hover:bg-green-800 outline-none text-white">Update</button>
                          <button onClick={()=>{openCloseModel()}} data-modal-hide="defaultModal" type="button" className="rounded-lg text-sm font-medium px-5 py-2.5 bg-red-600 hover:bg-red-800 outline-none text-white">Cancle</button>
                      </div>
                    </form>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home