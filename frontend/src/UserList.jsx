import React, { useEffect, useState, useRef } from 'react';
import { getUsers, deleteUser } from './api';
import styles from './UserList.module.css';

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const inputRef = useRef(null);

    const fetchUsers = async (searchValue = '') => {
        setLoading(true);
        try {
            const data = await getUsers(searchValue);
            setUsers(data);
        } catch (err) {
            setError('Erro ao carregar usuários');
        }
        setLoading(false);
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchUsers(search);
        }, 400);
        return () => clearTimeout(delayDebounce);
    }, [search]);

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            setUsers(users.filter((u) => u.id !== id));
        } catch (err) {
            setError('Erro ao excluir usuário');
        }
    };

    if (error) return <div>{error}</div>;

    return (
        <div className={styles.container}>
            <input
                ref={inputRef}
                type="text"
                placeholder="Buscar por nome..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className={styles.input}
            />
            <table className={loading ? ${styles.table} ${styles.tableLoading} : styles.table}>
                <thead>
                    <tr>
                        <th className={styles.th}>ID</th>
                        <th className={styles.th}>Nome</th>
                        <th className={styles.th}>Email</th>
                        <th className={styles.th}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && users.length === 0 ? (
                        <tr>
                            <td colSpan="4" className={styles.loading}>Carregando...</td>
                        </tr>
                    ) : users.length === 0 ? (
                        <tr>
                            <td colSpan="4" className={styles.noUsers}>Nenhum usuário encontrado.</td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td className={styles.td}>{user.id}</td>
                                <td className={styles.td}>{user.name}</td>
                                <td className={styles.td}>{user.email}</td>
                                <td className={styles.td}>
                                    <button onClick={() => handleDelete(user.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}