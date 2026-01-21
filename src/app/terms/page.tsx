export default function TermsOfServicePage() {
  return (
    <main className="flex-grow text-neutral-200 p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full space-y-8 py-12">
        <h1 className="text-5xl font-bold tracking-tight text-white text-center">
          Terms of Service
        </h1>
        <p className="text-neutral-400 text-lg text-center">
          Please read these terms carefully before using our services.
        </p>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 space-y-6">
          <h2 className="text-3xl font-semibold text-white">Acceptance of Terms</h2>
          <p className="text-neutral-300 leading-relaxed">
            By accessing or using the VISO website and services, you agree to be bound by these Terms of Service and all terms incorporated by reference.
            If you do not agree to all of these terms, do not use our services.
          </p>

          <h2 className="text-3xl font-semibold text-white">Changes to Terms</h2>
          <p className="text-neutral-300 leading-relaxed">
            We may modify these Terms at any time, in our sole discretion. If we do so, we'll let you know either by posting the modified Terms on the Site or through other communications.
            It's important that you review the Terms whenever we modify them because if you continue to use the Services after we have posted modified Terms on the Site, you are indicating to us that you agree to be bound by the modified Terms.
          </p>
          {/* Add more terms of service details here */}
        </div>
      </div>
    </main>
  );
}
