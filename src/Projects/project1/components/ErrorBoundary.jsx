import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // send to logging if needed
    // console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <p>We couldn't render this section. Try refreshing the page.</p>
          <details style={{ whiteSpace: "pre-wrap", textAlign: "left" }}>
            {String(this.state.error)}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
