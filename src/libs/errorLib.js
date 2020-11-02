import * as Sentry from "@sentry/browser"
import { Integrations } from "@sentry/tracing"

const isLocal = process.env.NODE_ENV === "development"

export const initSentry = () => {
  if (isLocal) {
    return
  }
  Sentry.init({
    dsn:
      "https://9b9498e9903540aa8cacc01297b3bfec@o470590.ingest.sentry.io/5501353",
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  })
}

export const logError = (error, errorInfo = null) => {
  if (isLocal) {
    return
  }

  Sentry.withScope((scope) => {
    errorInfo && scope.setExtras(errorInfo)
    Sentry.captureException(error)
  })
}

export const onError = (error) => {
  let errorInfo = {}
  let message = error.toString()

  //Auth errors: Amplify’s Auth package doesn’t throw Error objects, it throws objects with a couple of properties, including the message
  if (!(error instanceof Error) && error.message) {
    errorInfo = error
    message = error.message
    error = new Error(message)
    // API errors
  } else if (error.config && error.config.url) {
    errorInfo.url = error.config.url
  }

  logError(error, errorInfo)

  alert(message)
}

// The Auth package throws errors in a different format, this code just alerts the error message we need. And in all other cases simply alert the error object itself.

// For API errors, report both the error and the API endpoint that caused the error. For Auth errors, create an Error object because Sentry needs actual errors sent to it.

// In the case of an Auth error we create an Error object and add the object that we get as the errorInfo. For API errors, Amplify uses Axios. This has a config object that contains the API endpoint that generated the error.

//  report this to Sentry by calling logError(error, errorInfo)
