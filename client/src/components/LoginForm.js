import React, { useContext } from "react";
import { Button, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form"

import { UserContext } from '../context/user';

function LoginForm() {

    const { setUser } = useContext(UserContext);

    const { register, handleSubmit, reset, formState: {errors} } = useForm()


    const submitLogin = (data) => {

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: data.username, 
                password: data.password
            }) 
        })
        .then((r)=> {
            if (r.ok) {
                r.json().then(setUser)
            } else {
                r.json().then((err)=> setUser(err))
            }
        })

        reset()

    }

    return (
        <>
            <Form className="">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="username" 
                        placeholder=""
                        {...register("username", {required: true})}  
                    />
                    {errors.username && <span style={{color:"red"}}>Username is required</span>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder=""
                        {...register("password", {required:true})}  
                    />
                    {errors.password && <span style={{color:"red"}}>Password is required</span>}
                </Form.Group>
                <Button
                    onClick={handleSubmit(submitLogin)}  
                    className="mb-3" 
                    variant="primary" 
                    type="submit">
                    Login
                </Button>
            </Form>
        </>
    )
}

export default LoginForm;