function Signup() {
    return(
        <div>
            <div class="container">
    <h2>Register</h2>
    <form action="#">
      <div class="input-group">
        <i class="bx bx-user"></i>
        <input type="text" name="username" placeholder="Enter your username" required />
      </div>
      <div class="input-group">
        <i class="bx bx-envelope"></i>
        <input type="email" name="email" placeholder="Enter your email" required />
      </div>
      <div class="input-group">
        <i class="bx bx-lock"></i>
        <input type="password" name="password" placeholder="Enter your password" required />
      </div>
      <div class="input-group">
        <i class="bx bx-lock"></i>
        <input type="password" name="confirm_password" placeholder="Confirm password" required />
      </div>
      <div class="extra">
        <button type="submit">Register</button>
      </div>
      <p>Already have an account? <a href="login.html">Login Now</a></p>
    </form>
  </div>
        </div>

    )
}
export default Signup;