export enum Validation {
  NotValidated,
  Invalid,
  Valid,
}

export type ValidationRecord = {
  status: Validation
  error?: string
}
