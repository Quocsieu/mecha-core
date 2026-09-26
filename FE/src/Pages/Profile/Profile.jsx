import { useEffect, useState } from "react";
import authServices from "../../Services/authServices";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authServices.getMe();
        setUser(data.user);
      } catch (error) {
        console.error("Get profile failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Unable to load profile</div>;
  }

  return (
    <div>
      <h1>My Profile</h1>

      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone || "Not provided"}</p>
      <p>Address: {user.address || "Not provided"}</p>
    </div>
  );
}

export default Profile;