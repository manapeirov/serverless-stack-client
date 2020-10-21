export function onError(error) {
  let message = error.toString();

  //Auth errors
  if (!(error instanceof Error) && error.message) {
    message = error.message;
  }

  alert(message);
}

// The Auth package throws errors in a different format, this code does alerts the error message we need. And in all other cases simply alert the error object itself.
