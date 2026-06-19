class HttpError extends Error {
  constructor(message, Statuscode) {
    super(message);
    this.Statuscode = Statuscode;
  }
}

export default HttpError;
