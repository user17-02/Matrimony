import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

function AllProfiles() {
  const [animatingHearts, setAnimatingHearts] = useState({});
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [interests, setInterests] = useState([]);
  const [likedMap, setLikedMap] = useState({});
  const [filters, setFilters] = useState({ age: "", city: "", height: "", profession: "" });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const currentUserId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUserId || !token) {
        navigate("/login");
        return;
      }
      try {
        const { data: currentUser } = await axios.get(
          `http://localhost:5000/api/user/${currentUserId}`,
          axiosConfig
        );

        if (!currentUser.age || !currentUser.city || !currentUser.height || !currentUser.profession) {
          toast.error("Please complete your profile before viewing others.");
          navigate("/editprofile");
          return;
        }

        const oppositeGender = currentUser.gender === "Male" ? "Female" : "Male";
        const { data: allUsers } = await axios.get(
          `http://localhost:5000/api/user/all/${currentUserId}`,
          axiosConfig
        );
        const completedProfiles = allUsers.filter(
          (u) => u.gender === oppositeGender && u.age && u.city && u.height && u.profession
        );
        setUsers(completedProfiles);
        setFilteredUsers(completedProfiles);

        const { data: allRequests } = await axios.get(
          "http://localhost:5000/api/requests",
          axiosConfig
        );

        // Filter only relevant interests
        const mine = allRequests.filter(
          (r) =>
            r.interestFrom?._id === currentUserId ||
            r.interestTo?._id === currentUserId ||
            r.interestFrom === currentUserId ||
            r.interestTo === currentUserId
        );
        setInterests(mine);

        const { data: resLikeIds } = await axios.get(
          `http://localhost:5000/api/likes/ids/${currentUserId}`,
          axiosConfig
        );
        const likedIds = resLikeIds.likedIds || [];
        const map = {};
        likedIds.forEach((id) => (map[id] = true));
        setLikedMap(map);

        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        if (err.response && err.response.status === 401) {
          localStorage.clear();
          navigate("/login");
        } else {
          toast.error("Something went wrong while fetching profiles.");
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [currentUserId, token, navigate]);

  useEffect(() => {
    let filtered = users;
    if (filters.age) filtered = filtered.filter((u) => u.age === parseInt(filters.age));
    if (filters.city) filtered = filtered.filter((u) => u.city?.toLowerCase().includes(filters.city.toLowerCase()));
    if (filters.height) filtered = filtered.filter((u) => u.height === parseInt(filters.height));
    if (filters.profession) filtered = filtered.filter((u) => u.profession?.toLowerCase().includes(filters.profession.toLowerCase()));
    setFilteredUsers(filtered);
  }, [filters, users]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendInterest = async (receiverId) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/requests",
        { interestFrom: currentUserId, interestTo: receiverId },
        axiosConfig
      );
      setInterests((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Interest error:", err);
      toast.error("Failed to send interest.");
    }
  };

  const handleAcceptInterest = async (senderId) => {
    try {
      const entry = interests.find(
        (r) =>
          (r.interestFrom?._id === senderId || r.interestFrom === senderId) &&
          (r.interestTo?._id === currentUserId || r.interestTo === currentUserId)
      );
      if (!entry) return;
      const res = await axios.put(
        `http://localhost:5000/api/requests/${entry._id}`,
        { status: "accepted" },
        axiosConfig
      );
      setInterests((prev) => prev.map((i) => (i._id === entry._id ? res.data : i)));
    } catch (err) {
      console.error("Accept interest error:", err);
      toast.error("Failed to accept interest.");
    }
  };

  const getInterestStatus = (userId) => {
    const sent = interests.find(
      (r) =>
        (r.interestFrom?._id?.toString() === currentUserId && r.interestTo?._id?.toString() === userId) ||
        (r.interestFrom === currentUserId && r.interestTo === userId)
    );
    if (sent) return sent.status || "pending";

    const received = interests.find(
      (r) =>
        (r.interestFrom?._id?.toString() === userId && r.interestTo?._id?.toString() === currentUserId) ||
        (r.interestFrom === userId && r.interestTo === currentUserId)
    );
    if (received) return "received";

    return null;
  };

  const handleLikeToggle = async (profileId) => {
    const isCurrentlyLiked = likedMap[profileId];
    setLikedMap((prev) => ({ ...prev, [profileId]: !isCurrentlyLiked }));

    if (!isCurrentlyLiked) {
      setAnimatingHearts((prev) => ({ ...prev, [profileId]: (prev[profileId] || 0) + 1 }));
    }

    try {
      if (!isCurrentlyLiked) {
        await axios.post(`http://localhost:5000/api/likes/like/${profileId}`, {}, axiosConfig);
      } else {
        await axios.delete(`http://localhost:5000/api/likes/unlike/${profileId}`, axiosConfig);
      }
    } catch (err) {
      console.error("Like/Unlike API error:", err);
    }
  };

  if (loading) return <p className="text-center mt-5">Loading profiles...</p>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4">All Registered Profiles</h3>

      <div className="card p-3 mb-4">
        <div className="row">
          <div className="col-md-2"><input type="number" name="age" className="form-control" placeholder="Age" value={filters.age} onChange={handleFilterChange} /></div>
          <div className="col-md-2"><input type="text" name="city" className="form-control" placeholder="City" value={filters.city} onChange={handleFilterChange} /></div>
          <div className="col-md-2"><input type="number" name="height" className="form-control" placeholder="Height" value={filters.height} onChange={handleFilterChange} /></div>
          <div className="col-md-3"><input type="text" name="profession" className="form-control" placeholder="Profession" value={filters.profession} onChange={handleFilterChange} /></div>
        </div>
      </div>

      <div className="row">
        {filteredUsers.length === 0 ? (
          <p>No profiles found.</p>
        ) : (
          filteredUsers.map((user) => {
            const status = getInterestStatus(user._id);
            const isLiked = likedMap[user._id];
            const animKey = animatingHearts[user._id] || 0;

            return (
              <div className="col-md-4 mb-4" key={user._id}>
                <div className="card p-3 shadow">
                  {user.image && (
                    <img src={user.image} alt={user.name} style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "8px" }} />
                  )}
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <h5 className="mb-0">{user.name}</h5>

                    <button
                      onClick={() => handleLikeToggle(user._id)}
                      className={`like-btn ${isLiked ? "liked" : ""}`}
                      key={animKey}
                      style={{ border: "none", background: "transparent", cursor: "pointer" }}
                    >
                      <svg className="heart" viewBox="0 0 24 24">
                        <path d="M19.5 4.5a5.5 5.5 0 0 0-9.5 3.9v.3a5.5 5.5 0 0 0-9.5-4.2c-2.6 2.6-2 6.9 1.1 10l8.4 8.1c.6.6 1.6.6 2.2 0l8.4-8.1c3.1-3.1 3.7-7.4 1.1-10a5.5 5.5 0 0 0-2.2-1.2Z" transform="translate(4,0) scale(0.66)"/>
                      </svg>
                      <div className="burst"><span></span><span></span><span></span><span></span><span></span><span></span></div>
                    </button>
                  </div>

                  <p><strong>Age:</strong> {user.age}</p>
                  <p><strong>City:</strong> {user.city}</p>
                  <p><strong>Height:</strong> {user.height}</p>
                  <p><strong>Profession:</strong> {user.profession}</p>
                  {status && status !== "received" && <p style={{ color: "green", fontWeight: "bold" }}>Status: {status}</p>}

                  <button className="btn btn-info mt-2 me-2" onClick={() => navigate(`/view/${user._id}`)}>View Details</button>

                  {status === "pending" && (
                    <button className="btn btn-secondary mt-2 me-2" disabled>Interest Sent</button>
                  )}

                  {status === "received" && (
                    <button className="btn btn-primary mt-2 me-2" onClick={() => handleAcceptInterest(user._id)}>Accept Interest</button>
                  )}

                  {!status && (
                    <button className="btn btn-outline-primary mt-2 me-2" onClick={() => handleSendInterest(user._id)}>Send Interest</button>
                  )}

                  {status === "accepted" && (
                    <Link to={`/chat/${user._id}`}>
                      <button className="btn btn-success mt-2 w-100">Chat Now</button>
                    </Link>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Heart Animation Styles */}
      <style>{`
        .like-btn {display:inline-grid;place-items:center;width:40px;height:40px;border-radius:999px;cursor:pointer;position:relative;}
        .like-btn .heart {width:24px;height:24px;fill:none;stroke:#6b7280;stroke-width:2.5px;transition:fill .25s,stroke .25s;}
        .like-btn.liked .heart {stroke:transparent;fill:#e11d48;animation:flip 460ms ease;}
        @keyframes flip {0%{transform:rotateY(0) scale(.9);}50%{transform:rotateY(90deg) scale(1.15);}100%{transform:rotateY(180deg) scale(1);}}
        .burst{position:absolute;inset:0;pointer-events:none;}
        .burst span{position:absolute;width:6px;height:6px;border-radius:999px;opacity:0;}
        .burst span:nth-child(1){left:15%;top:25%;background:#fb7185;--tx:-16px;--ty:-12px;}
        .burst span:nth-child(2){left:75%;top:30%;background:#f43f5e;--tx:16px;--ty:-10px;}
        .burst span:nth-child(3){left:20%;top:70%;background:#fda4af;--tx:-18px;--ty:8px;}
        .burst span:nth-child(4){left:80%;top:70%;background:#f472b6;--tx:18px;--ty:10px;}
        .burst span:nth-child(5){left:50%;top:10%;background:#ef4444;--tx:0;--ty:-18px;}
        .burst span:nth-child(6){left:50%;top:85%;background:#fb7185;--tx:0;--ty:18px;}
        .like-btn.liked .burst span{animation:pop 520ms ease forwards;}
        @keyframes pop {0%{opacity:0;transform:translate(0,0) scale(.4);}60%{opacity:1;}100%{opacity:0;transform:translate(var(--tx),var(--ty)) scale(1);}}
      `}</style>
    </div>
  );
}

export default AllProfiles;
