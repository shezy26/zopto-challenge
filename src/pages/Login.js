import {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux'

 import { loginUser } from '../reducers/userReducer'
import { useNavigate } from "react-router-dom";
function Login() {

     const {login} = useSelector((state) => state.userReducer)
     const navigate = useNavigate();

     const dispatch = useDispatch()

    const  [users,setUsers] = useState([])
    const  [loginUserIndex,setLoginUserIndex] = useState('')

    useEffect(()=>{
        //If login restrict user to access login page
             if(login){
                 alert("You are already logged in.")
                 navigate("/leads");
             }
        //login restrict code ends here

        //User list is fetched here
        fetch('/users.json'
            ,{
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Headers' : '*'
                }
            }
        )
            .then(function(response){
               // console.log(response)
                return response.json();
            })
            .then(function(myJson) {
               // console.log(myJson);
                setUsers(myJson)
            });
        //User list fetching ends here
    },[login,navigate])


    //Login Button Press handled
    const handleLogin =  (e) => {
        e.preventDefault();
            var LoginUser = {user:users[loginUserIndex],user_id:loginUserIndex}
            dispatch(loginUser(LoginUser))
            alert("Log in successful")
            navigate('/leads')
    }
    //Login Button Press handled end
  return (
     <>
         <div className="container">
             <div className="row">
                 <div className="col">

                 </div>
                 <div className="col">
                     <h3>Login Page</h3>
                     <form onSubmit={handleLogin}>
                         <div className="mb-3">
                             <select onChange={(e)=> setLoginUserIndex(e.target.value)} className="form-select form-select-lg" aria-label="Default select example">
                                 <option value="">Select User</option>
                                 {
                                     Object.entries(users).map(([key, value]) => (
                                         <option key={key} value={key}>{value.name}</option>
                                         ))
                                 }
                             </select>
                         </div>
                         <button type="submit" className="btn btn-primary"
                                 >Login</button>
                     </form>
                 </div>
                 <div className="col">

                 </div>
             </div>
         </div>
     </>
  );
}

export default Login;
