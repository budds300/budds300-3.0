"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold text-foreground">
        Something went wrong
      </h1>
      <p className="max-w-md text-muted">
        An unexpected error occurred while loading this page.
      </p>
      <button
        onClick={reset}
        className="card px-5 py-2.5 font-medium text-foreground hover:text-accent"
      >
        Try again
      </button>
    </div>
  );
}
