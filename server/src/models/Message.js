import mongoose from 'mongoose';

export const MESSAGE_STATUSES = ['new', 'read', 'replied'];

const messageSchema = new mongoose.Schema(
  {
    // Set when the sender was logged in, null for guests.
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: '', trim: true },
    business: { type: String, default: '', trim: true },
    service: { type: String, default: '', trim: true },
    budget: { type: String, default: '', trim: true },
    details: { type: String, required: true, trim: true, maxlength: 3000 },
    status: { type: String, enum: MESSAGE_STATUSES, default: 'new' },
  },
  { timestamps: true },
);

export const Message = mongoose.model('Message', messageSchema);
