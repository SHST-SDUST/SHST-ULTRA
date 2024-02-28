import type { ErrorInfo } from "react";
import { Component } from "react";

import { Report } from "@/utils/report";

export class ErrorBoundary extends Component {
  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    Report.error(error, String(errorInfo));
  }

  render() {
    return this.props.children;
  }
}
