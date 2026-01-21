export default function PrivacyPolicyPage() {
  return (
    <main className="flex-grow text-neutral-200 p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full space-y-8 py-12">
        <h1 className="text-5xl font-bold tracking-tight text-white text-center">
          Privacy Policy
        </h1>
        <p className="text-neutral-400 text-lg text-center">
          Your privacy is important to us.
        </p>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 space-y-6">
          <h2 className="text-3xl font-semibold text-white">Introduction</h2>
          <p className="text-neutral-300 leading-relaxed">
            This Privacy Policy describes how VISO collects, uses, and discloses information, and what choices you have with respect to that information.
            When we refer to "VISO," "we," "our," or "us," we mean the VISO entity that acts as the controller or processor of your information.
          </p>

          <h2 className="text-3xl font-semibold text-white">Information We Collect</h2>
          <p className="text-neutral-300 leading-relaxed">
            We collect information about you when you provide it to us, when you use our services, and when other sources provide it to us.
            This includes information you provide when you create an account, submit content, or contact us for support.
          </p>
          {/* Add more privacy policy details here */}
        </div>
      </div>
    </main>
  );
}
