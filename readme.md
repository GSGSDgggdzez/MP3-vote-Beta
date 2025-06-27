# 🗳️ MP3-vote-Beta

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</div>

<div align="center">
  <h3>🇨🇲 Modern Digital Voting Platform for Cameroon</h3>
  <p>A secure, transparent, and user-friendly electronic voting system built with Next.js</p>
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
MP3-vote-Beta is a cutting-edge digital voting platform designed specifically for Cameroon's electoral needs. This application provides a secure, transparent, and accessible way for citizens to participate in democratic processes through modern web technologies.

The platform ensures election integrity through advanced security measures while maintaining user-friendly interfaces that accommodate users of all technical backgrounds. Built with Next.js and modern web standards, it delivers fast, reliable, and scalable voting experiences.

## ✨ Features
- 🔐 **Secure Authentication** - Scrutineer authentication and voter verification
- 🗳️ **Real-time Voting** - Live vote casting with instant confirmation
- 📊 **Live Results** - Real-time election results and analytics
- 🌍 **Multi-language Support** - Available in French and English
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- 🔒 **End-to-End Encryption** - Secure vote transmission and storage
- 📈 **Analytics Dashboard** - Comprehensive voting statistics and insights
- ♿ **Accessibility** - WCAG 2.1 compliant for inclusive voting
- 🎨 **Modern UI/UX** - Intuitive and professional interface design
- 🚀 **High Performance** - Optimized for speed and reliability

## 🛠️ Tech Stack
**Frontend:**
- Next.js 14+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS
- PocketBase

**Backend:**
- PocketBase
- Node.js

**Authentication & Security:**
- PocketBase Authentication
- JWT Tokens

**Deployment & Infrastructure:**
- Fly.io (PocketBase)
- Vercel (Frontend)

**Development Tools:**
- ESLint
- Prettier
- Git

## 🌍 Environment Variables
To run this project, you will need to add the following environment variables to your `.env.local` file:

```bash
# PocketBase
POCKETBASE_URL="https://pocketmp3.fly.dev"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret"
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
npm install
```

Set up your environment variables:

```bash
cp .env.example .env.local
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 API Reference

### Authentication

#### Scrutineer Login
```http
POST /api/auth/signin
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`   | `string` | **Required**. Scrutineer email   |
| `password`| `string` | **Required**. Scrutineer password|

### Polling Stations

#### Get All Polling Stations
```http
GET /api/polling-stations
```

#### Get Polling Station Details
```http
GET /api/polling-stations/${id}
```

### Voter Verification

#### Verify Voter
```http
POST /api/verify-voter
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `idType`  | `string` | **Required**. ID type (national/voter/passport) |
| `idNumber`| `string` | **Required**. ID number |

## Project Structure
```
vote-cameroon-beta/
├── app/                    # Next.js app directory
├── components/            # Reusable React components
├── lib/                   # PocketBase client and utilities
│   ├── pocketbase.ts     # PocketBase configuration
├── public/               # Static assets
└── styles/               # Global styles
```

### Version History
- **v1.0.0-beta** - Initial beta release

### License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Made with ❤️ for Cameroon's Democratic Future</p>
  <p>
    <a href="https://github.com/yourusername/vote-cameroon-beta">⭐ Star this project</a> •
    <a href="https://github.com/yourusername/vote-cameroon-beta/issues">🐛 Report Bug</a> •
    <a href="https://github.com/yourusername/vote-cameroon-beta/issues">💡 Request Feature</a>
  </p>
</div>
