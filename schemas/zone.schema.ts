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

zoneSchema.method('toJSON', function () {
  const { __v, _id, ...data } = this.toObject();
  data.id = _id;
  return data
});
export = model('Zone', zoneSchema);