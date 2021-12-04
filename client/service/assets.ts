import { baseUrl } from './config'

export const getImgUrl = (relativeUrl: string): string =>
  `${baseUrl}${relativeUrl}`
