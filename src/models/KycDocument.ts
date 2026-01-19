import { DataTypes, Model } from 'sequelize';
import sequelize from '../lib/database';
import User from './User';

export interface KycDocumentAttributes {
  id: number;
  user_id: number;
  doc_type: string;
  file_path: string;
  uploaded_at: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface KycDocumentCreationAttributes extends Omit<KycDocumentAttributes, 'id'> {}

class KycDocument extends Model<KycDocumentAttributes, KycDocumentCreationAttributes> {
  declare id: number;
  declare user_id: number;
  declare doc_type: string;
  declare file_path: string;
  declare uploaded_at: Date;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
  declare deleted_at?: Date;

  // Associations
  declare user?: User;
}

KycDocument.init(
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
      references: {
        model: 'users',
        key: 'id'
      }
    },
    doc_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: 'Aadhaar_Front, Aadhaar_Back, PAN, etc.'
    },
    file_path: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    uploaded_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
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
    }
  },
  {
    sequelize,
    modelName: 'KycDocument',
    tableName: 'kyc_documents',
    timestamps: true,
    paranoid: true, // Enable soft deletes
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  }
);

export default KycDocument;
