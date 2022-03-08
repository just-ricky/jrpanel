import mongoose from 'mongoose';

const auth0UserSchema = new mongoose.Schema({
  auth0id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  minecraftUuid: {
    type: String,
    required: false,
  },
  minecraftUuidConfirmed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.models.Auth0User ||
  mongoose.model(`Auth0User`, auth0UserSchema);
