import { getSettings } from '../models/Setting.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const readSettings = asyncHandler(async (_req, res) => {
  res.json({ settings: await getSettings() });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const settings = await getSettings();
  settings.set(req.body);
  await settings.save();
  res.json({ settings });
});
