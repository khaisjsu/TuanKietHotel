"use client";

import { useState } from "react";

const roomOptions = ["Pine View Suite", "Garden Studio", "Family Residence"];

type Status = "idle" | "submitting" | "success" | "error";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function BookingForm({ defaultRoom }: { defaultRoom?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [reference, setReference] = useState<number | null>(null);
  const [summary, setSummary] = useState<{ room: string; checkIn: string; checkOut: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      roomName: String(data.get("room") ?? ""),
      checkIn: String(data.get("check-in") ?? ""),
      checkOut: String(data.get("check-out") ?? ""),
      guests: Number(data.get("guests") ?? 2),
      fullName: String(data.get("full-name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      notes: String(data.get("notes") ?? ""),
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { booking?: { id: number }; error?: string };

      if (!response.ok || !result.booking) {
        setStatus("error");
        setErrorMessage(result.error ?? "Something went wrong. Please try again.");
        return;
      }

      setReference(result.booking.id);
      setSummary({ room: payload.roomName, checkIn: payload.checkIn, checkOut: payload.checkOut });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("We couldn't reach the server. Please check your connection and try again.");
    }
  }

  if (status === "success" && summary) {
    return (
      <div className="booking-confirmation" role="status">
        <p className="eyebrow">Request received</p>
        <h3>Thank you, we&rsquo;ll confirm shortly.</h3>
        <p>
          Reference <strong>#{String(reference).padStart(5, "0")}</strong> — {summary.room}, {summary.checkIn} to{" "}
          {summary.checkOut}. A member of the family will email you to confirm availability and payment within 24
          hours.
        </p>
        <button type="button" className="button" onClick={() => setStatus("idle")}>
          Make another request
        </button>
      </div>
    );
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="booking-form-grid">
        <label>
          <span>Room</span>
          <select name="room" defaultValue={defaultRoom ?? roomOptions[0]} required>
            {roomOptions.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Check in</span>
          <input type="date" name="check-in" min={todayISO()} required />
        </label>
        <label>
          <span>Check out</span>
          <input type="date" name="check-out" min={todayISO()} required />
        </label>
        <label>
          <span>Guests</span>
          <select name="guests" defaultValue="2" required>
            <option value="1">1 guest</option>
            <option value="2">2 guests</option>
            <option value="3">3 guests</option>
            <option value="4">4 guests</option>
            <option value="5">5 guests</option>
            <option value="6">6+ guests</option>
          </select>
        </label>
        <label>
          <span>Full name</span>
          <input type="text" name="full-name" placeholder="Your name" required />
        </label>
        <label>
          <span>Email</span>
          <input type="email" name="email" placeholder="you@example.com" required />
        </label>
        <label>
          <span>Phone</span>
          <input type="tel" name="phone" placeholder="Optional" />
        </label>
        <label className="booking-form-notes">
          <span>Special requests</span>
          <textarea
            name="notes"
            rows={3}
            placeholder="Crib for a little one, dietary needs, early arrival, anything else we should know"
          />
        </label>
      </div>

      {status === "error" && (
        <p className="booking-form-error" role="alert">
          {errorMessage}
        </p>
      )}

      <button type="submit" className="button booking-form-submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending your request…" : "Request to book"}
      </button>
      <p className="booking-form-note">
        This sends a booking request — we&rsquo;ll confirm final availability and take payment details by email.
      </p>
    </form>
  );
}
