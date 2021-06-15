docker run -d \
    --name pix-postgres \
    -e POSTGRES_PASSWORD=pix-postgres \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -v /custom/mount:/var/lib/postgresql/data \
    -p 5432:5432 \
    postgres

docker ps # lista os containers ativos
docker stop # para containers ativos

docker build -t app pix_challenge

docker run \
    --name app \
    --link pix-postgres \
    -e PG_URL=pix-postgres \
    -e PORT=3000 \
    -p 3000:3000 \
    app