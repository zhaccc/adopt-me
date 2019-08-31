// mostly code from reactjs.org/docs/error-boundaries.html
import React, { Component } from "react";
import { Link, Redirect } from "@reach/router";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    redirect: false
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info); // eslint-disable-line no-console
    setTimeout(() => this.setState({ redirect: true }), 5000);
    // we can also do it like this, just don't forget to import navigate from reach router
    // setTimeout(() => navigate('/'), 5000);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }

    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing. <Link to="/">Click here</Link>
          {" "}
          to back to the home page or wait five seconds.
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
