import { Schema, model } from 'mongoose';
import { Zone } from '../interfaces';

const zoneSchema = new Schema<Zone>({
  code: {
    type: Number,
    required: true,
  },
  central: {
    type: String,
    required: true,
  },
  zone: {
    type: String,
    required: true,
  },
  locality: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
});

export = model('Zone', zoneSchema);