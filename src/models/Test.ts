import { DataTypes, Model } from 'sequelize';
import sequelize from '../lib/database';

export interface TestAttributes {
  id: string;
  name: string;
  description?: string;
  value: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestCreationAttributes extends Omit<TestAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Test extends Model<TestAttributes, TestCreationAttributes> {
  declare id: string;
  declare name: string;
  declare description?: string;
  declare value: number;
  declare isActive: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Test.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => {
        // Generate a simple cuid-like string (you might want to use a proper cuid library)
        return 'c' + Date.now().toString(36) + Math.random().toString(36).substr(2);
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    value: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Test',
    tableName: 'tests',
    timestamps: true,
  }
);

export default Test;
