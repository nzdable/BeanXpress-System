import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CustomerHome() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { firstName, lastName, email, username } = state || {};

  const [isEditing, setIsEditing] = useState(false);
  const [editFirstName, setEditFirstName] = useState(firstName || '');
  const [editLastName, setEditLastName] = useState(lastName || '');
  const [editEmail, setEditEmail] = useState(email || '');
  const [editUsername, setEditUsername] = useState(username || '');

  const handleEdit = () => {
    axios.put('http://127.0.0.1:5173/updateUser', { firstName: editFirstName, lastName: editLastName, email: editEmail, username: editUsername })
      .then(response => {
        console.log('User updated successfully', response);
        setIsEditing(false);
        // Optionally update the state or redirect
        navigate('/customerHome', { state: { firstName: editFirstName, lastName: editLastName, email: editEmail, username: editUsername } });
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  const handleDelete = () => {
    axios.delete('http://127.0.0.1:5173/deleteUser', { data: { username } })
      .then(response => {
        console.log('User deleted successfully', response);
        navigate('/');
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div>
      <h1>Welcome, {isEditing ? editFirstName : firstName}!</h1>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editFirstName}
            onChange={(e) => setEditFirstName(e.target.value)}
            placeholder="First Name"
          />
          <input
            type="text"
            value={editLastName}
            onChange={(e) => setEditLastName(e.target.value)}
            placeholder="Last Name"
          />
          <input
            type="email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="text"
            value={editUsername}
            onChange={(e) => setEditUsername(e.target.value)}
            placeholder="Username"
          />
          <button onClick={handleEdit}>Save Changes</button>
        </div>
      ) : (
        <div>
          <p><strong>Full Name:</strong> {firstName} {lastName}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Username:</strong> {username}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default CustomerHome;
