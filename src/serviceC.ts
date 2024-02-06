import express from 'express';
import { Kafka } from 'kafkajs';

const app = express();
app.use(express.json());

const port = 3003;

const kafka = new Kafka({
  clientId: 'consumer',
  brokers: ['localhost:9092'],
});

app.listen(port, async () => {

    const consumer = kafka.consumer({ groupId: 'failed-messages-group' });

    const run = async () => {
        await consumer.connect();
        await consumer.subscribe({ topic: 'failed-messages', fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ message }) => {
            console.log(`Mensagem falhada: ${message}`);
            },
        });
    };

    run();

    console.log(`Servidor de log de ERROR: http://localhost:${port}`);
});
