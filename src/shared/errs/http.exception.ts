export class HttpException extends Error {
  constructor(
    public readonly message: string,
    public readonly status: number,
    public readonly success: boolean = false,
    public readonly data?: { errors: string[] }
  ) {
    super(message);
    this.name = new.target.name;
  }
}
