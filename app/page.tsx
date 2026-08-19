import BookingForm from "./booking-form";

const rooms = [
  {
    name: "Pine View Suite",
    detail: "2 guests · King bed · 42 m²",
    price: "From $145 / night",
    features: ["Breakfast included", "Free cancellation", "Mountain view"],
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=88",
  },
  {
    name: "Garden Studio",
    detail: "2 guests · Queen bed · 34 m²",
    price: "From $110 / night",
    features: ["Breakfast included", "Free cancellation", "Garden access"],
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=88",
  },
  {
    name: "Family Residence",
    detail: "4 guests · 2 bedrooms · 68 m²",
    price: "From $220 / night",
    features: ["Breakfast included", "Free crib on request", "Connecting rooms"],
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=88",
  },
];

const amenities = [
  ["01", "Breakfast, slowly", "Seasonal Vietnamese breakfast, local coffee, and warm bread served until 11."],
  ["02", "Restorative rituals", "Herbal baths, in-room massage, and quiet corners designed for doing very little."],
  ["03", "Made for Da Lat", "Curated walks, private drivers, and local recommendations beyond the usual guidebook."],
  ["04", "Thoughtful by nature", "Refillable amenities, local materials, and produce sourced from nearby farms."],
  ["05", "Family friendly", "Cribs, connecting rooms, board games, and a garden safe enough to run in."],
  ["06", "Free Wi‑Fi & parking", "Fast Wi‑Fi throughout, on-site parking, and 24-hour front desk support."],
];

const gallery = [
  { alt: "Suite bedroom with pine forest view", src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80" },
  { alt: "Breakfast spread on a wooden table", src: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=80" },
  { alt: "Garden courtyard at dusk", src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80" },
  { alt: "Bathroom with soaking tub", src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=900&q=80" },
  { alt: "Pine forest trail near the retreat", src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80" },
  { alt: "Family lounging by the fire pit", src: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=900&q=80" },
];

const reviews = [
  {
    quote:
      "We came for two nights and stayed for five. Tuan Kiet has that rare quality: everything feels cared for, yet nothing feels overdone.",
    author: "Mai & Linh",
    place: "Ho Chi Minh City",
    rating: 5,
  },
  {
    quote:
      "Traveling with two kids under six is never easy, but the family residence and the garden made it feel effortless. Breakfast was the highlight of every morning.",
    author: "The Nguyen Family",
    place: "Hanoi",
    rating: 5,
  },
  {
    quote:
      "Quiet, considered, and genuinely warm hospitality. The staff remembered our names by day two. We're already planning our return.",
    author: "Daniel P.",
    place: "Singapore",
    rating: 5,
  },
];

const faqs = [
  {
    question: "What time is check-in and check-out?",
    answer: "Check-in is from 2:00 PM and check-out is by 11:00 AM. Early arrival and late departure can be arranged in advance, subject to availability.",
  },
  {
    question: "What is your cancellation policy?",
    answer: "Free cancellation up to 3 days before check-in. Cancellations within 3 days are subject to a one-night charge.",
  },
  {
    question: "Is the retreat suitable for children?",
    answer: "Yes — the Family Residence has connecting rooms, we provide cribs and high chairs on request, and the garden and grounds are safe for children to explore.",
  },
  {
    question: "Do you allow pets?",
    answer: "Well-behaved pets are welcome in select ground-floor rooms with advance notice. Please mention this in your booking request.",
  },
  {
    question: "Is breakfast included?",
    answer: "Yes, a seasonal Vietnamese breakfast with local coffee is included with every room and served until 11:00 AM.",
  },
  {
    question: "Is parking available?",
    answer: "Yes, free on-site parking is available for all guests, along with airport pickup arranged on request.",
  },
];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ room?: string | string[] }>;
}) {
  const resolved = await searchParams;
  const roomParam = Array.isArray(resolved.room) ? resolved.room[0] : resolved.room;
  const defaultRoom = rooms.find((room) => room.name === roomParam)?.name;

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Tuan Kiet Retreat home">
          <span>Tuan Kiet</span>
          <small>Retreat · Da Lat</small>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#stay">Stay</a>
          <a href="#gallery">Gallery</a>
          <a href="#reviews">Reviews</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="button button-small" href="#book-form">Book your stay</a>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-heading">
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow light">A private retreat in Da Lat, Vietnam</p>
          <h1 id="hero-heading">A quieter way<br />to stay.</h1>
          <p className="hero-intro">
            Slow mornings, pine-scented air, and rooms made for unhurried days — for couples,
            friends, and the whole family.
          </p>
        </div>
        <div className="hero-note" aria-hidden="true">
          <span>11.9404° N</span><span>108.4583° E</span>
        </div>
        <a className="scroll-cue" href="#book-form">Discover the retreat <span>↓</span></a>
      </section>

      <section className="booking-bar" id="book" aria-label="Check room availability">
        <div className="booking-heading">
          <span className="eyebrow">Plan your escape</span>
          <strong>Check availability</strong>
        </div>
        <label>
          <span>Check in</span>
          <input type="date" name="check-in" aria-label="Check-in date" />
        </label>
        <label>
          <span>Check out</span>
          <input type="date" name="check-out" aria-label="Check-out date" />
        </label>
        <label>
          <span>Guests</span>
          <select name="guests" defaultValue="2" aria-label="Number of guests">
            <option value="1">1 guest</option>
            <option value="2">2 guests</option>
            <option value="3">3 guests</option>
            <option value="4">4 guests</option>
            <option value="5">5+ guests</option>
          </select>
        </label>
        <a className="booking-submit" href="#book-form">
          Find a room <span>↗</span>
        </a>
      </section>

      <section className="welcome" id="story">
        <div>
          <p className="eyebrow">Arrive. Exhale. Stay awhile.</p>
          <h2>Rest comes naturally here.</h2>
        </div>
        <div className="welcome-copy">
          <p>
            Tuan Kiet is a small, family-run retreat tucked into the pine hills of Da Lat—a
            place where considered design, local hospitality, and the landscape live in easy
            balance.
          </p>
          <a className="text-link" href="#stay">See our rooms <span>→</span></a>
        </div>
      </section>

      <section className="rooms" id="stay" aria-labelledby="rooms-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Rooms & residences</p>
            <h2 id="rooms-heading">Your room in the pines.</h2>
          </div>
          <p>Natural textures, soft light, and a view worth waking up for.</p>
        </div>
        <div className="room-grid">
          {rooms.map((room, index) => (
            <article className={`room-card room-${index + 1}`} key={room.name}>
              <div className="room-image-wrap">
                <img src={room.image} alt={`${room.name} at Tuan Kiet Retreat`} />
                <span className="room-number">0{index + 1}</span>
              </div>
              <div className="room-info">
                <div>
                  <h3>{room.name}</h3>
                  <p>{room.detail}</p>
                  <ul className="room-features">
                    {room.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="room-price">
                  <span>{room.price}</span>
                  <a href={`/?room=${encodeURIComponent(room.name)}#book-form`} aria-label={`Book ${room.name}`}>↗</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="experience" id="experience">
        <div className="experience-image" role="img" aria-label="Mist moving through Da Lat pine forest" />
        <div className="experience-copy">
          <p className="eyebrow light">The Da Lat rhythm</p>
          <h2>Let the day<br />unfold slowly.</h2>
          <p>
            Start with coffee in the garden. Follow a pine trail before lunch. Return for a
            long bath and dinner by the fire. We&rsquo;ll help with the details—or leave you to none at all.
          </p>
          <a className="button button-light" href="#book-form">
            Plan your experience
          </a>
        </div>
      </section>

      <section className="details" aria-labelledby="details-heading">
        <div className="details-title">
          <p className="eyebrow">A more considered stay</p>
          <h2 id="details-heading">Small details.<br />Deep comfort.</h2>
        </div>
        <div className="amenity-list">
          {amenities.map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="book-form-section" id="book-form" aria-labelledby="book-form-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Request your stay</p>
            <h2 id="book-form-heading">Let&rsquo;s hold your room.</h2>
          </div>
          <p>Send a request and our family will confirm availability by email within 24 hours.</p>
        </div>
        <BookingForm defaultRoom={defaultRoom} />
      </section>

      <section className="gallery" id="gallery" aria-labelledby="gallery-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A closer look</p>
            <h2 id="gallery-heading">Around the retreat.</h2>
          </div>
        </div>
        <div className="gallery-grid">
          {gallery.map((photo) => (
            <div className="gallery-item" key={photo.src}>
              <img src={photo.src} alt={photo.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      <section className="reviews" id="reviews" aria-labelledby="reviews-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">From our guestbook</p>
            <h2 id="reviews-heading">What families are saying.</h2>
          </div>
        </div>
        <div className="review-grid">
          {reviews.map((review) => (
            <article className="review-card" key={review.author}>
              <div className="review-stars" aria-label={`${review.rating} out of 5 stars`}>
                {"★".repeat(review.rating)}
              </div>
              <blockquote>&ldquo;{review.quote}&rdquo;</blockquote>
              <cite>
                {review.author} · {review.place}
              </cite>
            </article>
          ))}
        </div>
      </section>

      <section className="faq" id="faq" aria-labelledby="faq-heading">
        <div className="details-title">
          <p className="eyebrow">Good to know</p>
          <h2 id="faq-heading">Frequently<br />asked questions.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="location" id="contact" aria-labelledby="location-heading">
        <div className="location-copy">
          <p className="eyebrow">Find us</p>
          <h2 id="location-heading">Come see us in Da Lat.</h2>
          <p>Ward 4, Da Lat, Lam Dong, Vietnam — 15 minutes from the city center.</p>
          <div className="location-contact">
            <a href="mailto:stay@tuankietretreat.com">stay@tuankietretreat.com</a>
            <a href="tel:+842633555888">+84 263 355 5888</a>
          </div>
          <a className="button" href="#book-form">Request a booking</a>
        </div>
        <div className="location-map">
          <iframe
            title="Map showing Tuan Kiet Retreat in Da Lat, Vietnam"
            src="https://maps.google.com/maps?q=Da+Lat,+Lam+Dong,+Vietnam&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <section className="final-cta">
        <div>
          <p className="eyebrow light">Your room is waiting</p>
          <h2>Come away<br />for a while.</h2>
        </div>
        <a className="round-link" href="#book-form" aria-label="Request a booking">↗</a>
      </section>

      <footer>
        <div className="footer-brand">
          <span>Tuan Kiet</span>
          <p>A small, family-run retreat in the pine hills of Da Lat, Vietnam.</p>
        </div>
        <div>
          <p className="footer-label">Find us</p>
          <p>Ward 4, Da Lat<br />Lam Dong, Vietnam</p>
        </div>
        <div>
          <p className="footer-label">Contact</p>
          <a href="mailto:stay@tuankietretreat.com">stay@tuankietretreat.com</a>
          <a href="tel:+842633555888">+84 263 355 5888</a>
        </div>
        <div>
          <p className="footer-label">Follow</p>
          <a href="#top">Instagram</a>
          <a href="#top">Facebook</a>
          <a href="/admin/bookings">Family sign-in</a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Tuan Kiet Retreat</span>
          <span>Photography via Unsplash</span>
        </div>
      </footer>
    </main>
  );
}
