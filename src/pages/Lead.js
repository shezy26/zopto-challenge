import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import { updateStatus,updateCurrentEmailIndex ,updateEmailArrayLength} from '../reducers/emailReducer'
import { logoutUser } from '../reducers/userReducer'
import {useNavigate} from "react-router-dom";
function Lead() {

    const {user_id,login} = useSelector((state) => state.userReducer)
    const {currentEmailIndex,emailArrayLength} = useSelector((state) => state.emailReducer)
    //120000 milliseconds = 120 seconds
    const timeToTimeout = 120000;
    const dispatch = useDispatch()
    const  [emails,setEmails] = useState([])

    const navigate = useNavigate();

    useEffect(()=>{

        //Not login users are stopped here
        if(!login){
            navigate('/')
        }
        //Not login users are stopped here ends

        //All Leads are fetched here
        fetch('/leads.json'
            ,{
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Headers' : '*'
                }
            }
        )
            .then(function(response){
             //   console.log(response)
                return response.json();
            })
            .then(function(myJson) {
              //  console.log(myJson);
                setEmails(myJson)
                dispatch(updateEmailArrayLength(myJson.length))
            });
        //Leads fetching ends here
    },[dispatch,navigate])


    //Emails changing feature after 120 sec starts here
    var timer;
    useEffect(() => {
        timer = setTimeout(updateTheIndex, timeToTimeout)
        return () => clearTimeout(timer)
    }, [])
    function updateTheIndex(){
        if(currentEmailIndex == emailArrayLength - 1){
                alert("This was the last email for now. Page will refresh.")
                navigate('/overview')
            }
        alert("Session Expired. Page will be refreshed because the session is expired.")
        dispatch(updateCurrentEmailIndex())
        updateEmailsStatus({user_id,email_id:currentEmailIndex,status:'pending'})
        timer = setTimeout(updateTheIndex, timeToTimeout)
    }
    //email changing ends here

    //Logout functionality start
    function logOutUserComponent() {
        dispatch(logoutUser())
        navigate('/')
    }
    //Logout functionality ends
    //email status update start here
    function updateEmailsStatus(data) {

        if(currentEmailIndex == emailArrayLength - 1){
         navigate('/overview')
        }
        dispatch(updateStatus(data))
    }
    //email status update end here
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <button className="btn btn-primary" onClick={() => navigate('/overview') } >Overview</button>
                    </div>
                    <div className="col">
                        <h3>Overview Page</h3>
                    </div>
                    <div className="col">
                        <button className="btn btn-primary" type='button' onClick={ () => logOutUserComponent()}>Exit</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button className="btn btn-primary" type='button' onClick={ () => updateEmailsStatus({user_id,email_id:currentEmailIndex,status:'Positive Reply'})}>Positive Reply</button>
                    </div>
                    <div className="col">
                        <button className="btn btn-primary"   type='button' onClick={()=>updateEmailsStatus({user_id,email_id:currentEmailIndex,status:'Neutral Reply'})}>Neutral Reply</button>
                    </div>
                    <div className="col">
                        <button className="btn btn-primary" type='button' onClick={()=>updateEmailsStatus({user_id,email_id:currentEmailIndex,status:'Not A Lead'})}>Not A Lead</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col">

                    </div>
                    <div className="col">
                        <h4>Subject</h4>
                        <p>{emails.length > 0 && emails[currentEmailIndex].subject}</p>
                        <h4>Body</h4>
                        <p>{emails.length > 0 && emails[currentEmailIndex].body}</p>
                    </div>
                    <div className="col">

                    </div>
                </div>
            </div>

        </>
    );
}

export default Lead;
