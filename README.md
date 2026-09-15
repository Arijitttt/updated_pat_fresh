# Client Product Catalogue Website

A modern, responsive product catalogue website built with **Next.js, React, TypeScript, and Tailwind CSS**.

The website is designed for a business that maintains a large catalogue of products such as fish, seafood, vegetables, fruits, grocery items, chocolates, beverages, and other food products.

The primary purpose of the website is to allow customers to:

- Browse available products
- Explore products by category
- Search and filter products
- View detailed product information
- Learn about the business
- Contact the business

This project is intentionally designed as a **product information and catalogue platform**, rather than a full e-commerce application. There is currently no shopping cart, online checkout, or payment gateway.

---

# Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Why Next.js](#why-nextjs)
- [Next.js Architecture](#nextjs-architecture)
- [Project Structure](#project-structure)
- [App Router](#app-router)
- [Routing](#routing)
- [Dynamic Routes](#dynamic-routes)
- [Components](#components)
- [Data Flow](#data-flow)
- [Rendering Strategy](#rendering-strategy)
- [Client Components](#client-components)
- [Styling](#styling)
- [Animations](#animations)
- [Image Optimization](#image-optimization)
- [SEO and Metadata](#seo-and-metadata)
- [404 Handling](#404-handling)
- [Responsive Design](#responsive-design)
- [Product Catalogue](#product-catalogue)
- [Category System](#category-system)
- [Contact System](#contact-system)
- [Site Configuration](#site-configuration)
- [Installation](#installation)
- [Development](#development)
- [Production Build](#production-build)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Performance](#performance)
- [Security](#security)
- [Scalability](#scalability)
- [Future Improvements](#future-improvements)
- [License]

---

# Project Overview

The application is a modern product catalogue website developed using the **Next.js App Router**.

The website provides a structured way to present a large number of products without requiring an online ordering system.

The current architecture focuses on:

1. Fast page loading
2. SEO-friendly pages
3. Responsive UI
4. Reusable React components
5. Dynamic product and category pages
6. Optimized images
7. Smooth animations
8. Simple content management
9. Easy future expansion

---

# Features

## Homepage

The homepage provides an overview of the business and highlights important product categories.

Main sections include:

- Hero section
- Business introduction
- Category navigation
- Featured products
- Recently listed products
- Business features
- Call-to-action section
- Footer

---

## Product Catalogue

Users can browse the complete product catalogue.

Each product can contain:

- Product name
- Category
- Product image
- Description
- Origin
- Availability
- Additional product information

---

## Category Filtering

Products can be organized into categories such as:

```text
Fish & Seafood
Vegetables
Fruits
Grocery & Grains
Chocolates
Beverages
