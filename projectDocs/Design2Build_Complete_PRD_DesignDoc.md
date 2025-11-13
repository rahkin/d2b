
# Product Requirements & Design Spec for Design2Build.Pro

## Overview
**Design2Build.Pro** is a multi-role project management and sourcing platform for the design industry. Starting in the Philippines, it aims to serve interior designers, architects, stylists, event planners, project managers, and FFFE/A suppliers. The platform merges creative tools with business operations—enabling AI-enhanced design flows, marketplace features, budgeting tools, and community engagement.

## Problem Statement
The design industry lacks a streamlined, all-in-one project management and sourcing platform that bridges creativity with execution. Traditional workflows involve multiple gadgets, channels, and manual processes. Designers, clients, and vendors face delays, miscommunication, and lack of visibility across stages.

## Vision
To become the Philippines’ leading creative execution platform and scale globally with export-ready product showcasing and collaborative workflows.

## Mission
To simplify and enhance the design process from conceptualization to project completion through intuitive tools, AI support, and a commerce-integrated environment.

## App Features

### 1. Moodboard & Creative Tools
- AI Moodboard Creator (manual & AI-assisted)
- Sketch to AI Render
- Moodboard Templates
- Collection-based saving and community sharing

### 2. Project Management
- Gantt Charts, AR Customizer, and Budget Tracker
- Document Upload, Contract Admin, Receipt Generator
- Track timelines, revisions, and approvals
- Digital Binder Creator

### 3. AI Integration
- AI Analyzer (suggest tools, layouts)
- Rewarded AI usage via points (per subscription tier)
- Video ad placements and AI render slots for monetization

### 4. Vendor Marketplace
- Vendor Dashboards, Inventory Tracker
- Product Search Integration (linked to Moodboards)
- PO Forms, Procurement Tracker, Geotag Visibility
- E-commerce Checkout (via PayMongo/Xendit)

### 5. Collaboration Tools
- Role-based dashboards (client, vendor, designer)
- Messaging System (chat, SMS, call, email alerts)
- Community Forum (project posts, assistance, geotags)
- Diamond Tier System for top users (leaderboard)

### 6. Ads Manager
- Targeted Ads (carousel, splash, geo-tagged)
- Packages: Basic, Standard, Premium, Platinum
- Ad spaces: Moodboard, AI render, Sketch upload, Project profile
- CPC pricing and sponsored content in forums

## User Roles
- **Clients:** Project tracking, hire designers, approve sketches
- **Designers:** Studio dashboard, AI tools, binder uploads
- **Vendors:** Manage inventory, ad manager, upload catalogs
- **Project Managers:** Timeline, budget, milestone oversight
- **Students/DIYers:** Freemium access, community, basic tools

## Platform Stack
- **Frontend:** React (Web), React Native (iOS/Android)
- **Backend:** Node.js + PostgreSQL
- **Hosting:** Vercel (Frontend), Railway/Render (Backend)
- **AI Microservices:** Python (inference models)
- **Real-Time:** Firebase or Socket.IO
- **Media:** Cloudinary
- **Integrations:** Google Sheets, Google Maps

## Localization (PH)
- PH Tax Receipt Templates
- BIR-Compliant Billing
- Privacy Act Storage Compliance
- PH Gateway (Xendit or PayMongo)
- Tagalog/English toggle (Phase 2)

## Monetization

### Subscription Tiers (PHP)
| Plan       | Monthly PHP | Features |
|------------|--------------|----------|
| Freemium   | 0            | Basic tools, forum, 3 projects, 10 AI pts |
| Pro        | 1157.40      | Hi-res AI, branding, collab, 300 AI pts |
| Pro+       | 2894.37      | CRM, team collab, invoicing, 1300 AI pts |
| Enterprise | Custom       | Full API access, export priority, VIP support |

### Vendor Ads Packages
| Package  | Monthly PHP | Impressions | Features |
|----------|-------------|-------------|----------|
| Basic    | 12997.80    | 900         | AI Analyzer, Search, Interstitials |
| Standard | 20827.80    | 1200        | Splash, Native Ads, Forum |
| Premium  | 60813.00    | 3000        | Retargeting, Sponsored Content |
| Platinum | 178263.00   | 3000+       | Video Ads, Featured Campaigns |

## Roadmap
- **Q4 2025**: Beta (students, influencers, local designers)
- **Q1 2026**: PH Supplier Ads + AI Moodboard Live
- **Q2–Q3 2026**: Full Marketplace Launch
- **Q1 2027**: Global Export Tools, USD Payments, App Store Push

## Target Market
- Interior Designers, Architects, Event Planners
- Project Managers, Contractors, Stylists
- FFFE/A Suppliers, Clients, DIY Enthusiasts
- PH-based (initially), Global Freelancers (expansion)

## Branding
- **Font**: Strayhorn
- **Color**: Neutral tones (browns, grays)
- **Voice**: Warm, collaborative, intuitive
- **Slogan**: Empower the process, not just the output.

## Strategic Differentiators
- All-in-one platform (vs Zoho, Houzz)
- AI integrated into design execution
- Local vendor support with global export reach
- Role-specific flows and monetization
