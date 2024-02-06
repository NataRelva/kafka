import express from 'express';
import axios from 'axios';

const app = express();
const port = 3001;

app.use(express.json());

app.post('/publish', async (req, res) => {
  const { message } = req.body;

  try {
    // Se o processamento for bem-sucedido, publique no tópico 'posts'
    await axios.post('http://localhost:8082/topics/posts', {
      records: [{ value: message }],
    }, {
      headers: {
        'Content-Type': 'application/vnd.kafka.json.v2+json',
      },
    });

    res.status(200).json({ success: true, message: 'Post publicado com sucesso!' });
  } catch (error) {

    // Em caso de falha, publique a mensagem no tópico de falhas 'failed-messages'
    await axios.post('http://localhost:8082/topics/failed-messages', {
      records: [{ value: message }],
    }, {
      headers: {
        'Content-Type': 'application/vnd.kafka.json.v2+json',
      },
    });

    res.status(500).json({ success: false, error: 'Erro ao processar o post. A mensagem foi enviada para o tópico de falhas.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor de publicação de posts rodando em http://localhost:${port}`);
});
