import mongoose from 'mongoose';

export type IMinecraftUser = {
  auth0id: string;
  email: string;
  minecraft: {
    uuid: string | null;
    accountSynced: boolean;
    rank: string | null;
  };
};

const minecraftUserSchema = new mongoose.Schema({
  auth0id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  minecraft: {
    uuid: {
      type: String,
      required: false,
    },
    accountSynced: {
      type: Boolean,
      required: true,
      default: false,
    },
    rank: {
      type: String,
      required: false,
    },
  },
});

export default mongoose.models.MinecraftUser ||
  mongoose.model(`MinecraftUser`, minecraftUserSchema);
