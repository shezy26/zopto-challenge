import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {updateEmailArrayLength} from "../reducers/emailReducer";
import {resetApplication} from "../reducers/userReducer";
import {useDispatch, useSelector} from "react-redux";

function Overview() {

    const {login,user} = useSelector((state) => state.userReducer)
    const {userCompletedEmails} = useSelector((state) => state.emailReducer)
    const dispatch = useDispatch()
    const  [emails,setEmails] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{

        //Not login users are stopped here
        if(!login){
            navigate('/')
        }
        //Not login users are stopped here ends

        //All leads are fetched here
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
              //  console.log(response)
                return response.json();
            })
            .then(function(myJson) {
               // console.log(myJson);
                setEmails(myJson)
                dispatch(updateEmailArrayLength(myJson.length))
            });
        //All leads are fetched ends here
    })

    //Reset application functionality
    function resetAllState() {
        dispatch(resetApplication())
        window.location.href = '/'
    }
    //Reset application functionality ends here

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <button className="btn btn-primary" type='button' onClick={() => resetAllState()}>Reset Application</button>
                    </div>
                    <div className="col">
                        <h3>Overview Page</h3>
                    </div>
                    <div className="col">
                        <button className="btn btn-primary" onClick={() => navigate(-1) } >Back</button>
                    </div>
                </div>

                {
                    Object.entries(emails).map(([key, value]) => (
                    <div className="row" style={{border:'1px solid gray'}} key={key}>
                        <div className="col">
                            <p>Status: {
                                (userCompletedEmails[key]) ?  userCompletedEmails[key].status : value.status
                            }</p>
                        </div>
                        <div className="col">
                            <h4>Subject</h4>
                            <p>{value.subject}</p>
                            <h4>Body</h4>
                            <p>{value.body}</p>
                        </div>
                        <div className="col">
                            Username: {user.name}
                        </div>

                    </div>

                    ))
                }

            </div>

        </>
    );
}

export default Overview;
