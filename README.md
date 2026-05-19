# 🛍️ ShopHub

A modern full-stack e-commerce application built with **Next.js 15**, featuring authentication, product browsing, favorites, and a shopping cart.

---

## 🚀 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 15** | Full-stack React framework (App Router) |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **NextAuth.js (v5 beta)** | Authentication (Facebook) |
| **Zustand** | Cart state management |
| **DummyJSON API** | Products & categories data |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx               # Home page
│   ├── layout.tsx             # Root layout
│   ├── products/
│   │   ├── page.tsx           # Products listing
│   │   └── [id]/
│   │       └── page.tsx       # Product details
│   ├── categories/
│   │   ├── layout.tsx         # Categories layout
│   │   ├── page.tsx           # All categories
│   │   └── electronics/
│   │       └── page.tsx       # Category page
│   ├── cart/
│   │   └── page.tsx           # Shopping cart
│   ├── checkout/
│   │   └── page.tsx           # Checkout page
│   ├── favorites/
│   │   └── page.tsx           # Favorites page
│   ├── profile/
│   │   └── page.tsx           # User profile
│   ├── access-denied/
│   │   └── page.tsx           # Access denied page
│   └── api/
│       └── auth/
│           └── [...nextauth]/
│               └── route.ts   # NextAuth route handler
├── components/
│   ├── Navigation.tsx         # Navbar with cart & auth
│   ├── ProductCard.tsx        # Product card component
│   ├── ProductList.tsx        # Products grid
│   ├── AddToCart.tsx          # Add to cart button
│   ├── Filter.tsx             # Category filter
│   ├── Search.tsx             # Search component
│   └── Spinner.tsx            # Loading spinner
├── store/
│   └── cartStore.ts           # Zustand cart store
├── types/
│   └── product.ts             # TypeScript interfaces
└── auth.ts                    # NextAuth config
```

---

## ✨ Features

### 🔐 Authentication
- Facebook OAuth login via NextAuth.js
- Protected routes (Cart, Checkout, Profile)
- Middleware for route protection
- Auto redirect to Access Denied page

### 🛒 Shopping Cart
- Add/remove products
- Increase/decrease quantity
- Real-time total calculation
- Persists during session via Zustand
- Cart icon with item count in navbar

### 🏷️ Products
- Browse all products from DummyJSON API
- Filter by category
- Search by name
- Product detail page with images & info
- Favorites system (localStorage)

### 🏠 Home Page
- Hero section
- Featured products (8 items)
- Category grid
- Server-side data fetching

---

## ⚙️ Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/shophub.git
cd shophub
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```env
AUTH_SECRET=your_secret_here
FACEBOOK_CLIENT_ID=your_facebook_app_id
FACEBOOK_CLIENT_SECRET=your_facebook_app_secret
```

To generate `AUTH_SECRET`:
```bash
npx auth secret
```

To get Facebook credentials:
1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Create a new app → Consumer
3. Add **Facebook Login** product
4. Set redirect URI to: `http://localhost:3000/api/auth/callback/facebook`
5. Copy **App ID** and **App Secret**

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🌐 API

This project uses [DummyJSON](https://dummyjson.com) as the products API:

| Endpoint | Description |
|----------|-------------|
| `GET /products?limit=0` | All products |
| `GET /products/:id` | Single product |
| `GET /products/categories` | All categories |
| `GET /products?limit=6` | Featured products |

---

## 🔒 Protected Routes

The following routes require authentication:

- `/cart` — Shopping cart
- `/checkout` — Checkout page

Unauthenticated users are redirected to `/access-denied`.

---

## 📦 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

MIT License © 2026 ShopHub
