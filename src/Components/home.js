function Home() {
    return (
       <div>
      
  {/* <!-- Hero Section --> */}
  <div class="hero">
    <div class="overlay"></div>

    <div class="hero-content">
      <p>#1 MATRIMONY</p>
      <h1>Find your <span>Right Match</span> here</h1>
      <p>Most trusted Matrimony Brand in the World.</p>

      <div class="search-form">
        <select><option disabled selected>I'm looking for</option><option>Man</option><option>Woman</option></select>
        <select><option disabled selected>Age</option><option>18-25</option><option>26-35</option><option>36+</option></select>
        <select><option disabled selected>Religion</option><option>Hindu</option><option>Christian</option><option>Muslim</option></select>
        <select><option disabled selected>Location</option><option>USA</option><option>India</option><option>UK</option></select>
        <button>Search</button>
      </div>
    </div>
  </div>

        </div>
    )

}
export default Home;