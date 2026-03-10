import { useEffect, useState } from "react";

function UsersPage() {
const [users, setUsers] = useState([]);

useEffect(() => {
fetchUsers();
}, []);

const fetchUsers = async () => {
try {
const response = await fetch("/api/users");
const data = await response.json();

  console.log("API RESPONSE:", data);

  if (Array.isArray(data)) {
    setUsers(data);
  } else if (Array.isArray(data.$values)) {
    setUsers(data.$values);
  } else {
    setUsers([]);
  }
} catch (error) {
  console.error("Fetch error:", error);
  setUsers([]);
}


};

return ( <div> <h1>Users</h1>


  {Array.isArray(users) &&
    users.map((user) => (
      <div key={user.id}>
        {user.name}
      </div>
    ))}
</div>


);
}

export default UsersPage;
