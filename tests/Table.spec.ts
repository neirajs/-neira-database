import {assert, expect} from "chai";
import {Table} from "../src/Table";

describe(
	"Table Test",
	() => {
		it(
			"string field",
			() => {
				const table = new Table();
				table.string("name");
				expect(table.toString()).eq("name VARCHAR(255)");

				table.string("title").length(20);
				expect(table.toString()).eq("name VARCHAR(255), title VARCHAR(20)");

				table.string("job_title").primaryKey();
				expect(table.toString()).eq(
					"name VARCHAR(255), title VARCHAR(20), job_title VARCHAR(255) PRIMARY KEY",
				);

				table.string("unique").notNull().unique();
				expect(table.toString()).eq(
					"name VARCHAR(255), title VARCHAR(20), job_title VARCHAR(255) PRIMARY KEY, unique VARCHAR(255) UNIQUE NOT NULL",
				);
			},
		);

		it(
			"duplicate key",
			() => {
				const table = new Table();
				table.string("name");
				assert.throw(() => {
					table.string("name");
				});
			},
		);
	},
);
