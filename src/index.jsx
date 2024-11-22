/* 
  Implement a button which makes a get request to https://reqres.in/ to get a list of users and display them.
  100% free reign to accomplish this goal however you wish, within the context of react.

  apiMethods.js file has already been stubbed out for you. Feel free to use it or not.

  ****Make any changes to this boilerplate that you want to.*****
  ****The included code is only provided as a convienence.****

  Bonus 1:  Add a button for each user to make a delete request to delete that user. 
          Update the displayed users excluding the deleted user.

  Bonus 2: Make a filter box to filter the displayed users by name.
*/

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { getUsers, deleteUser, addUser } from "./apiMethods";

import "./styles.css";

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserJob, setNewUserJob] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const fetchedUsers = await getUsers();
    setUsers(fetchedUsers);
    setFilteredUsers(fetchedUsers);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    setFilteredUsers(
      users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(value) ||
          user.last_name.toLowerCase().includes(value)
      )
    );
  };

  const handleAddUser = async () => {
    if (!newUserName || !newUserJob)
      return alert("Please provide name and job!");
    
    const newUser = await addUser({ name: newUserName, job: newUserJob });
    const updatedUsers = [...users, { ...newUser, id: users.length + 1 }];
    
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  
    setNewUserName("");
    setNewUserJob("");
  };

  return (
    <div className="App">
      <h2>Users from API:</h2>

      <input
        type="text"
        placeholder="Filter users by name..."
        value={filter}
        onChange={handleFilterChange}
      />

<div>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.id} className="user-item">
              <span>
                {user.first_name} {user.last_name}
              </span>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>

      <h3>Add User</h3>
      <input
        type="text"
        placeholder="Name"
        value={newUserName}
        onChange={(e) => setNewUserName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Job"
        value={newUserJob}
        onChange={(e) => setNewUserJob(e.target.value)}
      />
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
