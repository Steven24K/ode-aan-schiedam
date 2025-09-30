export async function POST(request: Request) {
    const formData = await request.formData();
    const id = formData.get('id');
    if (!id) return new Response('Missing id', { status: 400 });

    console.log(`Mollie webhook received for payment ${id}`);
    // TODO: check payment status and send order to printify if paid 

    return new Response('OK', { status: 200 });
}