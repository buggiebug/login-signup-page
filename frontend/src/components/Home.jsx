import {React,useEffect,useContext} from 'react'
import createUserContext from '../context/createUserContext'
import { Link,useNavigate } from 'react-router-dom'

function Home() {

  const navigate = useNavigate();
  const {getAllUsersApi,totalUsersState,allUsersState} = useContext(createUserContext);

  useEffect(()=>{
    if(!localStorage.getItem("token"))
      navigate("/");

    getAllUsersApi()
    // eslint-disable-next-line
  },[]);

  return (
    <>
      <div className='flex justify-evenly flex-wrap items-center text-black'>
        <div>
            {allUsersState!==undefined ? allUsersState.map((e)=>{
              return (
                <div className='my-5' key={e._id}>
                  <p>{e.name}</p>
                  <p>{e.email}</p>
                  <p>{e.accountCreatedAt}</p>
                </div>
              )
            }):""}
        </div>
      </div>
    </>
  )
}

export default Home