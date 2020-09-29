import {Field, StringField} from './Field'

export class Table {
  public name: string;
  private fields = new Map<string, Field>();  

  public string(name: string): StringField {
    // prevent duplicate
    if (this.fields.has(name)) {
      throw new Error(`duplicate field ${name}`);
    }

    const field = new StringField(name);
    this.fields.set(name, field);
    return field;
  }

  public toString(): string {
    const fields = [];
    this.fields.forEach((field) => {
      fields.push(field.toString());
    });

    return fields.join(', ');
  }
}
