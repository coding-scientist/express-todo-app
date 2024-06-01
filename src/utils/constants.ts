export const DEFAULT_BAD_REQUEST_MESSAGE = "Improperly formatted resource"
export const DEFAULT_SUCCESSFUL_CREATION_MESSAGE = "Resource created successfully"
export const DEFAULT_SUCCESSFUL_UPDATE_MESSAGE = "Resource updated successfully"
export const DEFAULT_FAILED_UPDATE_MESSAGE = "Failed to update resource"
export const DEFAULT_FAILED_CREATION_MESSAGE = "Failed to create resource"
export const DEFAULT_FAILED_DELETE_MESSAGE = "Failed to delete resource"

export enum HttpStatusCodes {
  OK = 200,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  BAD_REQUEST = 400,
  CREATED = 201
}