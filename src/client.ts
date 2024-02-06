import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'likes-producer',
  brokers: ['localhost:9092'],
});

const likesProducer = kafka.producer();

const run = async () => {
  await likesProducer.connect();

  // Publica mensagens no tópico 'likes'
  await likesProducer.send({
    topic: 'likes',
    messages: [
      { value: '1' }, // ID do post que está sendo curtido
      // Adicione mais mensagens conforme necessário
    ],
  });

  await likesProducer.disconnect();
};

run();
