import { StatusCodes } from "./constants";

export class ErrorResponse {
  public statusCode: StatusCodes
  public errorMessage: string

  constructor(statusCode: StatusCodes, errorMessage: string) {
    this.statusCode = statusCode
    this.errorMessage = errorMessage
  }
}