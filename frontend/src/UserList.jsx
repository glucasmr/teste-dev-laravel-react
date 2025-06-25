import React, { useEffect, useState, useRef } from 'react';
import { getUsers, deleteUser } from './api';
import styles from './UserList.module.css';
import UserTable from './components/UserTable';
import UserSearchInput from './components/UserSearchInput';

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
            <UserSearchInput
                value={search}
                onChange={e => setSearch(e.target.value)}
                inputRef={inputRef}
            />
            <UserTable
                users={users}
                loading={loading}
                onDelete={handleDelete}
            />
        </div>
    );
}