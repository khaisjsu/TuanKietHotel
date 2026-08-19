import { getDb } from "../../../db";
import { bookings } from "../../../db/schema";

function toRouteErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "Unexpected error";
  const detail =
    error instanceof Error && error.cause instanceof Error ? error.cause.message : "";
  const combined = `${message}\n${detail}`;

  if (combined.includes("no such table") || combined.includes('from "bookings"')) {
    return "The bookings table is unavailable. Generate the migration locally with `npm run db:generate`, then deploy so the platform can apply the generated SQL to the real D1 database.";
  }

  return message;
}

function isValidDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      roomName?: string;
      checkIn?: string;
      checkOut?: string;
      guests?: number | string;
      fullName?: string;
      email?: string;
      phone?: string;
      notes?: string;
    };

    const roomName = payload.roomName?.trim() ?? "";
    const checkIn = payload.checkIn?.trim() ?? "";
    const checkOut = payload.checkOut?.trim() ?? "";
    const guests = Number(payload.guests ?? 2);
    const fullName = payload.fullName?.trim() ?? "";
    const email = payload.email?.trim() ?? "";
    const phone = payload.phone?.trim() ?? "";
    const notes = payload.notes?.trim() ?? "";

    if (!roomName) {
      return Response.json({ error: "Please choose a room." }, { status: 400 });
    }
    if (!isValidDate(checkIn) || !isValidDate(checkOut)) {
      return Response.json({ error: "Please provide valid check-in and check-out dates." }, { status: 400 });
    }
    if (Date.parse(checkOut) <= Date.parse(checkIn)) {
      return Response.json({ error: "Check-out must be after check-in." }, { status: 400 });
    }
    if (!Number.isFinite(guests) || guests < 1 || guests > 12) {
      return Response.json({ error: "Please provide a valid number of guests." }, { status: 400 });
    }
    if (!fullName) {
      return Response.json({ error: "Please enter your full name." }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return Response.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const db = getDb();
    const [booking] = await db
      .insert(bookings)
      .values({ roomName, checkIn, checkOut, guests, fullName, email, phone, notes })
      .returning();

    return Response.json({ booking }, { status: 201 });
  } catch (error) {
    return Response.json({ error: toRouteErrorMessage(error) }, { status: 500 });
  }
}
