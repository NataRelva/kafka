# **Simples projeto com Kafka**

Esse projeto visa implementar um caso de uso simples com o recurso da interface RESTfull para o clust kafka.

Será precisara iniciar o projeto com:
```bash
  docker-compose up -d
```
Depois execute o script *init-topics.sh*

```bash
  chmod +x ./init-topics.sh && ./init-topics.sh
```

## Endpoint
>/post

type: POST
payload: JSON 
```json
{
  "message": "qualquer menssagem para postar nos post"
}
```

Com essa rota é possível cadastra uma messagem em um tópico post e ele ser consumido por outros serviçoes que escutam a rota.
