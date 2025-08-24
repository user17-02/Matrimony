import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Login({ setUser }) {
  const navigate = useNavigate();
  const handleClick = () => navigate('/Signup');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          loginInput: data.loginInput,
          password: data.password,
        }
      );

      if (response.status === 200) {
        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);

        // ✅ Check for mustChange flag sent from backend
        if (response.data.mustChange) {
          navigate("/ChangePassword");
        } else {
          navigate("/Editprofile");
        }
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const handleForgotPassword = () => {
    const email = prompt("Enter your registered email:");
    if (email) {
      axios
        .post("http://localhost:5000/api/user/forgot-password", { email })
        .then((res) => alert(res.data.message))
        .catch((err) => alert(err.response?.data?.message || "Error"));
    }
  };

  return (
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
            If you don't have an account?{" "}
            <a href="" onClick={handleClick}>Register Now</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;