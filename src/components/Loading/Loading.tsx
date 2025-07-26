import React from 'react';
import './Loading.scss';

export type LoadingType = 'spinner' | 'dots' | 'terminal' | 'skeleton';

interface LoadingProps {
  type?: LoadingType;
  size?: 'small' | 'medium' | 'large';
  message?: string;
  fullscreen?: boolean;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ 
  type = 'terminal', 
  size = 'medium',
  message = 'Yükleniyor...',
  fullscreen = false,
  className = ''
}) => {
  const getLoadingContent = () => {
    switch (type) {
      case 'spinner':
        return (
          <div className={`loading-spinner size-${size}`}>
            <div className="spinner"></div>
          </div>
        );

      case 'dots':
        return (
          <div className={`loading-dots size-${size}`}>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        );

      case 'terminal':
        return (
          <div className={`loading-terminal size-${size}`}>
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-buttons">
                  <span className="btn close"></span>
                  <span className="btn minimize"></span>
                  <span className="btn maximize"></span>
                </div>
              </div>
              <div className="terminal-body">
                <div className="terminal-line">
                  <span className="prompt">$</span>
                  <span className="command">loading...</span>
                  <span className="cursor"></span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'skeleton':
        return (
          <div className={`loading-skeleton size-${size}`}>
            <div className="skeleton-line"></div>
            <div className="skeleton-line short"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line medium"></div>
          </div>
        );

      default:
        return null;
    }
  };

  const containerClass = `
    loading-container 
    ${fullscreen ? 'fullscreen' : ''} 
    ${className}
  `.trim();

  return (
    <div className={containerClass} role="status" aria-live="polite">
      {getLoadingContent()}
      {message && (
        <div className="loading-message">
          <span className="sr-only">Yükleniyor:</span>
          {message}
        </div>
      )}
    </div>
  );
};

export const FullscreenLoading: React.FC<{ message?: string }> = ({ 
  message = 'Sayfa yükleniyor...' 
}) => (
  <Loading 
    type="terminal" 
    size="large" 
    message={message} 
    fullscreen 
  />
);

export default Loading; 