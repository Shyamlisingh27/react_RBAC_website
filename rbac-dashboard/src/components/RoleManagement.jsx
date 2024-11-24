import React, { useState, useEffect } from 'react';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);

  // Load roles from localStorage on component mount
  useEffect(() => {
    const storedRoles = localStorage.getItem('roles');
    if (storedRoles) {
      setRoles(JSON.parse(storedRoles));
    }
  }, []);

  // Save roles to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('roles', JSON.stringify(roles));
  }, [roles]);

  const [formData, setFormData] = useState({ roleName: '', permissions: [] });
  const [permissions] = useState(['Read', 'Write', 'Delete']);
  const [editingRoleId, setEditingRoleId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePermissionToggle = (permission) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const addRole = () => {
    if (formData.roleName) {
      setRoles([...roles, { ...formData, id: Date.now() }]);
      setFormData({ roleName: '', permissions: [] });
    } else {
      alert('Role name is required!');
    }
  };

  const deleteRole = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  const editRole = (role) => {
    setEditingRoleId(role.id);
    setFormData(role);
  };

  const saveEdit = () => {
    setRoles(
      roles.map((role) => (role.id === editingRoleId ? { ...formData, id: editingRoleId } : role))
    );
    setEditingRoleId(null);
    setFormData({ roleName: '', permissions: [] });
  };

  return (
    <div className="role-management">
      <h2>Role Management</h2>

      <div className="form">
        <input
          type="text"
          name="roleName"
          placeholder="Role Name"
          value={formData.roleName}
          onChange={handleInputChange}
        />
        <div className="permissions">
          {permissions.map((permission) => (
            <label key={permission}>
              <input
                type="checkbox"
                checked={formData.permissions.includes(permission)}
                onChange={() => handlePermissionToggle(permission)}
              />
              {permission}
            </label>
          ))}
        </div>
        {editingRoleId ? (
          <button onClick={saveEdit}>Save</button>
        ) : (
          <button onClick={addRole}>Add Role</button>
        )}
      </div>

      {roles.length > 0 ? (
        <table className="role-table">
          <thead>
            <tr>
              <th>Role Name</th>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td>{role.roleName}</td>
                <td>{role.permissions.join(', ') || 'No Permissions'}</td>
                <td>
                  <button onClick={() => editRole(role)}>Edit</button>
                  <button onClick={() => deleteRole(role.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No roles available. Add some roles to get started.</p>
      )}
    </div>
  );
};

export default RoleManagement;
