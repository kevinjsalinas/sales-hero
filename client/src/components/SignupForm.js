import React, { useContext } from "react";
import { Button, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form"

import { UserContext } from '../context/user';

function SignupForm() {

    const { setUser } = useContext(UserContext);

    const { register, handleSubmit, reset, formState: {errors} } = useForm()

    const submitForm = (data) => {

        if (data.password === data.confirmPassword) {

            fetch('/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: data.username,
                    password: data.password
                }),
            })
            .then((r) => {
                if (r.ok) {
                    r.json().then(setUser)
                } else {
                    r.json().then((err) => setUser(err))
                }
            })
          
            reset()
        }

        else {

            alert("Passwords do not match")
            reset()
        }

    }


    return (
        <>
            <Form className="">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Create Username</Form.Label>
                    <Form.Control 
                        type="username" 
                        placeholder=""
                        {...register("username", {required: true})} 
                    />
                    {errors.username && <span style={{color:"red"}}>Username is required</span>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Create Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder=""
                        {...register("password", {required:true})} 
                    />
                    {errors.password && <span style={{color:"red"}}>Password is required</span>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder=""
                        {...register("confirmPassword", {required:true})} 
                    />
                    {errors.confirmPassword && <span style={{color:"red"}}>Comfirm Password is required</span>}
                </Form.Group>
                <Button
                    onClick={handleSubmit(submitForm)} 
                    className="mb-3" 
                    variant="primary" 
                    type="submit">
                    Signup
                </Button>
            </Form>
        </>
    )
}


export default SignupForm;