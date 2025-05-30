import mongoose from "mongoose";

const ClinicSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    season: { type: String, required: true },
    type: { type: String, required: true },
    symptoms: { type: [String], required: true },
    treatments: { type: [String], required: true },
    caringMethods: { type: [String], required: true },
    fertilizers: { type: [{ name: String, amount: String }], required: true },
});

const Clinic = mongoose.model("Clinic", ClinicSchema);
export default Clinic;
