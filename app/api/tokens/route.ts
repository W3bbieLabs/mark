import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const API_KEY = process.env.API_KEY;
        const ENDPOINT = process.env.ENDPOINT;
        const QUERY = process.env.QUERY;
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