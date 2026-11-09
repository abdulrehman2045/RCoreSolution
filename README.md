# RCore Solutions: full-stack website

React frontend + Express API + MongoDB Atlas.

```
rcore/
├── client/   React (Vite) website and admin panel
└── server/   Express REST API (MongoDB / Mongoose)
```

## What it does

**Visitors**
- Browse services, products and industries (services and products come from the database)
- Send a message through the contact form (works for guests too)
- Sign up / log in, write one review, see their own messages, change name and password

**Admin** (`/admin`)
- Dashboard with counts
- Services: add, edit, delete
- Products: add, edit, delete
- Users: add, edit (role, active, password), delete
- Reviews: hide / show, delete
- Messages: read, mark as new / read / replied, reply by email, delete
- Website settings: site name, home headline and intro, email, phone, WhatsApp, business hours, footer text, social links, default SEO description

## Setup

You need Node.js 18.11 or newer.

### 1. MongoDB Atlas

1. Create a free cluster on https://cloud.mongodb.com
2. **Database Access** → add a database user (username + password)
3. **Network Access** → add your IP address (use `0.0.0.0/0` for hosting platforms)
4. **Connect → Drivers** → copy the connection string

### 2. Backend

```bash
cd server
npm install
cp .env.example .env     # then open .env and fill in the values
npm run seed             # adds your current services/products + creates the admin account
npm run dev              # API on http://localhost:5000/api
```

Important values in `server/.env`:

| Variable | Meaning |
| --- | --- |
| `MONGODB_URI` | Atlas connection string (put your database name before the `?`, e.g. `.../rcore?...`) |
| `JWT_SECRET` | Long random string. Keep it private |
| `CLIENT_URL` | Frontend address allowed to call the API |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Your first admin login, created by `npm run seed` |

`npm run seed` is safe to run again: it only adds what is missing and never overwrites your edits.

### 3. Frontend

```bash
cd client
npm install
npm run dev              # http://localhost:5173
```

In development Vite forwards `/api` requests to `http://localhost:5000`, so no extra config is needed.

Log in at `/login` with the admin email and password, then open `/admin`.

## API overview

All routes start with `/api`. "Admin" routes need a logged-in admin (`Authorization: Bearer <token>`).

| Route | Access |
| --- | --- |
| `POST /auth/register`, `POST /auth/login` | Public |
| `GET /auth/me`, `PATCH /auth/me`, `PATCH /auth/password` | Logged in |
| `GET /services`, `GET /products` | Public |
| `POST /services`, `PUT /services/:id`, `DELETE /services/:id` (same for `/products`) | Admin |
| `GET /reviews` | Public (approved only) |
| `POST /reviews`, `DELETE /reviews/:id` | Logged in (delete: author or admin) |
| `GET /reviews/admin/all`, `PATCH /reviews/:id/approval` | Admin |
| `POST /messages` | Public (rate limited) |
| `GET /messages/mine` | Logged in |
| `GET /messages`, `PATCH /messages/:id/status`, `DELETE /messages/:id` | Admin |
| `GET /users`, `POST /users`, `PUT /users/:id`, `DELETE /users/:id` | Admin |
| `GET /settings` | Public |
| `PUT /settings`, `GET /stats` | Admin |

## Deploying

**Backend** (Render, Railway, etc.)
- Root directory: `server`, build command: `npm install`, start command: `npm start`
- Set the environment variables from `.env.example`. Set `CLIENT_URL` to your website address.
- Run `npm run seed` once (locally, pointing at the same Atlas database, is fine).

**Frontend** (Vercel)
- Root directory: `client`
- Set `VITE_API_URL` to `https://<your-backend>/api` and `SITE_URL` to your website address.
- `vercel.json` already sends every route to `index.html`.

## Code guide

**Server** (`server/src`)
- `models/` Mongoose schemas · `validators/` input rules (zod) · `controllers/` request logic
- `routes/` URL wiring · `middleware/` auth, validation, rate limits, errors
- `seed/` one-time data import

Services and products share one schema, controller and router (`catalogFields.js`, `catalogController.js`, `catalogRoutes.js`), so a fix in one place applies to both.

**Client** (`client/src`)
- `api/` all HTTP calls · `context/` login state and website data
- `pages/` public pages · `pages/admin/` admin screens · `components/` shared UI
- `hooks/` reusable logic for the admin forms and lists

**Adding an icon for services/products:** import it in `client/src/lib/icons.js` and add it to the `ICONS` object. It then appears in the admin icon dropdown.

**Industries** are still static (`client/src/data/content.js`), as before. They can be moved into the database the same way services were if you need to edit them from the admin panel.
