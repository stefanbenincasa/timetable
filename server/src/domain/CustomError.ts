export class CustomError extends Error {
	kind: string;

  constructor(kind: string, message?: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
		this.kind = kind;
  }
}
