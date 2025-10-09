import mongoose from "mongoose";
const addressSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    pincode: { type: Number, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
  },
  { timestamps: true }
);
// Use lowercase model name to match other models' naming convention and refs
const Address =
  mongoose.models.address || mongoose.model("address", addressSchema);
export default Address;
