import { sendEmail } from "@/sendMail"
import { EndPoint, StrapiCMSService } from "@/services/StrapiCMSService"


export async function POST(request: Request): Promise<Response> {
  const request_url = new URL(request.url)
  const entity = request_url.pathname.split('/')[3] as EndPoint
  const body = await request.json()

  if (entity === undefined) return Response.error()

  const strapi = new StrapiCMSService()
  const response = await strapi.SubmitFormBody(entity, body)

  if (response.kind == 'right') return Response.error()

  let form = Object.entries(body.data).map(([key, value]) => `${key}: ${value}`).join("\n")
  let msg = `Nieuwe inzending op formulier:\n${form}`
  sendEmail("750@odeaanschiedam.nl", "750@odeaanschiedam.nl", `Nieuwe inzending ${entity}`, msg, "poezie750@gmail.com")

  return Response.json(response.v)
}