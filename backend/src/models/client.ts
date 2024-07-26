'use strict';
import { Model, DataTypes, CreationOptional } from 'sequelize';
import { connection } from '../config';

export interface ClientAttributes {
  id?: number;
  name: string;
  dob: Date;
  mainLanguage: string;
  secondaryLanguage?: string;
  fundingSource: 'NDIS' | 'HCP' | 'CHSP' | 'DVA' | 'HACC';
}

export class Client extends Model<ClientAttributes> implements ClientAttributes {
  declare id: number;
  declare name: string;
  declare dob: Date;
  declare mainLanguage: string;
  declare secondaryLanguage: string;
  declare fundingSource: 'NDIS' | 'HCP' | 'CHSP' | 'DVA' | 'HACC';

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    mainLanguage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secondaryLanguage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fundingSource: {
      type: DataTypes.ENUM('NDIS', 'HCP', 'CHSP', 'DVA', 'HACC'),
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    tableName: 'clients',
    modelName: 'Client',
  }
);

export default Client;