import { SqlTypes } from "@/app/enums/enums";
import { ConnectionPool } from "mssql";
import sql from "mssql";

export class SqlServerRepository {
  private pool: ConnectionPool;

  constructor(connectionString: string) {
    this.pool = new ConnectionPool(connectionString);
  }

  async connect() {
    await this.pool.connect();
  }

  async executeStoredProcedure(procName: string, parameters: ProcParameter[] = []) {
    await this.connect();
    const request = this.pool.request();

    // Add parameters if they exist
    parameters.forEach((param) => {
      request.input(param.name, this.getSqlType(param.type), param.value);
    });

    const result = await request.execute(procName);
    return result.recordset;
  }

  getSqlType(type: SqlTypes) {
    switch (type) {
      case SqlTypes.Money:
        return sql.Money;
      case SqlTypes.Int:
        return sql.Int;
      case SqlTypes.Varchar:
        return sql.VarChar;
      case SqlTypes.DateTime:
        return sql.DateTime;
      case SqlTypes.SmallInt:
        return sql.SmallInt;
      case SqlTypes.TinyInt:
        return sql.TinyInt;
      default:
        return sql.VarChar;
    }
  }
}

type ProcParameter = {
  name: string;
  type: any;
  value: any;
};
