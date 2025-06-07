import React from "react";
import {useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
    console.log(data);
  };
    return(
      
        <div>
          <div class="my-page-wrapper">
            <div class="Login1">
    <h2>Register</h2>
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div class="input-group">
        <i class="bx bx-user"></i>
        <input type="text" name="username" placeholder="Enter your username" />
      </div>
      <div class="input-group">
        <i class="bx bx-envelope"></i>
        <input type="email" name="email" placeholder="Enter your email" 
        className={`form-control ${errors.email? "is-inavlid" : ""}`}
        {...register("email",{
          required: "Email is required",
          pattern: {
            value: /\s+@\s+\.\s+/,
            message:"Inavlid Email",
          }
        })} 
        />
        <div className="invalid-feedback">{errors.email?.message}</div>
      </div>
      <div class="input-group">
        <i class="bx bx-lock"></i>
        <input type="password" name="password" placeholder="Enter your password" 
        className={`form-control ${errors.password ? "is-inavlid" : ""}`}
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