
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/api/users')
            .then(response => setUsers(response.data));
    }, []);

    const handleDelete = (id) => {
        // Bug proposital: não está passando o ID corretamente
        axios.delete('/api/users')
            .then(() => {
                setUsers(users.filter(user => user.id !== id));
            });
    };

    return (
        <div>
            <input placeholder="Buscar por nome" />
            <table>
                <thead><tr><th>Nome</th><th>Email</th><th>Ações</th></tr></thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td><button onClick={() => handleDelete(user.id)}>Excluir</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;
