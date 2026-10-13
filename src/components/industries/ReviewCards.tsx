import type { ReactNode } from "react";
import { Star } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/industry-review-cards.css";

/** Shared illustrative review UI. It does not submit a review or show a customer rating. */
export function ReviewInvitation({
  sender,
  children,
  visible = true,
}: {
  sender: string;
  children: ReactNode;
  visible?: boolean;
}) {
  return (
    <div
      className={`zapla-review-card zapla-review-invitation ${visible ? "is-visible" : "is-hidden"}`}
      aria-hidden={!visible}
    >
      <div className="zapla-review-sender">
        <ZaplaPetal size={24} />
        <span>{sender}</span>
      </div>
      <p className="zapla-review-message">{children}</p>
      <span className="zapla-review-link">Leave a Google review</span>
    </div>
  );
}

export function GoogleReviewCard({
  heading = "How was your visit?",
  visible = true,
}: {
  heading?: string;
  visible?: boolean;
}) {
  return (
    <div
      className={`zapla-review-card zapla-review-rating ${visible ? "is-visible" : "is-hidden"}`}
      aria-hidden={!visible}
    >
      <span className="zapla-review-google" role="img" aria-label="Google">
        {"Google".split("").map((letter, index) => (
          <span key={index} aria-hidden="true">
            {letter}
          </span>
        ))}
      </span>
      <h3 className="zapla-review-heading">{heading}</h3>
      <div className="zapla-review-stars" role="img" aria-label="Five unselected rating stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} size={29} strokeWidth={1.5} aria-hidden="true" />
        ))}
      </div>
      <p className="zapla-review-prompt">Share your experience</p>
    </div>
  );
}
