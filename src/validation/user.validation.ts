import { PostUserDTO } from "../dto/user.dto";
import { isEmail, isObject } from "./helpers";

export function validateUserPost(obj: any): obj is PostUserDTO {
  const MIN_NAME_LENGTH = 2;
  const MAX_NAME_LENGTH = 20;
  const MIN_PASSWORD_LENGTH = 8;
  const MAX_PASSWORD_LENGTH = 50;

  if (!isObject(obj)) return false

  const {firstName, lastName, email, password} = obj

  return (
    typeof firstName === "string" && firstName.length > MIN_NAME_LENGTH && firstName.length < MAX_NAME_LENGTH &&
    typeof lastName === "string" && lastName.length > MIN_NAME_LENGTH && lastName.length < MAX_NAME_LENGTH &&
    typeof email === "string" && isEmail(email) &&
    typeof password === "string" && password.length > MIN_PASSWORD_LENGTH && password.length < MAX_PASSWORD_LENGTH
  )
}

export function validateUserPut(obj: any): obj is PostUserDTO {
  const MIN_NAME_LENGTH = 2;
  const MAX_NAME_LENGTH = 20;
  const MIN_PASSWORD_LENGTH = 8;
  const MAX_PASSWORD_LENGTH = 50;

  if (!isObject(obj)) return false

  const {firstName, lastName, email, password} = obj

  return (
    typeof firstName === "string" && firstName.length > MIN_NAME_LENGTH && firstName.length < MAX_NAME_LENGTH &&
    typeof lastName === "string" && lastName.length > MIN_NAME_LENGTH && lastName.length < MAX_NAME_LENGTH &&
    typeof email === "string" && isEmail(email) &&
    typeof password === "string" && password.length > MIN_PASSWORD_LENGTH && password.length < MAX_PASSWORD_LENGTH
  )
}

export function validateUserPatch(obj: any): obj is PostUserDTO {
  const MIN_NAME_LENGTH = 2;
  const MAX_NAME_LENGTH = 20;
  const MIN_PASSWORD_LENGTH = 8;
  const MAX_PASSWORD_LENGTH = 50;

  if (!isObject(obj)) return false

  return (
    obj?.firstName ? typeof obj?.firstName === "string" && obj?.firstName.length > MIN_NAME_LENGTH && obj?.firstName.length < MAX_NAME_LENGTH : true &&
    obj?.lastName ? typeof obj.lastName === "string" && obj?.lastName.length > MIN_NAME_LENGTH && obj?.lastName.length < MAX_NAME_LENGTH : true &&
    obj?.email ? typeof obj?.email === "string" && isEmail(obj?.email) : true &&
    obj?.password ? typeof obj?.password === "string" && obj?.password.length > MIN_PASSWORD_LENGTH && obj?.password.length < MAX_PASSWORD_LENGTH : true
  )
}