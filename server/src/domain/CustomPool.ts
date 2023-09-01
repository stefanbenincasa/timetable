import { Pool, PoolConfig, PoolClient, QueryResult } from 'pg';

export class CustomPool extends Pool {
  constructor(config?: PoolConfig) {
    super(config);
  }

  async queryWithParams(queryText: string, values?: any[]): Promise<QueryResult> {
		const client: PoolClient = await this.connect();
    try {
      const result: QueryResult = await client.query(queryText, values);
			client.release();
      return result;
    } finally {
      client.release();
    }
  }
}

