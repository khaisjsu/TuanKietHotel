import type { Metadata } from "next";
import { desc } from "drizzle-orm";
import { chatGPTSignOutPath, requireChatGPTUser } from "../../chatgpt-auth";
import { getDb } from "../../../db";
import { bookings } from "../../../db/schema";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Booking requests | Tuan Kiet Retreat",
};

export default async function AdminBookingsPage() {
  const user = await requireChatGPTUser("/admin/bookings");

  let rows: Awaited<ReturnType<typeof loadBookings>> = [];
  let loadError: string | null = null;
  try {
    rows = await loadBookings();
  } catch (error) {
    loadError =
      error instanceof Error
        ? error.message
        : "Unable to load booking requests right now.";
  }

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <p className="eyebrow">Family dashboard</p>
          <h1>Booking requests</h1>
        </div>
        <p className="admin-signed-in">Signed in as {user.displayName} · <a href={chatGPTSignOutPath("/admin/bookings")}>Sign out</a></p>
      </header>

      {loadError ? (
        <p className="admin-empty">{loadError}</p>
      ) : rows.length === 0 ? (
        <p className="admin-empty">No booking requests yet. New requests from the website will show up here.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Ref</th>
                <th>Guest</th>
                <th>Room</th>
                <th>Dates</th>
                <th>Guests</th>
                <th>Contact</th>
                <th>Notes</th>
                <th>Requested</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>#{String(row.id).padStart(5, "0")}</td>
                  <td>{row.fullName}</td>
                  <td>{row.roomName}</td>
                  <td>
                    {row.checkIn} → {row.checkOut}
                  </td>
                  <td>{row.guests}</td>
                  <td>
                    <a href={`mailto:${row.email}`}>{row.email}</a>
                    {row.phone ? <div>{row.phone}</div> : null}
                  </td>
                  <td>{row.notes || "—"}</td>
                  <td>{row.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

async function loadBookings() {
  const db = getDb();
  return db.select().from(bookings).orderBy(desc(bookings.createdAt), desc(bookings.id)).limit(200);
}
