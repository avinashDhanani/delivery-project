import { DataTypes, Model } from 'sequelize';
import sequelize from '../lib/database';
import User from './User';

export interface CustomerProfileAttributes {
  id: number;
  user_id: number;
  company_name?: string;
  gst_no?: string;
  address?: string;
  city?: string;
  zip_code?: string;
  kyc_status: 'Pending' | 'Approved' | 'Rejected';
  credit_limit: number;
  wallet_balance: number;
  terms_agreed: boolean;
  terms_agreed_at?: Date;
  ref_name?: string;
  ref_mobile?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface CustomerProfileCreationAttributes extends Omit<CustomerProfileAttributes, 'id'> {}

class CustomerProfile extends Model<CustomerProfileAttributes, CustomerProfileCreationAttributes> {
  declare id: number;
  declare user_id: number;
  declare company_name?: string;
  declare gst_no?: string;
  declare address?: string;
  declare city?: string;
  declare zip_code?: string;
  declare kyc_status: 'Pending' | 'Approved' | 'Rejected';
  declare credit_limit: number;
  declare wallet_balance: number;
  declare terms_agreed: boolean;
  declare terms_agreed_at?: Date;
  declare ref_name?: string;
  declare ref_mobile?: string;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;

  // Associations
  declare user?: User;
}

CustomerProfile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    company_name: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    gst_no: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    zip_code: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    kyc_status: {
      type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
      allowNull: false,
      defaultValue: 'Pending'
    },
    credit_limit: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    wallet_balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    terms_agreed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    terms_agreed_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ref_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ref_mobile: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'CustomerProfile',
    tableName: 'customer_profiles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export default CustomerProfile;
