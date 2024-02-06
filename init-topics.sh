#!/bin/bash


echo "Criando tópicos..."

docker-compose exec broker kafka-topics --create --topic posts --partitions 1 --replication-factor 1 --bootstrap-server broker:9092
docker-compose exec broker kafka-topics --create --topic consumer-group --partitions 2 --replication-factor 1 --bootstrap-server broker:9092
docker-compose exec broker kafka-topics --create --topic failed-messages-group --partitions 3 --replication-factor 1 --bootstrap-server broker:9092

echo "Tópicos criados com sucesso!"
