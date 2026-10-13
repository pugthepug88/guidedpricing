import type { ReactNode } from "react";
import { siGoogle } from "simple-icons";
import { Star } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/industry-review-cards-v3.css";

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
      className={`zapla-review3-card zapla-review3-invitation ${visible ? "is-visible" : "is-hidden"}`}
      aria-hidden={!visible}
    >
      <div className="zapla-review3-sender">
        <ZaplaPetal size={24} />
        <span>{sender}</span>
      </div>
      <p className="zapla-review3-message">{children}</p>
      <span className="zapla-review3-link">Leave a Google review</span>
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
      className={`zapla-review3-card zapla-review3-rating ${visible ? "is-visible" : "is-hidden"}`}
      aria-hidden={!visible}
    >
      <span className="zapla-review3-google" role="img" aria-label="Google">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="#4285f4" aria-hidden="true"><path d={siGoogle.path}/></svg><span className="v3-google-name" aria-hidden="true">Google</span>
      </span>
      <p className="v3-example-note">Illustrative review form</p><h3 className="zapla-review3-heading">{heading}</h3>
      <div className="zapla-review3-stars" role="img" aria-label="Five unselected rating stars in an illustrative review form">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} size={29} strokeWidth={1.5} aria-hidden="true" />
        ))}
      </div>
      <p className="zapla-review3-prompt">Share your experience</p>
    </div>
  );
}
