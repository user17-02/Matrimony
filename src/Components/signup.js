import React from "react";
import {useForm} from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
function Signup() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  }
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } =useForm();
  const password = watch("password");

  const onSubmit = async (data) =>{

    
   const userData = {
      username : data.username,
      email:data.email,
      password:data.password
    }
    try{
      const response= await axios.post('http://localhost:5000/api/user/register',userData)
       alert("Registration successful!");
  reset(); // clear the form
  navigate("/login");
    }
    catch (error){
      alert(error.response?.data?.message || 'Registration failed ');
      console.error(error);
    }
  };

    return(
      
        <div>
          <div class="my-page-wrapper">
            <div class="Login1">
    <h2>Register</h2>
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div class="input-group">
        <i class="bx bx-user"></i>
        <input type="text" name="username" placeholder="Enter your username" 
         className={`form-control ${errors.username ? "is-invalid" : ""}`}
        {...register("username", {
          required: "username is required",
          pattern: {
            value: /^[a-zA-Z0-9._]{3,20}$/,
            message: "name must be 3–20 characters. Letters, numbers only.",
          },
        })} 
        />
        <div className="invalid-feedback">{errors.username?.message}</div>
      </div>
      <div class="input-group">
        <i class="bx bx-envelope"></i>
        <input type="email" name="email" placeholder="Enter your email" 
        className={`form-control ${errors.email ? "is-invalid" : ""}`}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Invalid Email",
          },
        })} 
        />
        <div className="invalid-feedback">{errors.email?.message}</div>
      </div>
      <div class="input-group">
        <i class="bx bx-lock"></i>
        <input type="password" name="password" placeholder="Enter your password" 
        className={`form-control ${errors.password ? "is-invalid" : ""}`}
        {...register("password",{
          required: "password is required",
          minLength: {value: 6, message: "Min 6 characters"},
          maxLength: {value:12, message:"Max 12 characters"}
        })} 
        />
        <div className="invalid-feedback">{errors.password?.message}</div>
      </div>
      <div class="input-group">
        <i class="bx bx-lock"></i>
        <input type="password" name="confirm_password" placeholder="Confirm password" 
        className={`form-control ${errors.confirmpassword ? "is-invalid" : ""}`} 
        {...register("confirmpassword",{
          required: "Confirm password is required",
          validate: (value) =>
          value === password || "password do not match",
        })}
        />
        <div className="invalid-feedback">{errors.confirmpassword?.message}</div>
      </div>
      <div class="extra">
        <button type="submit">Register</button>
      </div>
      <p>Already have an account? <a href="" onClick={handleClick}>Login Now</a></p>
    </form>
  </div>
  </div>
        </div>
        

    )
}
export default Signup;

