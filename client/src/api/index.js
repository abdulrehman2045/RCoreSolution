import { http } from './http.js';

/** list / create / update / remove for a REST resource such as "/services". */
const createCrudApi = (basePath) => ({
  list: () => http.get(basePath),
  create: (body) => http.post(basePath, body),
  update: (id, body) => http.put(`${basePath}/${id}`, body),
  remove: (id) => http.delete(`${basePath}/${id}`),
});

export const servicesApi = createCrudApi('/services');
export const productsApi = createCrudApi('/products');
export const usersApi = createCrudApi('/users');

export const authApi = {
  register: (details) => http.post('/auth/register', details),
  login: (credentials) => http.post('/auth/login', credentials),
  me: () => http.get('/auth/me'),
  updateProfile: (details) => http.patch('/auth/me', details),
  changePassword: (passwords) => http.patch('/auth/password', passwords),
};

export const reviewsApi = {
  list: () => http.get('/reviews'),
  listAll: () => http.get('/reviews/admin/all'),
  create: (review) => http.post('/reviews', review),
  setApproval: (id, isApproved) => http.patch(`/reviews/${id}/approval`, { isApproved }),
  remove: (id) => http.delete(`/reviews/${id}`),
};

export const messagesApi = {
  send: (message) => http.post('/messages', message),
  listMine: () => http.get('/messages/mine'),
  list: () => http.get('/messages'),
  setStatus: (id, status) => http.patch(`/messages/${id}/status`, { status }),
  remove: (id) => http.delete(`/messages/${id}`),
};

export const settingsApi = {
  get: () => http.get('/settings'),
  update: (settings) => http.put('/settings', settings),
};

export const statsApi = {
  get: () => http.get('/stats'),
};
