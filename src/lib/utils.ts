import { type ClassValue, clsx } from "clsx"

import { format, parse } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function decodeJwtToken(token: string) {
  const base64Url = token.split(".")[1]
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
  const jsonPayload = decodeURIComponent(atob(base64))
  return JSON.parse(jsonPayload)
}

export function getFuso(createdAt: string) {
  console.log("createdAt: ", createdAt)
  const date = parse(createdAt, "yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'SSS'Z'", new Date())
  console.log("date: ", date)
  const year = parseInt(format(date, "yyyy"))
  const month = parseInt(format(date, "MM"))
  const day = parseInt(format(date, "dd"))
  const hour = parseInt(format(date, "HH"))
  const minute = parseInt(format(date, "mm"))
  const second = parseInt(format(date, "ss"))
  const millisecond = parseInt(format(date, "SSS"))

  return new Date(year, month - 1, day, hour, minute, second, millisecond);

}
