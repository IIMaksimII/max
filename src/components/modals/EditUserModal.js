import React, { useState,useEffect } from 'react';
import { fetchRoles, updateUser } from '../http/userAPI';
const EditUserModal = ({ user, onClose, onUpdateUser  }) => {
    const [editedUser, setEditedUser] = useState({
        email: user.email,
        password: '',
        roleIds: user.roles ? user.roles.map(role => role.id) : []
    });
    const [allRoles, setAllRoles] = useState([]);

    useEffect(() => {
        const loadRoles = async () => {
            const roles = await fetchRoles();
            setAllRoles(roles);
        };
        loadRoles();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleRoleChange = (e) => {
        const options = e.target.options;
        const selectedRoles = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                selectedRoles.push(parseInt(options[i].value));
            }
        }
        setEditedUser(prevUser => ({
            ...prevUser,
            roleIds: selectedRoles
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(user.id, editedUser);
            onClose();
        } catch (error) {
            console.error('Ошибка при обновлении пользователя:', error);
            alert('Ошибка при обновлении пользователя');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Редактировать пользователя</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={editedUser.email}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Пароль:
                        <input
                            type="password"
                            name="password"
                            value={editedUser.password}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Роли:
                        <select
                            multiple={true}
                            name="roles"
                            value={editedUser.roleIds}
                            onChange={handleRoleChange}
                        >
                            {allRoles.map(role => (
                                <option key={role.id} value={role.id}>{role.name}</option>
                            ))}
                        </select>
                    </label>
                    <button type="submit">Сохранить</button>
                </form>
            </div>
        </div>
    );
};



export default EditUserModal;