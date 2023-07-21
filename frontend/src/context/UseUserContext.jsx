import { React, useState } from "react";
import CreateUserContext from "./createUserContext";
import { toast } from "react-toastify";

function UseUserContext(props) {
  const baseUrl = "http://127.0.0.1:8000";

  const [totalUsersState, setTotalUsersState] = useState(0);
  const [allUsersState, setAllUsersState] = useState([]);

  //  //! Signup...
  const signupApi = async (signupData) => {
    const fetchData = await fetch(`${baseUrl}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupData),
    });
    const res = await fetchData.json();
    if (res.success === true) {
      toast.success(res.message);
      localStorage.setItem("token",res.token);
      return true;
    } else {
      toast.warn(res.message);
      return false;
    }
  };

  //  //! Login...
  const loginApi = async (loginData) => {
    const fetchData = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });
    const res = await fetchData.json();
    if (res.success === true) {
      toast.success(res.message);
      localStorage.setItem("token",res.token);
      return true;
    } else {
      toast.warn(res.message);
      return false;
    }
  };

  //  //! Get All Users...
  const getAllUsersApi = async () => {
    const fetchData = await fetch(`${baseUrl}/all_users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const res = await fetchData.json();
    console.log(res);
    if (res.success === true) {
      setTotalUsersState(res.totalUsers);
      setAllUsersState(res.allUsers);
      return true;
    } else {
      toast.warn(res.message);
    }
  };

  return (
    <CreateUserContext.Provider
      value={{
        signupApi,
        loginApi,
        getAllUsersApi,
        totalUsersState,
        allUsersState,
      }}
    >
      {props.children}
    </CreateUserContext.Provider>
  );
}

export default UseUserContext;
