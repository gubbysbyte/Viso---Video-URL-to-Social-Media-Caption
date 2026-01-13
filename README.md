# Viso

Viso is a modern web application built with [Next.js](https://nextjs.org), leveraging powerful tools like Drizzle ORM, TailwindCSS, and TypeScript to deliver a robust and scalable solution.

## Features

- **Next.js**: Server-side rendering and static site generation.
- **Drizzle ORM**: Simplified database interactions.
- **TailwindCSS**: Utility-first CSS framework for rapid UI development.
- **TypeScript**: Static typing for better code quality.
- **YouTube Integration**: Powered by `youtubei.js`.
- **AI SDK**: Google AI SDK for advanced AI capabilities.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/viso.git
   ```

2. Navigate to the project directory:
   ```bash
   cd viso
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Development

Start the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

### Build

To create a production build:
```bash
npm run build
# or
yarn build
```

### Start

Run the production build:
```bash
npm run start
# or
yarn start
```

## Environment Variables

Create a `.env.local` file in the root directory and configure the following variables:
```
DATABASE_URL=your_database_url
API_KEY=your_api_key
```

## Project Structure

```
viso/
├── src/
│   ├── app/          # Next.js app directory
│   ├── db/           # Database schema and configuration
│   ├── lib/          # Utility libraries
├── public/           # Static assets
├── package.json      # Project metadata and dependencies
├── tsconfig.json     # TypeScript configuration
├── next.config.ts    # Next.js configuration
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
