import {useForm} from "react-hook-form";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
function Login({ setUser }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate ('/Signup');
    }
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors },
    } = useForm();
    
    const onSubmit = async (data) => {
        try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          loginInput: data.loginInput,
          password: data.password,
        },
       
    );

    if(response.status === 200){
        localStorage.setItem("userId",response.data.user._id);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token); 

    //     const token = btoa(JSON.stringify(response.data.user));
    // document.cookie = `token=${token}; path=/; max-age=3600`;
    setUser(response.data.user);
        navigate("/Editprofile")
    }
}
    catch (error) {
      console.log(error);
      alert(error.response.data.message);

    }
};

    return (

        <div>
             <div class="my-page-wrapper">
            <div class="Login1">
                <h2>Login</h2>
                 <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div class="input-group">
                        <i class="bx bx-user"></i>
                        <input type="text" placeholder="Enter your username or email" name="loginInput" 
                        className={`form-control ${errors.loginInput ? "is-invalid" : ""}`}
                        {...register("loginInput",{
                            required: "Email or username is required"
                            })} 
                            />
                          <div className="invalid-feedback">{errors.loginInput?.message}</div>  
                    </div>
                    <div class="input-group">
                        <i class="bx bx-lock"></i>
                        <input type="password" placeholder="Enter your password" name="password" 
                        className={`form-control ${errors.password ? "is-invalid" : ""}`} 
                        {...register("password", {
                            required: "password is required",
                        })}
                        />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    <div class="extra">
                        <a href="#">Forgot password?</a>
                    </div>
                    <button type="submit">Login</button>
                    <div>If you don't have an account? <a href="" onClick={handleClick}>Register Now</a></div>
                </form>
            </div>
</div>
     </div>
    );

}
export default Login;