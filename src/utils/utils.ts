export function transformData<T> (data: Partial<T>, key: keyof T) {
  const result = Object.assign({}, data)
  result[key] = undefined
  return result
}
