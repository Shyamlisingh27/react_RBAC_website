import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]); // To store roles for the dropdown
  const [formData, setFormData] = useState({ name: '', email: '', role: '', status: 'Active' });
  const [editingUserId, setEditingUserId] = useState(null);

  // Load users and roles from localStorage when the component mounts
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    const storedRoles = localStorage.getItem('roles');
    if (storedUsers) setUsers(JSON.parse(storedUsers));
    if (storedRoles) setRoles(JSON.parse(storedRoles).map((role) => role.roleName));
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addUser = () => {
    if (formData.name && formData.email && formData.role) {
      setUsers([...users, { ...formData, id: Date.now() }]);
      setFormData({ name: '', email: '', role: '', status: 'Active' });
    } else {
      alert('All fields are required!');
    }
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const editUser = (user) => {
    setEditingUserId(user.id);
    setFormData(user);
  };

  const saveEdit = () => {
    setUsers(
      users.map((user) => (user.id === editingUserId ? { ...formData, id: editingUserId } : user))
    );
    setEditingUserId(null);
    setFormData({ name: '', email: '', role: '', status: 'Active' });
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>

      <div className="form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <select name="role" value={formData.role} onChange={handleInputChange}>
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <select name="status" value={formData.status} onChange={handleInputChange}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        {editingUserId ? (
          <button onClick={saveEdit}>Save</button>
        ) : (
          <button onClick={addUser}>Add User</button>
        )}
      </div>

      {users.length > 0 ? (
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  <button onClick={() => editUser(user)}>Edit</button>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users available. Add some users to get started.</p>
      )}
    </div>
  );
};

export default UserManagement;
