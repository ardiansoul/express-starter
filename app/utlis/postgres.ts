import {Pool, } from "pg"

export interface IDatabaseFactory {
  query: 
}


class PostgresFactory implements IDatabaseFactory {
  constructor() {}

  query(query, params) {
    const pool = new Pool()
    pool.connect()

    pool.query

    console.log("query");
  }

  transaction() {
    console.log("transaction");
  }
}
