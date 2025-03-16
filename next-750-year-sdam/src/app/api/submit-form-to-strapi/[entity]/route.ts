import { EndPoint, StrapiCMSService } from "@/services/StrapiCMSService"


export async function POST(request: Request): Promise<Response> {
  const request_url = new URL(request.url)
  const entity = request_url.pathname.split('/')[3] as EndPoint
  const body = await request.json()
  
  if (entity === undefined) return Response.error()

  const strapi = new StrapiCMSService()
  const response = await strapi.SubmitFormBody(entity, body)

  if (response.kind == 'right') return Response.error()

  // TODO: Send email that form is submitted
  
  return Response.json(response.v)
}