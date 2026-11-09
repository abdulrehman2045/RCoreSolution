import { Message } from '../models/Message.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/** Anyone can send a message. If they are logged in, it is linked to their account. */
export const createMessage = asyncHandler(async (req, res) => {
  const item = await Message.create({ ...req.body, user: req.user?._id ?? null });
  res.status(201).json({ item });
});

export const listMyMessages = asyncHandler(async (req, res) => {
  const items = await Message.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ items });
});

export const listAllMessages = asyncHandler(async (_req, res) => {
  const items = await Message.find().sort({ createdAt: -1 });
  res.json({ items });
});

export const setMessageStatus = asyncHandler(async (req, res) => {
  const item = await Message.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true },
  );
  if (!item) throw new ApiError(404, 'Message not found.');
  res.json({ item });
});

export const deleteMessage = asyncHandler(async (req, res) => {
  const item = await Message.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, 'Message not found.');
  res.json({ message: 'Message deleted.' });
});
