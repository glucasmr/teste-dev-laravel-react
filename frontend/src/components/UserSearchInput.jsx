import React from 'react';
import styles from '../UserList.module.css';

export default function UserSearchInput({ value, onChange, inputRef }) {
    return (
        <div>
            <label htmlFor="user-search" style={{ display: 'none' }}>Buscar por nome</label>
            <input
                id="user-search"
                ref={inputRef}
                type="text"
                placeholder="Buscar por nome..."
                value={value}
                onChange={onChange}
                className={styles.input}
                aria-label="Buscar por nome"
            />
        </div>
    );
} 