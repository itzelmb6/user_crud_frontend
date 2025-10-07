import React from 'react';

const UserItem = ({ user, onView, onEdit, onDelete }) => {
  return (
    <tr className="user-row">
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>
        <span className={`${user.rol}`}>
          {user.rol}
        </span>
      </td>
      <td className="actions">
        <button 
          onClick={() => onView(user)}
          className="btn btn-view"
          title="Ver detalles"
        >
          👁️
        </button>
        <button 
          onClick={() => onEdit(user)}
          className="btn btn-edit"
          title="Editar"
        >
          ✏️
        </button>
        <button 
          onClick={() => onDelete(user.id)}
          className="btn btn-delete"
          title="Eliminar"
        >
          🗑️
        </button>
      </td>
    </tr>
  );
};

export default UserItem;