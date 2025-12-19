# Community Chat Platform

This repository contains a real‑time community chat platform built with a modular architecture. It provides hubs with categories and channels, secure direct messages with end‑to‑end encryption, circles for smaller group conversations, a role and permission system, bots and webhooks, billing with Stripe, and moderation tools. The frontend is built with Next.js, TypeScript, TailwindCSS and TanStack Query. The backend uses Express, Socket.IO and MongoDB. Deployment is configured for Render.

## Features

- Authentication via Discord OAuth2 with secure session handling and account deletion.
- Hubs with categories and channels, circles for mini‑servers and secure 1:1 direct messages.
- Advanced roles and role groups with a bitset permission engine and an intuitive permission editor.
- Real‑time messaging powered by Socket.IO with typing indicators, presence and mentions.
- Emoji support for messages, reactions and role icons.
- Mentions for users and roles with notifications, respecting permissions and ignore/block rules.
- Blocking and ignoring to manage unwanted interactions.
- Reporting system with moderation actions and audit logging.
- Bots, webhooks and a developer API with scoped API keys and rate limits.
- Subscriptions and boosting with dynamic Stripe billing and a customer portal.
- Cloudinary integration for avatars, icons, banners and attachments.
- Owner dashboard for global moderation and maintenance.

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas cluster
- Stripe account with test keys
- Cloudinary account
- Discord developer credentials (client ID and secret)

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/community-chat-platform.git
   cd community-chat-platform
   ```

2. **Create environment variables**

   Copy `.env.example` to `.env` at the root and fill in the required values. Provide your MongoDB URI, Discord client credentials, session secret, Stripe keys and any other secrets. The `CLIENT_URL` should point to the frontend base URL.

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Run in development**

   ```bash
   npm run dev
   ```

   The backend will start on port 4000 and the frontend on port 3000. You can log in with Discord, create hubs, channels and messages. The developer API is available at `/api` on the backend service.

5. **Seed the database (optional)**

   To populate the database with example data, run the seed script:

   ```bash
   node scripts/seed.ts
   ```

6. **Run tests**

   A minimal Playwright smoke test is provided:

   ```bash
   npm test
   ```

### Building for Production

Run the build commands for both services:

```bash
npm run build
```

The backend is compiled into `backend/dist` and the frontend into `.next` in the `frontend` directory. Use `npm run start` to run both services from the compiled output.

### Deployment on Render

Deployment is configured via **render.yaml**. Two services are defined: one for the backend and one for the frontend. Each service installs dependencies, builds the project and starts the compiled application. Environment variables must be set in Render’s dashboard or stored as secrets.

1. Create a new repository on GitHub and push this code.
2. In Render, create a new Blueprint and connect it to your repository.
3. Render will detect the `render.yaml` file and provision the services. For the backend service, attach your MongoDB URI, Discord credentials, Stripe keys, Cloudinary credentials and session secret as environment variables. For the frontend service, set `NEXT_PUBLIC_API_URL` to the backend’s external URL.
4. Once deployment completes, open the frontend URL to access the application.

### Creating a ZIP

To package the project into a ZIP file, use the provided scripts in the `scripts` directory. The bash version can be run on Unix systems:

```bash
bash scripts/make-zip.sh
```

On Windows, use the PowerShell script:

```powershell
.\scripts\make-zip.ps1
```

The scripts archive the entire repository into `community-chat-platform.zip` in the project root.

## Directory Structure

```
.
├── backend          # Express API and Socket.IO server
│   ├── package.json
│   ├── tsconfig.json
│   └── src
│       ├── app.ts
│       ├── config
│       ├── controllers
│       ├── middleware
│       ├── models
│       ├── routes
│       ├── sockets
│       └── utils
├── frontend         # Next.js frontend
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── public
│   └── app
├── scripts          # Utility scripts and tests
├── tests            # Playwright tests
├── render.yaml      # Render deployment blueprint
├── entiresys.txt    # System architecture and documentation
├── README.md
└── .env.example
```

## Contributing

Contributions are welcome. Please create issues for bugs or feature requests and open pull requests for improvements. Make sure to run the tests and follow the established code style.

## License

This project is released under the MIT License.

TODO: Add more contributor guidelines