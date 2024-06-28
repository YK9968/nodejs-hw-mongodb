import { model, Schema } from 'mongoose';
import { mongooseSaveError } from './hooks.js';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: false,
      default: 'personal',
    },
  },
  { timestamps: true, versionKey: false },
);

contactsSchema.post('save', mongooseSaveError);
contactsSchema.post('findOneAndUpdate', mongooseSaveError);

export const ContactsCollection = model('contacts', contactsSchema);
