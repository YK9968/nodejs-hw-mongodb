import { model, Schema } from 'mongoose';
import { mongooseSaveError } from './hooks.js';
import { typeList } from '../../constants/contacts-constants.js';

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
      enum: typeList,
      required: false,
      default: 'personal',
    },
    photo: { type: String },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

contactsSchema.post('save', mongooseSaveError);
contactsSchema.post('findOneAndUpdate', mongooseSaveError);

export const ContactsCollection = model('contacts', contactsSchema);
