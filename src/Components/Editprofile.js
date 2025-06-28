import React from "react";

function Editprofile(){
    return(
        
  <div>
    <div class="container py-5">
      <h6 class="text-uppercase text-muted">Basic Info</h6>
      <h2 class="section-title">Edit My Profile</h2>
      <form>
        <div class="mb-3">
          <label for="name" class="form-label">Name:</label>
          <input type="text" class="form-control" id="name" placeholder="Enter Your full name" />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email:</label>
            <input type="email" class="form-control bg-light" id="email" placeholder="Enter email" />
            </div>
            <div class="mb-3">
              <label for="phone" class="form-label">Phone:</label>
              <input type="text" class="form-control bg-light" id="phone" placeholder="Enter phone number" />
              </div>
              <div class="mb-4">
                <label for="password" class="form-label">Password:</label>
                <input type="password" class="form-control" id="password" placeholder="Enter Password" />
               </div>
              

              {/* <Advanced Bio>*/}
              <h6 class="text-uppercase text-muted">Basic Info</h6>
              <h2 class="section-title">Advanced bio</h2>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Gender:</label>
                  <select class="form-select">
                    <option Selected >Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
 </div>
 <div class="col-md-6">
  <label class="form-label">Ciy:</label>
  <select class="form-select">
    <option selected>Chennai</option>
    <option>Mumbai</option>
    <option>Delhi</option>
    <option>Bangalore</option>
  </select>
 </div>
 <div class="col-md-6">
  <label class="form-label">Date of birth:</label>
  <input type="date" class="form-control" />
 </div>
 <div class="col-md-6">
  <label class="form-label">Age:</label>
  <input type="number" class="form-control" placeholder="Enter Age" />
 </div>
 <div class="col-md-6">
  <label class="form-label">Height:</label>
  <input type="text" class="form-control" placeholder="Enter height" />
 </div>
 <div class="col-md-6">
  <label class="form-label">Weight:</label>
  <input type="text" class="form-control" placeholder="Enter Weight" />
</div>
<div class="col-md-6">
  <label class="form-label">Father's Name:</label>
  <input type="text" class="form-control" placeholder="Enter Father's Name" />
</div>
<div class="col-md-6">
  <label class="form-label">Mother's Name:</label>
  <input type="text" class="form-control" placeholder="Enter Mother's Name" />
  </div>
  <div class="col-md-6">
    <label class="form-label">Address:</label>
    <input type="text" class="form-control" placeholder="Enter address" />
  </div>
              </div>
              {/* <Job & Education> */}
              <h6 class="text-uppercase text-muted">Job Details</h6>
              <h2 class="section-title">Job & Education</h2>
              <div class="mb-3">
                <label class="form-label">Job Type:</label>
                <select class="form-select">
                  <option selected>Business</option>
                  <option>Private</option>
                  <option>Government</option>
                  <option>Freelancer</option>
                </select>
                </div>
                <div class="mb-3">
                  <label class="form-label">Company Name:</label>
                  <input type="text" class="form-control" placeholder="Enter Company Name" />
                </div>
                <div class="row g-3 mb-3">
                  <div class="col-md-6">
                    <label class="form-label">Salary:</label>
                    <input type="text" class="form-control" placeholder="Enter Salary" />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Job Total Experience:</label>
                    <input type="text" class="form-control" placeholder="Enter Experience" />
                  </div>
                </div>
                <div class="mb-4">
                  <label class="form-label">Degree:</label>
                  <input type="text" class="form-control" placeholder="Enter Degree" />
                </div>

                {/* <Social Media> */}
                <h2 class="section-title">Social Media</h2>
                <div class="row g-3 mb-4">
                  <div class="col-md-6">
                    <label class="form-label">Whatsapp:</label>
                    <input type="text" class="form-control" placeholder="Enter Whatsapp number" />
                  </div>
                   <div class="col-md-6">
          <label class="form-label">Facebook:</label>
          <input type="text" class="form-control" placeholder="Facebook profile link" />
        </div>
        <div class="col-md-6">
          <label class="form-label">Instagram:</label>
          <input type="text" class="form-control" placeholder="Instagram username or link" />
        </div>
        <div class="col-md-6">
          <label class="form-label">X:</label>
          <input type="text" class="form-control" placeholder="Twitter/X profile link" />
        </div>
        <div class="col-md-6">
          <label class="form-label">YouTube:</label>
          <input type="text" class="form-control" placeholder="YouTube channel link" />
        </div>
        <div class="col-md-6">
          <label class="form-label">LinkedIn:</label>
          <input type="text" class="form-control" placeholder="LinkedIn profile link" />
        </div>
      </div>
                
                {/* <Hobbies> */}
                <h6 class="text-uppercase text-muted">Interests</h6>
                <h2 class="section-title">Hobbies</h2>
                <div class="mb-4">
                  <input type="text" class="form-control" placeholder="Select Your Hobbies" />
                </div>

                {/* <submit button> */}
                <hr />
           <div class="d-grid">
            <button type="submit" class="btn btn-secondary btn-lg">Submit</button>
           </div>
              </form>
              </div>

    
  </div>

    )
}
export default Editprofile;