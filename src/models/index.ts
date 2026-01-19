// Model associations and exports
import User from './User';
import CustomerProfile from './CustomerProfile';
import KycDocument from './KycDocument';
import Test from './Test';

// User associations
User.hasOne(CustomerProfile, {
  foreignKey: 'user_id',
  as: 'customerProfile',
  onDelete: 'CASCADE'
});

User.hasMany(KycDocument, {
  foreignKey: 'user_id',
  as: 'kycDocuments',
  onDelete: 'CASCADE'
});

// CustomerProfile associations
CustomerProfile.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

// KycDocument associations
KycDocument.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

export { User, CustomerProfile, KycDocument, Test };
