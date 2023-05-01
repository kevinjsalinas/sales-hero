import React, {useState} from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function Login() {

    const [showLogin, setShowLogin] = useState(true)

    return (
        <>
            <h1>Login/Signup Page</h1>
            <h3>Sales Hero</h3>
            { showLogin ? (
                <>
                    <LoginForm />
                    <p>
                        <Form.Text className="text-muted">
                            Don't have an account?
                        </Form.Text> 
                        <Button 
                            onClick={()=> setShowLogin(false)} 
                            className="ms-2" 
                            size='sm' 
                            variant="outline-primary" 
                            type="submit">
                            Signup
                        </Button>
                    </p>
                </>
            ) : (
                <>
                    <SignupForm />
                    <p>
                        <Form.Text className="text-muted">
                            Already have an account?
                        </Form.Text> 
                        <Button onClick={()=> setShowLogin(true)}className="ms-2" size='sm' variant="outline-primary" type="submit">
                            Login
                        </Button>
                    </p>
                </>

            ) }
        </>
    )
}


export default Login;