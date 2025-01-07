import { NextResponse } from 'next/server';

async function validateRequest(request: Request) {
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
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
        if (!(await validateRequest(request))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const response = await fetch(
            `${ENDPOINT}?${QUERY}=${API_KEY}`,
            {
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