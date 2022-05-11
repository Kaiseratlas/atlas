import { registerAs } from '@nestjs/config';

export default registerAs('elasticsearch', () => ({
  hosts: process.env.ELASTICSEARCH_HOSTS ?? 'http://localhost:9200',
}));
