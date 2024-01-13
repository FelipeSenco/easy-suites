import { ConnectionPool } from "mssql";

export class SqlServerRepository {
  private pool: ConnectionPool;

  constructor(connectionString: string) {
    this.pool = new ConnectionPool(connectionString);
  }

  async connect() {
    await this.pool.connect();
  }

  async executeStoredProcedure(
    procName: string,
    parameters: ProcParameter[] = []
  ) {
    await this.connect();
    const request = this.pool.request();

    // Add parameters if they exist
    parameters.forEach((param) => {
      request.input(param.name, param.type, param.value);
    });

    const result = await request.execute(procName);
    return result.recordset;
  }
}

type ProcParameter = {
  name: string;
  type: any;
  value: any;
};
