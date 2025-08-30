import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setUser }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/api/user/login", {
        loginInput: data.loginInput,
        password: data.password,
      });

      const { token, user } = response.data;

      // ✅ Save JWT, user, and userId
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", user._id);

      setUser(user);

      // ✅ Redirect based on profile completeness
      if (
        !user.name || !user.age || !user.height || !user.city || !user.profession ||
        !user.gender || !user.complexion || !user.bodyType || !user.religion ||
        !user.caste || !user.motherTongue || !user.maritalStatus ||
        !user.smoking || !user.drinking || !user.hobbies || !user.interests || !user.aboutMe ||
        !user.image ||
        !user.partnerPreferences?.ageRange ||
        !user.partnerPreferences?.heightRange ||
        !user.partnerPreferences?.complexion ||
        !user.partnerPreferences?.profession ||
        !user.partnerPreferences?.religion ||
        !user.partnerPreferences?.caste ||
        !user.partnerPreferences?.location
      ) {
        navigate("/editprofile"); // must complete profile first
      } else {
        navigate("/profiles"); // profile complete → go to all profiles
      }
    } catch (error) {
     toast.error(error.response?.data?.message || "Login failed");
      console.error(error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    const email = prompt("Enter your registered email:");
    if (email) {
      axios
        .post("http://localhost:5000/api/user/forgot-password", { email })
        .then((res) => alert(res.data.message))
        .catch((err) => alert(err.response?.data?.message || "Error"));
    }
  };

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
    <div className="my-page-wrapper">
      <div className="Login1">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="input-group">
            <i className="bx bx-user"></i>
            <input
              type="text"
              placeholder="Enter your username or email"
              className={`form-control ${errors.loginInput ? "is-invalid" : ""}`}
              {...register("loginInput", { required: "Email or username is required" })}
            />
            <div className="invalid-feedback">{errors.loginInput?.message}</div>
          </div>

          <div className="input-group">
            <i className="bx bx-lock"></i>
            <input
              type="password"
              placeholder="Enter your password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...register("password", { required: "Password is required" })}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>

          <div className="extra">
            <a href="#" onClick={handleForgotPassword}>Forgot password?</a>
          </div>

          <button type="submit">Login</button>

          <div>
            Don't have an account?{" "}
            <a href="#" onClick={handleClick}>Register Now</a>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default Login;
