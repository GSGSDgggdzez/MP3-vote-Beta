# 🗳️ MP3-vote-Beta

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/PocketBase-B8DBE4?style=for-the-badge&logo=pocketbase&logoColor=black" alt="PocketBase" />
</div>

<div align="center">


  <h3>🇨🇲 Advanced Digital Voting Platform for Cameroon</h3>
  <p>A blockchain-secured, transparent, and intuitive electronic voting system powered by Next.js and PocketBase</p>
</div>

---

## 📋 Table of Contents
- [Description](#-description)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Environment Variables](#-environment-variables)
- [Run Locally](#-run-locally)
- [API Reference](#-api-reference)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [FAQ](#-faq)
- [Authors](#-authors)
- [Acknowledgments](#-acknowledgments)
- [Appendix](#-appendix)

## 🎯 Description

MP3-vote-Beta represents the future of digital democracy in Cameroon. This state-of-the-art voting platform combines military-grade security with exceptional user experience to revolutionize the electoral process. Built on cutting-edge web technologies, it ensures maximum accessibility while maintaining the highest standards of election integrity.


Our platform features blockchain verification, biometric authentication, and real-time audit trails, making it one of the most secure and transparent voting solutions available. The system is designed to handle millions of concurrent users while providing instantaneous results and comprehensive analytics.

## ✨ Features










- 🔐 **Advanced Authentication** - Multi-factor authentication with biometric verification
- 🗳️ **Blockchain Voting** - Immutable vote records with blockchain technology
- 📊 **Real-time Analytics** - Advanced statistical analysis and result visualization
- 🌍 **Comprehensive Language Support** - Multiple local languages including French, English, and major Cameroonian dialects
- 📱 **Progressive Web App** - Offline capabilities and native app-like experience
- 🔒 **Military-grade Security** - AES-256 encryption and blockchain verification
- 📈 **AI-powered Analytics** - Predictive analytics and fraud detection
- ♿ **Enhanced Accessibility** - WCAG 2.1 AAA compliance and screen reader optimization
- 🎨 **Dynamic UI/UX** - Adaptive interface with dark/light mode support
- 🚀 **Distributed Architecture** - Load-balanced and fault-tolerant system

## 🛠️ Tech Stack
**Frontend:**
- Next.js 14+ (App Router)
- React 18+



- TypeScript 5+
- Tailwind CSS with custom design system
- PocketBase Client SDK
- Redux Toolkit for state management
- React Query for data fetching

**Backend:**


- PocketBase (Go-powered backend)
- Node.js microservices
- WebSocket for real-time updates
- Redis for caching

**Authentication & Security:**
- PocketBase Authentication

- JWT with refresh tokens
- Biometric authentication
- Blockchain verification

**Deployment & Infrastructure:**


- Fly.io (PocketBase) with auto-scaling
- Vercel Edge Functions
- CloudFlare CDN
- Docker containerization

**Development Tools:**

- ESLint with custom rule set
- Prettier

- Husky for git hooks
- Jest for testing
- Cypress for E2E testing

## 🌍 Environment Variables
To run this project, you will need to add the following environment variables to your `.env.local` file:

```bash

# PocketBase Configuration
POCKETBASE_URL="https://pocketmp3.fly.dev"
POCKETBASE_ADMIN_EMAIL="your_admin_email"
POCKETBASE_ADMIN_PASSWORD="your_admin_password"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret"
JWT_SECRET="your_jwt_secret"

# Feature Flags
ENABLE_BLOCKCHAIN="true"
ENABLE_BIOMETRIC="true"

# Analytics
ANALYTICS_API_KEY="your_analytics_key"

# Redis Cache
REDIS_URL="your_redis_url"
REDIS_PASSWORD="your_redis_password"
```

## 🏃‍♂️ Run Locally
Clone the project:

```bash
git clone https://github.com/yourusername/vote-cameroon-beta.git
```

Navigate to the project directory:

```bash
cd vote-cameroon-beta
```

Install dependencies:

```bash

pnpm install
```

Set up your environment variables:

```bash
cp .env.example .env.local
```

Start the development server:

```bash

pnpm dev
```

Run tests:

```bash
pnpm test
pnpm test:e2e
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 API Reference

### Authentication

#### Scrutineer Login
```http
POST /api/auth/signin
```




| Parameter | Type     | Description                | Validation |
| :-------- | :------- | :------------------------- | :--------- |
| `email`   | `string` | **Required**. Scrutineer email | Valid email format |
| `password`| `string` | **Required**. Scrutineer password | Min 8 chars, 1 uppercase, 1 number |
| `otpCode` | `string` | **Required**. 2FA code | 6-digit number |

### Polling Stations

#### Get All Polling Stations
```http
GET /api/polling-stations
```
Query Parameters:
- `page`: Pagination page number
- `limit`: Results per page
- `region`: Filter by region
- `status`: Filter by station status

#### Get Polling Station Details
```http
GET /api/polling-stations/${id}
```
Response includes:
- Station details
- Real-time voter count
- Queue status
- Staff information

### Voter Verification

#### Verify Voter
```http
POST /api/verify-voter
```




| Parameter | Type     | Description                | Validation |
| :-------- | :------- | :------------------------- | :--------- |
| `idType`  | `string` | **Required**. ID type | enum: ['national', 'voter', 'passport'] |
| `idNumber`| `string` | **Required**. ID number | Format validation per ID type |
| `biometricData` | `string` | **Optional**. Biometric verification data | Base64 encoded |

## Project Structure
```
vote-cameroon-beta/
├── app/                    # Next.js app directory



│   ├── api/               # API routes
│   ├── (auth)/           # Authentication routes
│   ├── (dashboard)/      # Dashboard routes
│   └── layout.tsx        # Root layout
├── components/            # React components
│   ├── ui/               # UI components
│   ├── forms/            # Form components
│   └── charts/           # Analytics components
├── lib/                   # Utility functions
│   ├── pocketbase.ts     # PocketBase config
│   ├── blockchain.ts     # Blockchain utilities
│   └── analytics.ts      # Analytics utilities
├── hooks/                # Custom React hooks
├── store/                # Redux store
├── types/                # TypeScript types
├── public/               # Static assets
└── styles/               # Global styles
```

### Version History

- **v1.2.0** - Added blockchain verification
- **v1.1.0** - Implemented biometric authentication
- **v1.0.0** - Initial stable release

### License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

  <p>Built with ❤️ for Cameroon's Digital Democracy</p>
  <p>
    <a href="https://github.com/yourusername/vote-cameroon-beta">⭐ Star this project</a> •
    <a href="https://github.com/yourusername/vote-cameroon-beta/issues">🐛 Report Bug</a> •

    <a href="https://github.com/yourusername/vote-cameroon-beta/issues">💡 Request Feature</a> •
    <a href="https://github.com/yourusername/vote-cameroon-beta/discussions">💬 Discussions</a>
  </p>
</div>
