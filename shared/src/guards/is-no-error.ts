export const isNoError = <PreferrableType>(
  any: unknown,
): any is PreferrableType => !Object.prototype.hasOwnProperty.call(any, 'error')
