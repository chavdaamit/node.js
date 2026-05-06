// class httpError extends Error {
//   constructor(message, Statuscode) {
//     super(message);
//     this.Statuscode = Statuscode;
//   }
// }

// export default httpError;

class httpError extends Error {
  constructor(message, StatusCode) {
    super(message);
    this.StatusCode = StatusCode;
  }
}

export default httpError;
