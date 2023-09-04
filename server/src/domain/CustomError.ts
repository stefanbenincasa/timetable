export class CustomError extends Error {
	kind: number;

  constructor(kind: number = 500, message?: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
		this.kind = kind;
  }
}
