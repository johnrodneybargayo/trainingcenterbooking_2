import { NextResponse } from "next/server"

export default async function proxy(request) {
  return NextResponse.next({
    request: {
      headers: request.headers,
    },
  })
}
