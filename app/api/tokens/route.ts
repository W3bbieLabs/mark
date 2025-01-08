import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

async function validateRequest(request: Request) {
    const origin = request.headers.get('referer');
    const host = request.headers.get('host');
    console.log(request.headers);
    console.log(origin, host);

    // In development, allow localhost
    if (process.env.NODE_ENV === 'development') {
        return true;
    }

    // In production, verify the request is coming from our domain
    if (origin) {
        // The origin should match our host
        return new URL(origin).host === host;
    }

    return false;
}

export async function GET(request: Request) {
    try {

        const API_KEY = process.env.API_KEY;
        const ENDPOINT = process.env.ENDPOINT;
        const QUERY = process.env.QUERY;
        const timestamp = Date.now();

        revalidatePath(ENDPOINT as string);


        if (!(await validateRequest(request))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const response = await fetch(
            `${ENDPOINT}?${QUERY}=${API_KEY}&time=${timestamp}`,
            {
                next: { revalidate: 0 },
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            }
        );

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Error fetching tokens" }, { status: 500 });
    }
} 