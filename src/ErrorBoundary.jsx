import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center text-slate-400">

          <h1 className="text-7xl font-black text-red-500">500</h1>
          <p className="text-slate-400">Error interno de la aplicación</p>
        </div>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
