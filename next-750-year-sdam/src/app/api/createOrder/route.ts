

export async function POST(request: Request): Promise<Response> {
  const request_url = new URL(request.url)
  const body = await request.json()

  // read body 

  // Create payment request from Mollie and pass product details to metadata

  // Return payment link
  return Response.json('ok')
}