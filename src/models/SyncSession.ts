import mongoose from 'mongoose';

export type ISyncSession = {
  auth0id: string;
  code: string;
};

const syncSessionSchema = new mongoose.Schema({
  auth0id: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

export default mongoose.models.SyncSession ||
  mongoose.model(`SyncSession`, syncSessionSchema);
