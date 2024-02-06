import express from 'express';
import { Kafka } from 'kafkajs';

const app = express();
app.use(express.json());

const port = 3002;

const kafka = new Kafka({
  clientId: 'consumer',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'consumer-group' });


app.listen(port, async () => {

    await consumer.connect();
    await consumer.subscribe({ topic: 'posts', fromBeginning: true });

    const messages: Array<any> = [];
    await consumer.run({

        eachMessage: async ({ message }) => {
            messages.push(message.value);
            console.log(`Mensagem recebida: ${message.value}`);
        } 
    });

    console.log(`Servidor de consumo e likes rodando em http://localhost:${port}`);
});
