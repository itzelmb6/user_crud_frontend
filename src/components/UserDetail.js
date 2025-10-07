import React from 'react';

const UserDetail = ({ user, onClose }) => {
  return (
    <div className="user-detail-overlay">
      <div className="user-detail-modal">
        <div className="modal-header">
          <h2>Detalles del Usuario</h2>
          <button 
            onClick={onClose}
            className="btn btn-close"
            title="Cerrar"
          >
            ✕
          </button>
        </div>
        
        <div className="user-detail-content">
          <div className="detail-group">
            <label>ID:</label>
            <span>{user.id}</span>
          </div>
          
          <div className="detail-group">
            <label>Nombre:</label>
            <span>{user.name}</span>
          </div>
          
          <div className="detail-group">
            <label>Email:</label>
            <span>{user.email}</span>
          </div>
          
          <div className="detail-group">
            <label>Teléfono:</label>
            <span>{user.phone}</span>
          </div>
          
          <div className="detail-group">
            <label>Rol:</label>
            <span className={`${user.rol}`}>
              {user.rol}
            </span>
          </div>
          
          <div className="detail-group">
            <label>Fecha de creación:</label>
            <span>{new Date(user.created_at).toLocaleDateString('es-MX')}</span>
          </div>
          
          <div className="detail-group">
            <label>Última actualización:</label>
            <span>{new Date(user.updated_at).toLocaleDateString('es-MX')}</span>
          </div>
        </div>
        
        <div className="modal-actions">
          <button 
            onClick={onClose}
            className="btn btn-secondary"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;