import React, { useState, useEffect } from "react";
import { userService } from "../services/api";
import UserItem from "./UserItem";
import UserForm from "./UserForm";
import UserDetail from "./UserDetail";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);

  // Cargar usuarios
  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAll();
      setUsers(response.data);
      setError("");
    } catch (err) {
      setError("Error al cargar los usuarios");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Crear usuario
  const handleCreate = async (userData) => {
    try {
      await userService.create(userData);
      await loadUsers();
      setShowForm(false);
      setError("");
    } catch (err) {
      setError("Error al crear el usuario");
      console.error("Error:", err);
    }
  };

  // Actualizar usuario
  const handleUpdate = async (userData) => {
    try {
      await userService.update(editingUser.id, userData);
      await loadUsers();
      setEditingUser(null);
      setShowForm(false);
      setError("");
    } catch (err) {
      setError("Error al actualizar el usuario");
      console.error("Error:", err);
    }
  };

  // Eliminar usuario
  const handleDelete = async (userId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      try {
        await userService.delete(userId);
        await loadUsers();
        setError("");
      } catch (err) {
        setError("Error al eliminar el usuario");
        console.error("Error:", err);
      }
    }
  };

  // Editar usuario
  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  // Guardar usuario (crear o actualizar)
  const handleSave = (userData) => {
    if (editingUser) {
      handleUpdate(userData);
    } else {
      handleCreate(userData);
    }
  };

  // Ver detalles del usuario
  const handleView = (user) => {
    setViewingUser(user);
  };
  const handleCloseDetail = () => {
    setViewingUser(null);
  };

  // Cancelar formulario
  const handleCancel = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  if (loading) return <div className="loading">Cargando usuarios...</div>;

  return (
    <div className="user-list">
      <div className="header">
        <h1>Gestión de Usuarios</h1>
        <button onClick={() => setShowForm(true)} className="btn btn-primary">
          ➕ Crear Usuario
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {showForm ? (
        <UserForm
          user={editingUser}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <div className="users-container">
          {users.length === 0 ? (
            <div className="no-users">
              <p>No hay usuarios registrados</p>
              <button
                onClick={() => setShowForm(true)}
                className="btn btn-primary"
              >
                Crear Primer Usuario
              </button>
            </div>
          ) : (
            <div className="table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <UserItem
                      key={user.id}
                      user={user}
                      onView={handleView}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      {viewingUser && (
        <UserDetail user={viewingUser} onClose={handleCloseDetail} />
      )}
    </div>
  );
};

export default UserList;
