import { DataTypes, Model } from 'sequelize';
import sequelize from '../lib/database';
import CustomerProfile from './CustomerProfile';
import KycDocument from './KycDocument';

export interface UserAttributes {
  id: number;
  role_group_id: number;
  email: string;
  password: string;
  mobile?: string;
  role_type: 'customer' | 'admin' | 'public';
  is_active: boolean;
  kyc_status: number;
  kyc_reject_message?: string;
  kyc_reject_at?: Date;
  last_login_at?: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  // OTP fields
  otp_code?: string;
  otp_expires_at?: Date;
  otp_type?: 'registration' | 'login' | 'forgot_password';
  // Virtual fields for registration
  first_name?: string;
  last_name?: string;
}

export interface UserCreationAttributes extends Omit<UserAttributes, 'id' | 'created_at' | 'updated_at'> {}

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number;
  declare role_group_id: number;
  declare email: string;
  declare password: string;
  declare mobile?: string;
  declare role_type: 'customer' | 'admin' | 'public';
  declare is_active: boolean;
  declare kyc_status: number;
  declare kyc_reject_message?: string;
  declare kyc_reject_at?: Date;
  declare last_login_at?: Date;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
  declare deleted_at?: Date;

  // OTP fields
  declare otp_code?: string;
  declare otp_expires_at?: Date;
  declare otp_type?: 'registration' | 'login' | 'forgot_password';

  // Virtual fields
  declare first_name?: string;
  declare last_name?: string;

  // Associations
  declare customerProfile?: CustomerProfile;
  declare kycDocuments?: KycDocument[];
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    role_group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'role_groups',
        key: 'id'
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    mobile: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    role_type: {
      type: DataTypes.ENUM('customer', 'admin', 'public'),
      allowNull: false,
      defaultValue: 'customer'
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    kyc_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    kyc_reject_message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    kyc_reject_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    last_login_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    otp_code: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    otp_expires_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    otp_type: {
      type: DataTypes.ENUM('registration', 'login', 'forgot_password'),
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    paranoid: true, // Enable soft deletes
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  }
);

export default User;
