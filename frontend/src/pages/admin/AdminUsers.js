import axios from "axios";
import { useEffect, useState } from "react";
import "../../styles/AdminDashboard.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="admin-card">
      <h2>All Users</h2>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((user) => (
          <div key={user.id} style={{ marginBottom: "10px" }}>
            <strong>{user.name}</strong> — {user.role}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminUsers;