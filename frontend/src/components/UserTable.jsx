import React from 'react';
import styles from '../UserList.module.css';

export default function UserTable({ users, loading, onDelete }) {
    return (
        <table className={loading ? `${styles.table} ${styles.tableLoading}` : styles.table}>
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
                    (Array.isArray(users) ? users : []).map((user) => (
                        <tr key={user.id}>
                            <td className={styles.td}>{user.id}</td>
                            <td className={styles.td}>{user.name}</td>
                            <td className={styles.td}>{user.email}</td>
                            <td className={styles.td}>
                                <button onClick={() => onDelete(user.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
} 