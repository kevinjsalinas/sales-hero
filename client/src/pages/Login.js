import React, {useState} from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function Login() {

    const [showLogin, setShowLogin] = useState(true)

    return (
        <div className="bodyloginsignup">
            {/* <h1>Login/Signup Page</h1> */}
            {/* <h3 >Sales Hero</h3> */}
            { showLogin ? (
                <>
                    <LoginForm />
                    <p className="textcenter">
                        <Form.Text className="text-muted">
                            Don't have an account?
                        </Form.Text> 
                        <Button 
                            onClick={()=> setShowLogin(false)} 
                            className="ms-2" 
                            size='sm' 
                            variant="outline-dark" 
                            type="submit">
                            Signup
                        </Button>
                    </p>
                </>
            ) : (
                <>
                    <SignupForm />
                    <p className="textcenter">
                        <Form.Text className="text-muted">
                            Already have an account?
                        </Form.Text> 
                        <Button onClick={()=> setShowLogin(true)}className="ms-2" size='sm' variant="outline-dark" type="submit">
                            Login
                        </Button>
                    </p>
                </>

            ) }
        </div>
    )
}


export default Login;