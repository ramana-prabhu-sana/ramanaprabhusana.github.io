import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "", stack: "" };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    this.setState({
      message: error?.message || String(error),
      stack: error?.stack || ""
    });
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div style={{ padding: 20, fontFamily: "ui-sans-serif, system-ui" }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>App crashed</div>
        <pre style={{ whiteSpace: "pre-wrap" }}>{this.state.message}</pre>
        <pre style={{ whiteSpace: "pre-wrap", opacity: 0.8 }}>{this.state.stack}</pre>
      </div>
    );
  }
}
