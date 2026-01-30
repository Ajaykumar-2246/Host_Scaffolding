import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
    console.error('[Host] ErrorBoundary caught:', error, errorInfo);
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  public render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div
          style={{
            padding: '24px',
            margin: '20px',
            border: '1px solid #e57373',
            borderRadius: '8px',
            background: '#ffebee',
            color: '#c62828',
          }}
        >
          <h3 style={{ marginTop: 0 }}>Something went wrong</h3>
          <p style={{ fontFamily: 'monospace', fontSize: '14px', wordBreak: 'break-word' }}>
            {this.state.error.message}
          </p>
          <button
            type="button"
            onClick={this.handleRetry}
            style={{
              marginTop: '12px',
              padding: '8px 16px',
              background: '#282c34',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
