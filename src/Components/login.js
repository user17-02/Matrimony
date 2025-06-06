import {useForm} from "react-hook-form";
import {useNavigate} from 'react-router-dom';
function Login() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate ('/Signup');
    }
    const {
        register,
        handleSubmit,
        reset,
        formstate: {errors },
    } = useForm();
    
    const onSubmit = async (data) => {
        console.log(data);
    };
    return (
        
       
        <div>
            <div class="login1">
                <h2>Login</h2>
                 <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div class="input-group">
                        <i class="bx bx-user"></i>
                        <input type="text" placeholder="Enter your username or email" name="username" 
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        // {...register("email",{
                        //     required: "Email is required",
                        //     pattern: {
                        //         value: /\s+@\s+\.\s+/,
                        //         message: "Invalid email",
                        //     },
                        //     })} 
                            />
                          <div className="invalid-feedback">{errors.email?.message}</div>  
                    </div>
                    <div class="input-group">
                        <i class="bx bx-lock"></i>
                        <input type="password" placeholder="Enter your password" name="password" 
                        className={`form-control ${errors.password ? "is-invalid" : ""}`} 
                        // {...register("password", {
                        //     required: "password is required",
                        // })}
                        />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    <div class="extra">
                        {/* <a href="#">Forgot password?</a> */}
                    </div>
                    <button type="submit">Login</button>
                    <div>If you don't have an account? <a href="" onClick={handleClick}>Register Now</a></div>
                </form>
            </div>




         </div>


    );

}
export default Login;