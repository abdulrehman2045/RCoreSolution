import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { slugify } from '../utils/slugify.js';

const buildPayload = ({ slug, ...fields }) => ({
  ...fields,
  slug: slugify(slug || fields.name),
});

/**
 * Builds the CRUD handlers for a catalog model.
 * Services and products are identical apart from their model and label.
 */
export function createCatalogController(Model, label) {
  const findOr404 = (item) => {
    if (!item) throw new ApiError(404, `${label} not found.`);
    return item;
  };

  const list = asyncHandler(async (_req, res) => {
    const items = await Model.find().sort({ order: 1, createdAt: 1 });
    res.json({ items });
  });

  const create = asyncHandler(async (req, res) => {
    const item = await Model.create(buildPayload(req.body));
    res.status(201).json({ item });
  });

  const update = asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndUpdate(req.params.id, buildPayload(req.body), {
      new: true,
      runValidators: true,
    });
    res.json({ item: findOr404(item) });
  });

  const remove = asyncHandler(async (req, res) => {
    findOr404(await Model.findByIdAndDelete(req.params.id));
    res.json({ message: `${label} deleted.` });
  });

  return { list, create, update, remove };
}
