import mongoose from 'mongoose';

const connect = () => {
  const url: string | undefined = process.env.MONGO_URL;

  if (!url) {
    console.error(`Mongo URL is undefined!`);
    return;
  }

  if (!mongoose.connections[0].readyState) {
    mongoose.connect(url, () => {
      console.log(`Connected to MongoDB`);
    });
  }
};

export { connect };
