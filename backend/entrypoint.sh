#!/bin/sh

set -e

# Espera o MySQL estar pronto usando php
until php -r "
\$host = getenv('DB_HOST');
\$port = getenv('DB_PORT');
\$socket = @fsockopen(\$host, \$port, \$errno, \$errstr, 5);
if (\$socket) {
    fclose(\$socket);
    exit(0);
} else {
    exit(1);
}
"; do
  echo "Aguardando o banco de dados MySQL em $DB_HOST:$DB_PORT..."
  sleep 2
done

# Garante que o .env existe
if [ ! -f .env ]; then
  cp .env.example .env
fi

# Instala dependências do composer (caso não estejam instaladas)
composer install --no-interaction --prefer-dist --optimize-autoloader

# Gera a key do Laravel
php artisan key:generate --force

# Roda migrations e seeds
php artisan migrate:fresh --seed --force

# Sobe o servidor
php artisan serve --host=0.0.0.0 --port=8000 