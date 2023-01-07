export class AlreadyExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserAlreadyExistsError";
  }
}

export class SessionAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SessionAlreadyExistsError";
  }
}

export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CustomError";
  }
}