"use client";

import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error but don't show it for UploadThing configuration errors
    if (error.message.includes('UploadThing') || error.message.includes('UPLOADTHING')) {
      console.warn('UploadThing configuration error:', error.message);
      return;
    }
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.state.error?.message.includes('UploadThing') || this.state.error?.message.includes('UPLOADTHING')) {
        return (
          <div className="flex flex-col gap-6">
            <div className="w-full max-w-md">
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                <p className="text-sm">
                  File upload is not configured. Please add your UploadThing credentials to use this feature.
                </p>
              </div>
            </div>
          </div>
        );
      }

      return this.props.fallback || (
        <div className="flex flex-col gap-6">
          <div className="w-full max-w-md">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p className="text-sm">Something went wrong. Please try again.</p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;