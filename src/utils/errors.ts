import { HttpStatusCodes } from "./constants";

export class ErrorResponse {
  public statusCode: HttpStatusCodes
  public errorMessage: string

  constructor(statusCode: HttpStatusCodes, errorMessage: string) {
    this.statusCode = statusCode
    this.errorMessage = errorMessage
  }
}