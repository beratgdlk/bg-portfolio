import { Component, ErrorInfo, ReactNode } from 'react';
import './ErrorBoundary.scss';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // State'i güncelle böylece fallback UI gösterilsin
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Burada error reporting servisi kullanılabilir
    // örn: Sentry, LogRocket, etc.
  }

  private handleRefresh = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    window.location.reload();
  };

  private handleGoHome = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      // Custom fallback UI varsa onu kullan
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="error-boundary">
          <div className="error-container">
            <div className="error-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            
            <h1>Oops! Bir şeyler ters gitti</h1>
            <p>Üzgünüz, beklenmeyen bir hata oluştu. Sayfayı yenilemeyi deneyin.</p>
            
            <div className="error-actions">
              <button 
                onClick={this.handleRefresh}
                className="btn-primary"
                type="button"
              >
                Sayfayı Yenile
              </button>
              <button 
                onClick={this.handleGoHome}
                className="btn-secondary"
                type="button"
              >
                Ana Sayfaya Git
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-details">
                <summary>Hata Detayları (Geliştirici Modu)</summary>
                <pre className="error-stack">
                  <strong>Error:</strong> {this.state.error.toString()}
                  <br />
                  <strong>Stack Trace:</strong>
                  <br />
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 