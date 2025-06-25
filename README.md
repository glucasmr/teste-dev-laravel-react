# Teste Técnico – Laravel + React

Este é o projeto-base para o teste técnico.

Funcionalidade: Listagem de usuários com opção de exclusão e busca.

Backend:
- Laravel 10
- Endpoint: GET /api/users
- Endpoint: DELETE /api/users/{id}

Frontend:
- React + Axios
- Exibe listagem de usuários em uma tabela
- Botão de excluir com bug proposital
- Filtro de busca a ser implementado

Tarefas:
1. Corrigir o botão "Excluir" que não está funcionando.
2. Adicionar campo de busca por nome.

# Como rodar o projeto

## Pré-requisitos
- Docker e Docker Compose instalados
- (Opcional para desenvolvimento) Node.js e npm, caso queira rodar o frontend fora do Docker

## 1. Clone o repositório
```bash
git clone <repo-url>
cd <repo-folder>
```

## 2. Suba todos os serviços (backend, frontend e banco de dados)
```bash
docker-compose up -d
```
Isso irá:
- Construir e iniciar o backend Laravel, frontend React e banco MySQL
- Rodar as migrations e popular o banco com 10 usuários automaticamente

## 3. Acesse as aplicações
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000/api/users

## 4. (Opcional) Rodar os testes
### Backend (Laravel)
```bash
docker-compose exec backend php artisan test
```
### Frontend (React)
```bash
cd frontend
npm install
npm test
```

## 5. (Opcional) Rodar o seed manualmente
Se quiser repopular o banco:
```bash
docker-compose exec backend php artisan migrate:fresh --seed
```
