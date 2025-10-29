import mongoose from 'mongoose';

const superheroeSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  alias: { type: String },
  poder: { type: String },
  nivel: { type: Number, default: 1 }
});

export const Superheroe = mongoose.model('Superheroe', superheroeSchema);
