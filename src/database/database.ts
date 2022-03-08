import mongoose from 'mongoose';

const connect = () => {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URL!, () => {
      console.log(`Connected to MongoDB`);
    });
  }
};

export { connect };
