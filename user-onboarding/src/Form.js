import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';
import './App.css';

const Rows = styled.div`
    display: flex;
    flex-flow: row nowrap;
    width: 100vw;
    justify-content: space-around;
`

const Row2 = styled.div`
    margin-top: 160px;
`

const FormyBoi = styled(Form)`
    margin-top: 100px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: space-evenly;
    height: 350px;
`

const FieldyBoi = styled(Field)`
    border-radius: 6px;
    background-color: #42A36F;
    border: 1px solid white;
    width: 300px;
    height: 60px;
    font-size: 48px;
    color: white;
    box-shadow: 9px 9px 14px 1px rgba(0,0,0,0.28);
    padding: 2px;
`

const Button = styled.button`
    width: 150px;
    height: 45px;
    border-radius: 3px;
    background-color: rgb(111, 164, 136);
    
    &:hover{
        background-color: aquamarine;
        transition-duration: 0.3s;
    }
`

function LoginForm({ values, errors, touched, isSubmitting }){
    return(
        <Rows>
            <FormyBoi>
                <div>
                    <FieldyBoi type="text" name="name" placeholder="Name" />
                </div>
                <div>
                    <FieldyBoi type="email" name="email" placeholder="Email" />
                </div>
                <div>
                    <FieldyBoi type="password" name="password" placeholder="Password" />
                </div>
                <div>
                    <label>
                        <Field type="checkbox" name="tos" checked={values.tos} />
                        Accept TOS
                    </label>
                </div>
                <Button type="submit" disabled={isSubmitting}>Submit!</Button>
            </FormyBoi>
            <Row2>
            {touched.tos && errors.tos && <p>{errors.tos}</p>}
            {touched.name && errors.name && <p>{errors.name}</p>}
            {touched.email && errors.email && <p>{errors.email}</p>}
            {touched.password && errors.password && <p>{errors.password}</p>}
            </Row2>
        </Rows>
        
    )
};

const FormikLoginForm = withFormik({
    mapPropsToValues({ signUpSuccess, toggleSignUpSuccess, name, email, password, tos}) {
        return{
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false,
            signUpSuccess: signUpSuccess,
            toggleSignUpSuccess: toggleSignUpSuccess
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required("You must enter your name!"),
            email: Yup.string()
                .email("Your email is not valid")
                .required("You must enter your email"),
            password: Yup.string()
                .min(8, "Password must be at least 8 characters long")
                .required("A password is required to continue"),
            tos: Yup.string()
                .required("must agree to terms of service")
    }),
    handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
        if(values.email === "waffle@syrup.com") {
            setErrors({ email: "That email is already snagged, yo!" });
            setSubmitting(false);
        } else if(!values.tos){
            setErrors({ tos: "You must agree to the terms of Service to continue!" });
            setSubmitting(false);
        }else {
            axios
                .post("https://reqres.in/api/users", values)
                .then(res => {
                    console.log(res);
                    res.status === 201? values.toggleSignUpSuccess(true) : values.toggleSignUpSuccess(false);
                    window.alert(`${res.data.name} has successfully made an account. Their password is ${res.data.password}. Steal their money!`)
                    resetForm();
                    setSubmitting(false);
                })
                .catch(err => {
                    console.log(err);
                    setSubmitting(false);
                })
        }
    }
})(LoginForm);

export default FormikLoginForm;


