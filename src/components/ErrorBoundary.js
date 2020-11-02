import React, { Component } from "react"
import { logError } from "../libs/errorLib"
import "./ErrorBoundary.css"

export default class ErrorBoundary extends Component {
  state = { hasErrors: false }

  static getDerivedStateFromError(error) {
    return { hasErrors: true }
  }

  componentDidCatch(error, errorInfo) {
    logError(errpr, errorInfo)
  }

  render() {
    return this.state.hasErrors ? (
      <div className="ErrorBoundary">
        <h3>Sorry there was a problem loading this page</h3>
      </div>
    ) : (
      this.props.children
    )
  }
}

// componentDidCatch and getDerivedStateFromError methods get triggered when any of the child components have an unhandled error.
// Set the internal state, hasError to true to display the fallback UI.
// And report the error to Sentry by calling logError with the error and errorInfo that comes with it.
