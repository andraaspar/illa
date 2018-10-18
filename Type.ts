export type TOmit<T, K> = Pick<T, Exclude<keyof T, K>>
export type TDiff<T, O> = Pick<T, Exclude<keyof T, keyof O>>
