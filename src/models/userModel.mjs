import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  dob: Date,
});

export default mongoose.model('User', userSchema);
