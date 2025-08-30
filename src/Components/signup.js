import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      // Trim inputs to avoid extra spaces
      const payload = {
        username: data.username.trim(),
        email: data.email.trim().toLowerCase(),
        password: data.password,
        gender: data.gender
      };

      const response = await axios.post("http://localhost:5000/api/user/register", payload);

      // Backend should return { token, user }
      const { token, user } = response.data;

      // ✅ Save JWT and user
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user._id);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Registration successful!");
      reset();

      // ✅ Redirect to EditProfile after signup
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      console.error("Signup error:", error);
    }
  };

  const handleLoginRedirect = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
    <div className="my-page-wrapper">
      <div className="Login1">
        <h2>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          
          <div className="input-group">
            <i className="bx bx-user"></i>
            <input
              type="text"
              placeholder="Enter your username"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              {...register("username", {
                required: "Username is required",
                pattern: { value: /^[a-zA-Z0-9._]{3,20}$/, message: "3–20 chars, letters/numbers only" },
              })}
            />
            <div className="invalid-feedback">{errors.username?.message}</div>
          </div>

          <div className="input-group">
            <i className="bx bx-envelope"></i>
            <input
              type="email"
              placeholder="Enter your email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email", {
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
              })}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>

          <div className="input-group">
            <i className="bx bx-lock"></i>
            <input
              type="password"
              placeholder="Enter your password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 chars" },
                maxLength: { value: 12, message: "Max 12 chars" },
              })}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>

          <div className="input-group">
            <i className="bx bx-lock"></i>
            <input
              type="password"
              placeholder="Confirm password"
              className={`form-control ${errors.confirmpassword ? "is-invalid" : ""}`}
              {...register("confirmpassword", {
                required: "Confirm password is required",
                validate: (value) => value === password || "Passwords do not match",
              })}
            />
            <div className="invalid-feedback">{errors.confirmpassword?.message}</div>
          </div>

          <div className="input-group">
            <label>Gender:</label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className={`form-control ${errors.gender ? "is-invalid" : ""}`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <div className="invalid-feedback">{errors.gender?.message}</div>
          </div>

          <button type="submit">Register</button>

          <p>
            Already have an account?{" "}
            <a href="#" onClick={handleLoginRedirect}>Login Now</a>
          </p>
        </form>
      </div>
    </div>
    </>
  );
}

export default Signup;
