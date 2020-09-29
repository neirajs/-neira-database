import {Table} from "./Table";

interface ForeignKey {
  constraint_name?: string;
  name: string;
  reference: Table;
}

export abstract class Field {
  private _primaryKey: boolean;
  private _unique: boolean;
  private _notNull: boolean;
  private _foreignKey: ForeignKey | void;
  private _name: string;
  abstract getType(): string;

  constructor(name: string) {
    this._name = name;
    this._primaryKey = false;
    this._unique = false;
    this._notNull = false;
    this._foreignKey = null;
  }

  public unique() {
    this._unique = true;
    return this;
  }

  public primaryKey() {
    this._primaryKey = true;
    return this;
  }

  public notNull() {
    this._notNull = true;
    return this;
  }

  public foreignKey() {
    throw new Error('not implemented');
  }

  public toString(): string {
    let str = `${this._name} ${this.getType()}`; 

    if (this._primaryKey) {
      str += ' PRIMARY KEY';
    } else {
      
      if (this._unique) {
        str += ' UNIQUE';
      }

      if (this._notNull) {
        str += ' NOT NULL';
      }
    }

    return str;
  }

  public getAdditionalConstraintString(): string {
    if (!this._foreignKey) {
      return '';
    }

    const foreignKey = this._foreignKey;

    return `CONSTRAINT ${foreignKey.constraint_name || ''} FOREIGN KEY(${foreignKey.name}) REFERENCES ${foreignKey.reference.name}(id)`;
  }
}

export class StringField extends Field {
  private _type = 'VARCHAR';
  private _length = 255;
  
  public length(length: number) {
    this._length = length; 
  }

  public getType(): string {
    return `${this._type}(${this._length})`
  }
}
