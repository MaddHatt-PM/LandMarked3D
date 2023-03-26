export const statusCodes = {
  // Electron
  drive_is_too_full: 450,

  // Success
  OK: 200,
  created: 201,
  accepted: 202,

  // Client error
  badRequest: 400,
  unauthorized: 401,
  payment_Required: 402,
  forbidden: 403,
  not_Found: 404,
  method_Not_Allowed: 405,
  not_Accemptable: 406,
  proxy_Timeout: 407,
  request_Timeout: 408,
  conflict: 409,
  gone: 410,
  length_Required: 411,
  precondition_Failed: 412,
  payload_Too_Large: 413,
  URI_Too_Long: 414,
  unsupported_Media_Type: 415,

  // Server error
  internal_Server_Error: 500,
  not_Implemented: 501,
  bad_Gateway: 502,
  service_Unavailable: 503,
  gateway_Timeout: 504,
  HTTP_Version_Not_Supported: 505,
}