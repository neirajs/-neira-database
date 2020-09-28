import {expect} from "chai";
import { Table } from '../src/Table';

describe("Table Test", () => {
  it("table with string field", () => {
    const table = new Table();
    // @ts-expect-error
    table.toString('name');
    expect(table.toString()).eq('name VARCHAR(255)')
  })
});
