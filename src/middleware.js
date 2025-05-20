import { UAParser } from 'ua-parser-js';
import { NextResponse } from "next/server";

export function middleware(request) {
    const uaString = request.headers.get("user-agent") || "";
    const parser = new UAParser(uaString);
    const ua = parser.getResult();
    const response = NextResponse.next();

    const isMobile = ua.device.type === "mobile" || ua.device.type === "tablet";
    const viewport = isMobile ? "mobile" : "desktop";

    response.headers.set("x-viewport", viewport);

    return response;
}