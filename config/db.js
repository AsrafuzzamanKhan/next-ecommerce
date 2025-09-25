import mongoose from "mongoose";
let cache = global.mongoose;
if (!cache) {
  cache = global.mongoose = { conn: null, promise: null };
}
async function connectDB() {
  if (cache.conn) {
    return cache.conn;
  }
  if (!cache.promise) {
    const opts = {
      bufferCommands: false,
    };
    cache.promise = mongoose
      .connect(`${process.env.MONGODB_URI}/ilearningsolutions`, opts)
      .then((mongoose) => {
        return mongoose;
      })
      .catch((err) => console.log(err));
  }
  cache.conn = await cache.promise;
  return cache.conn;
}
export default connectDB;
