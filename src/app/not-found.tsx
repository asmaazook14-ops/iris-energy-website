import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[var(--color-brand-navy)] mb-4">404</h1>
        <h2 className="text-3xl font-bold text-[var(--color-brand-navy)] mb-4">Page Not Found</h2>
        <p className="text-[var(--color-brand-dark-gray)] mb-8">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link 
          href="/en"
          className="inline-flex justify-center items-center px-8 py-3 border border-transparent text-base font-semibold rounded-md text-white bg-[var(--color-brand-blue)] hover:bg-blue-700 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
