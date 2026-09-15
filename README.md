# Fresh Product Catalogue Website

A modern, responsive product catalogue website built for a local food and grocery business using **Next.js, React, TypeScript, and Tailwind CSS**.

The website allows customers to explore a large collection of products, browse products by category, view detailed product information, and contact the business.

This is primarily an **information and product catalogue website**. It does not currently include online ordering, shopping cart, checkout, or payment processing.

---

## ✨ Features

- 🏠 Modern responsive homepage
- 📦 Large product catalogue
- 🗂️ Category-based product browsing
- 🔍 Product search and filtering
- 📄 Individual product detail pages
- 🖼️ Optimized product and category images
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS
- ✨ Smooth animations with Framer Motion
- 📞 Contact page and enquiry form
- 🔗 Dynamic product and category URLs
- ❌ Custom 404 page
- 🚀 SEO-friendly Next.js architecture

---

## 🛍️ Product Categories

The catalogue is organized into different product categories, including:

- Fish & Seafood
- Vegetables
- Fruits
- Grocery & Grains
- Chocolates
- Beverages

The category structure can be extended easily as the business adds new product types.

---

# 🧑‍💻 Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js** | React framework and application architecture |
| **React** | UI development |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling and responsive design |
| **Framer Motion** | Animations and transitions |
| **Next/Image** | Image optimization |
| **Next/Link** | Client-side navigation |
| **Git/GitHub** | Version control |

---

# ⚡ Why Next.js?

Next.js is used as the main framework because this project contains many product and category pages that benefit from a structured routing system and good performance.

Important Next.js features used in the project include:

- App Router
- File-based routing
- Dynamic routes
- Server Components
- Client Components
- Metadata
- Image Optimization
- `next/link`
- Custom 404 pages
- Production optimization

---

# 🏗️ Project Architecture

The application follows a component-based Next.js architecture.

```text
                         WEBSITE
                            │
                            ▼
                         Next.js
                            │
                    ┌───────┴───────┐
                    │               │
                 App Router      Components
                    │               │
          ┌─────────┼─────────┐     │
          │         │         │     │
       Products  Categories  Contact │
          │         │               │
          ▼         ▼               ▼
      Product    Category       Reusable UI
       Pages       Pages
