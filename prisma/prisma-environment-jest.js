import { TestEnvironment } from 'jest-environment-node';
import { v4 as uuid } from 'uuid';
import { execSync } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Client } from 'pg';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prismaCli = resolve(__dirname, '..', 'node_modules', '.bin', 'prisma');

dotenv.config({
  path: resolve(__dirname, '..', '.env.test'),
});

class CustomEnvironment extends TestEnvironment {
  constructor(config) {
    super(config);
    this.schema = `code_schema_${uuid()}`;
    console.log('schemas', this.schema);
    this.connectionString = `${process.env.DATABASE_URL}${this.schema}`;
  }

  setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    // Rodar as migrations
    execSync(`${prismaCli} migrate dev`);
  }

  async teardown() {
    const client = new Client({
      connectionString: this.connectionString,
    });

    await client.connect();
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
    await client.end();
  }
}

export default CustomEnvironment;
