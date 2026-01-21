# Viso | AI Content Engine

Viso is a powerful AI-driven tool designed to repurpose video content in seconds. Simply paste a YouTube link, and Viso extracts insights to generate ready-to-post content for Twitter, LinkedIn, and Instagram.

## 🚀 Features

- **Video to Content**: Transform YouTube videos into engaging social media posts.
- **Multi-Platform Support**:
  - 🧵 **Twitter Threads**: Broken down into engaging tweets.
  - 💼 **LinkedIn Posts**: Professional and insightful summaries.
  - 📸 **Instagram Captions**: Catchy captions optimized for engagement.
- **AI-Powered**: Utilizes advanced AI models to analyze and generate content.
- **Secure Authentication**: Integrated with Clerk for seamless user sign-in and management.
- **Real-time Status**: Polling mechanism to handle long-running AI generation tasks.

## 🔑 Environment Variables

To configure the project, copy the `.env.example` file to `.env.local` and update the values as needed:

```bash
cp .env.example .env.local
```

The `.env.example` file includes placeholders for the required environment variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_example
CLERK_SECRET_KEY=sk_test_example
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key_here
DATABASE_URL=your_database_url_here
RAPID_API_KEY=your_rapid_api_key_here
```

### Setting Up Environment Variables

1. **Clerk Authentication Keys**:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Obtain from your Clerk dashboard.
   - `CLERK_SECRET_KEY`: Obtain from your Clerk dashboard.

2. **AI Provider Keys**:
   - `GOOGLE_GENERATIVE_AI_API_KEY`: Obtain from Google Cloud Console.

3. **Database URL**:
   - `DATABASE_URL`: Use your PostgreSQL database connection string.

4. **Rapid API Key**:
   - `RAPID_API_KEY`: Obtain from RapidAPI.

## 📦 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/viso.git
   cd viso
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Environment Variables**

   Copy the `.env.example` file to `.env.local` and update the values as described above.

   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   Open http://localhost:3000 with your browser to see the result.

## 📂 Full Project Structure

```
viso/
├── src/
│   ├── proxy.ts
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── README.md
│   │   └── api/
│   │       ├── check-status/
│   │       │   └── route.ts
│   │       └── generate/
│   │           └── route.ts
│   ├── db/
│   │   ├── index.ts
│   │   └── schema.ts
│   └── lib/
│       ├── gemini.ts
│       └── youtube.ts
```

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## 📄 License

This project is licensed under the MIT License.
