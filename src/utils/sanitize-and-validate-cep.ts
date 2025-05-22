export function sanitizeAndValidateCep(input: string): string {
  const cleanedCep = input.replace(/\D/g, '')

  return cleanedCep
}
