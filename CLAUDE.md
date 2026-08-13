# CLAUDE.md — Developer Portfolio Refactor Guide
## Code Rules

- No verbose comments — only add comments where logic is non-obvious
- No emojis in code or comments
- Do not create markdown files unless explicitly asked

## 1. Project Goal & Design Reference
Refactor the existing developer portfolio hosted at [tamminga.budds@vercel.app](https://tammingabudds.vercel.app) to adopt the modern dark UI aesthetic, high-contrast typography, and component layout of the Xabed template (reference: [https://xabed.framer.website/](https://xabed.framer.website/)).

## 2. Core Architecture & Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS with dark theme, custom neon accents, subtle glow/hover effects, and clean card borders.
- **CMS**: Payload CMS (Headless) integrated for dynamic content management.
- **Deployment**: Vercel

## 3. Key Pages & Sections to Build/Refactor
- **Hero Section**: High-impact headline ("Full-Stack / Software Engineer"), concise bio, CTA buttons ("Lets Talk", "Download CV"), and tech stack highlights.
- **Interactive Tech Stack Grid**: Categorized cards (Frontend, Backend, DevOps, Tools) with icons and skill descriptions.
- **Featured Projects & Gallery**: Case studies with tech tags, descriptions, live demo links, and GitHub links.
- **Pricing & Services Section**: Tiered service cards (Fixed MVP Build, Sprint Retainer, Consulting) outlining deliverables, rates, and booking CTAs.
- **Experience Timeline**: Vertical timeline for work history and client milestones.
- **Testimonials Carousel/Grid**: Client review cards with roles and company logos.
- **Contact Form**: Intake form for project inquiries (name, email, budget, message).

## 4. Payload CMS Collections Schema
Set up Payload CMS collections so all content can be managed dynamically:
- `Projects`: Title, Description, Tech Stack Tags, Cover Image, Live URL, GitHub URL, Featured Flag.
- `Services`: Tier Name, Price, Billing Interval, Included Features List, CTA Link.
- `WorkExperience`: Role Title, Company, Date Range, Key Achievements.
- `Testimonials`: Client Name, Role/Company, Avatar, Quote.
- `GlobalSettings`: Headline, Bio, Resume PDF File Upload, Contact Details.

## 5. SEO Optimization Guidelines
- **Dynamic Metadata**: Implement `<head>` tags (title, meta description, canonical URLs, keywords) pulling dynamically from Payload fields.
- **Social Sharing**: Configure Open Graph (`og:title`, `og:description`, `og:image`, `og:type`) and Twitter Card tags.
- **Structured Data**: Inject `Person` and `ProfessionalService` JSON-LD schema defining software engineering services, skills, and rates.
- **Technical SEO**:
  - Automated `sitemap.xml` and `robots.txt` generation.
  - Next.js `<Image>` optimization (`priority`, WebP/AVIF formats, proper `sizes`, and descriptive `alt` tags).
  - Semantic HTML structure (`<header>`, `<main>`, `<section>`, `<footer>`, structured `<h1>`–`<h3>` hierarchy).
