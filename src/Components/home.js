import review from '../images/Review.jpg'
import Verified from '../images/Verified.png'
import Trust from '../images/Trust.png'
import Ring from '../images/Ring.png'
import Couple from '../images/Couple.png'
import Marriage from '../images/Marriage.png'
import Social from '../images/Social.png'
import share from '../images/share.png'
import Lovebirds from '../images/Lovebirds.png'





function Home() {

  
    return (
       <div>
      
  {/* <!-- Hero Section --> */}
  <div className="hero">
    <div className="overlay"></div>

    <div className="hero-content">
      <p>#1 MATRIMONY</p>
      <h1>Find your <span>Right Match</span> here</h1>
      <p>Most trusted Matrimony Brand in the World.</p> 

      <div className="search-form">
        <select><option disabled selected>I'm looking for</option><option>Man</option><option>Woman</option></select>
        <select><option disabled selected>Age</option><option>18-25</option><option>26-35</option><option>36+</option></select>
        <select><option disabled selected>Religion</option><option>Hindu</option><option>Christian</option><option>Muslim</option></select>
        <select><option disabled selected>Location</option><option>USA</option><option>India</option><option>UK</option></select>
        <button >Search</button> 
      </div>
    </div>
  </div>

  {/* <img section> */}

   <div className="brand">
    <p>Trusted Brand</p>
    <h1>Trust by 1500+ Couples</h1>
  </div>
  <div className="d-flex flex-row justify-content-center gap-3 my-4" id="cd">
  <div className="card " style={{
  width: "18rem" ,}}>
  <img src={review} className="card-img-top" alt="..." />
  <div className="card-body">
    <p className="card-text">“We never imagined we’d find each other online, but Matrimony made it so easy. The profiles were genuine, and the process felt so safe. We got married in just 6 months of meeting—forever grateful!”

</p>
  </div>
</div>
<div className="card " style={{
  width: "18rem" ,}}>
  <img src={review} className="card-img-top" alt="..." />
  <div className="card-body">
    <p className="card-text">“Thanks to this platform, we connected over shared values and interests. Our families were impressed too. The detailed profile options helped us find a true match—not just on paper but in real life.”</p>
  </div>
</div>
<div className="card " style={{
  width: "18rem" ,}}>
  <img src={review} className="card-img-top" alt="..." />
  <div className="card-body">
    <p className="card-text"> “After months of searching elsewhere, we found each other here. The verification and filtering options saved time and stress. We’re now happily married and recommend it to everyone serious about commitment.”</p>
  </div>
</div>
</div>

{/* <!--- why choose us --> */}

<section class="why-choose-us">
  <div class="container">
    <h4 class="subtitle">💍 WEDDING WEBSITE</h4>
    <h2 class="main-title">Why choose us</h2>
    <p class="description">Most Trusted and premium Matrimony Service in the World.</p>

    <div class="features">
      <div class="feature-box">
     <img src={Verified} alt="verified" /> 
        <h3>Genuine profiles</h3>
        <p>Contact genuine profiles with 100% verified mobile</p>
      </div>
      <div class="feature-box">
        <img src={Trust} alt="Most trusted" />
        <h3>Most trusted</h3>
        <p>The most trusted wedding matrimony brand lorem</p>
      </div>
      <div class="feature-box">
        <img src={Ring} alt="2000+ weddings" />
        <h3>2000+ weddings</h3>
        <p>Lakhs of peoples have found their life partner</p>
      </div>
    </div>
  </div>
</section>

<section class="stats">
  <div class="stat-box">
    <i class="icon">🤍</i>
    <h2>2K</h2>
    <p>Couples Paired</p>
  </div>
  <div class="stat-box">
    <i class="icon">👥</i>
    <h2>4000+</h2>
    <p>Registrants</p>
  </div>
  <div class="stat-box">
    <i class="icon">👨</i>
    <h2>1600+</h2>
    <p>Men</p>
  </div>
  <div class="stat-box">
    <i class="icon">👩</i>
    <h2>2000+</h2>
    <p>Women</p>
  </div>
</section>

{/* <!-- Timeline Section--> */}

 <div class="timeline">

    {/* <!-- Step 1 --> */}
    <div class="timeline-row">
      <div class="timeline-col image-col">
        <img src={Ring} alt="Rings" />
      </div>
      <div class="timeline-center">
        <div class="dot"></div>
      </div>
      <div class="timeline-col content-col">
        <div class="content-box">
          <h3>Find your Match</h3>
          <p><strong>Timing:</strong> 7:00 PM</p>
          <p>Lorem Ipsum is simply dummy text...</p>
        </div>
      </div>
    </div>

    {/* <!-- Step 2 --> */}
    <div class="timeline-row">
      <div class="timeline-col content-col">
        <div class="content-box">
          <h3>Register</h3>
          <p><strong>Timing:</strong> 7:15 PM</p>
          <p>Lorem Ipsum is simply dummy text...</p>
        </div>
      </div>
      <div class="timeline-center">
        <div class="dot"></div>
      </div>
      <div class="timeline-col image-col">
       <img src={Couple} alt="Couple" />
      </div>
    </div>

    {/* <!-- Step 3 --> */}
    <div class="timeline-row">
      <div class="timeline-col image-col">
        <img src={Lovebirds} alt="Love Birds" />
      </div>
      <div class="timeline-center">
        <div class="dot"></div>
      </div>
      <div class="timeline-col content-col">
        <div class="content-box">
          <h3>Get Profile Info</h3>
          <p><strong>Timing:</strong> 7:30 PM</p>
          <p>Lorem Ipsum is simply dummy text...</p>
        </div>
      </div>
    </div>

    {/* <!-- Step 4 --> */}
    <div class="timeline-row">
      <div class="timeline-col content-col">
        <div class="content-box">
          <h3>Send Interest</h3>
          <p><strong>Timing:</strong> 7:45 PM</p>
          <p>Lorem Ipsum is simply dummy text...</p>
        </div>
      </div>
      <div class="timeline-center">
        <div class="dot"></div>
      </div>
      <div class="timeline-col image-col">
       <img src={share} alt="Share" />
      </div>
    </div>

    {/* <!-- Step 5 --> */}
    <div class="timeline-row">
      <div class="timeline-col image-col">
       <img src={Social} alt="Social" />
      </div>
      <div class="timeline-center">
        <div class="dot"></div>
      </div>
      <div class="timeline-col content-col">
        <div class="content-box">
          <h3>Start Meetups</h3>
          <p><strong>Timing:</strong> 8:00 PM</p>
          <p>Lorem Ipsum is simply dummy text...</p>
        </div>
      </div>
    </div>

    {/* <!-- Step 6 --> */}
    <div class="timeline-row">
      <div class="timeline-col content-col">
        <div class="content-box">
          <h3>Get Married </h3>
          <p><strong>Timing:</strong> 8:15 PM</p>
          <p>Lorem Ipsum is simply dummy text...</p>
        </div>
      </div>
      <div class="timeline-center">
        <div class="dot"></div>
      </div>
      <div class="timeline-col image-col">
       <img src={Marriage} alt="Couple 2" />
      </div>
    </div>

  </div>

  {/* <!--Call to Action Section--> */}
    <div class="Call"  >
      
    <h1>Find Your Perfect Match Now</h1>
    <h5>Where Meaningful Connections Turn Into Lifelong Commitments.</h5>
    <button>Register Now</button>
     <button>Help & Support</button>
     
     </div>

      {/* <!-- Footer--> */}
      
  <footer className="footer">
    <div className="footer-container">
     
      <div class="footer-column">
        <h4>Get In Touch</h4>
        <p>Phone: +92 (8800) 68 - 8960</p>
         <p>Email: info@example.com</p>
      </div>

      <div class="footer-column">
        <h4>Help&support</h4>
        <div class="links">
          <div>
            <a href="">Home</a><br />
            <a href="">About</a><br />
            <a href="">Service</a><br />
            <a href="">Contact us</a><br />
            <a href="">FAQs</a>
          </div>
        </div>
      </div>

      <div className="footer-column">
        <h4>Social Media</h4>
        <div class="social-icons">
        <a href="#"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/linkedin.svg" alt="LinkedIn" /></a>
        <a href="#"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/twitter.svg" alt="Twitter" /></a>
        <a href="#"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/facebook.svg" alt="Facebook" /></a>
        <a href="#"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/youtube.svg" alt="YouTube" /></a>
      </div>
      </div>

    </div>
  </footer>

   <div class="copy">
      <p>&copy; 2025 True Tie. All rights reserved.</p>
      </div>

        </div>
    )

}
export default Home;