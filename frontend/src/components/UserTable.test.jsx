import { render, screen, fireEvent } from '@testing-library/react';
import UserTable from './UserTable';

describe('UserTable', () => {
    it('renders users', () => {
        const users = [
            { id: 1, name: 'Alice', email: 'alice@example.com' },
            { id: 2, name: 'Bob', email: 'bob@example.com' },
        ];
        render(<UserTable users={users} loading={false} onDelete={() => { }} />);
        expect(screen.getByText('Alice')).toBeInTheDocument();
        expect(screen.getByText('Bob')).toBeInTheDocument();
    });

    it('shows loading', () => {
        render(<UserTable users={[]} loading={true} onDelete={() => { }} />);
        expect(screen.getByText('Carregando...')).toBeInTheDocument();
    });

    it('shows no users message', () => {
        render(<UserTable users={[]} loading={false} onDelete={() => { }} />);
        expect(screen.getByText('Nenhum usuário encontrado.')).toBeInTheDocument();
    });
}); 