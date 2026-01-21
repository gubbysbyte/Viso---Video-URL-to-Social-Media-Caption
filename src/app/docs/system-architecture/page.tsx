export default function SystemArchitecturePage() {
  return (
    <main className="flex-grow text-neutral-200 p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full space-y-8 py-12">
        <h1 className="text-5xl font-bold tracking-tight text-white text-center">
          System Architecture
        </h1>
        <p className="text-neutral-400 text-lg text-center">
          A high-level overview of how VISO is built.
        </p>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 space-y-6">
          <h2 className="text-3xl font-semibold text-white">Overview</h2>
          <p className="text-neutral-300 leading-relaxed">
            Viso leverages a modern serverless architecture designed for scalability, reliability, and cost-efficiency.
            Our core components include a Next.js frontend, a robust API layer, and a background job processing system.
            Data is persisted in a PostgreSQL database, managed via Drizzle ORM.
          </p>
          {/* Add more detailed architecture sections here */}
        </div>
      </div>
    </main>
  );
}
