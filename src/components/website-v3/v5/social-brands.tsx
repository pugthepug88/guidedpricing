/* Recognisable social platform marks for the v5 Social Planner scene.
   Drawn as simple in-house SVGs in each platform's brand colours so the
   integration tiles read instantly without shipping third-party assets. */

type MarkProps = { size?: number; className?: string };

const box = (size: number) => ({ width: size, height: size });

export function FacebookMark({ size = 26, className }: MarkProps) {
  return (
    <svg {...box(size)} viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="9" fill="#1877F2" />
      <path
        d="M20.6 16.6h-2.8V25h-3.7v-8.4H12v-3.2h2.1v-2c0-2.6 1.5-4.1 4.1-4.1 1 0 1.8.1 2.1.1v3h-1.3c-1 0-1.3.5-1.3 1.4v1.6h2.9l-.4 3.2Z"
        fill="#fff"
      />
    </svg>
  );
}

export function InstagramMark({ size = 26, className }: MarkProps) {
  return (
    <svg {...box(size)} viewBox="0 0 32 32" className={className} aria-hidden>
      <defs>
        <linearGradient id="zaplaIgGrad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFD521" />
          <stop offset="30%" stopColor="#F50000" />
          <stop offset="62%" stopColor="#B900B4" />
          <stop offset="100%" stopColor="#5B4FE9" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#zaplaIgGrad)" />
      <rect
        x="8"
        y="8"
        width="16"
        height="16"
        rx="5.2"
        fill="none"
        stroke="#fff"
        strokeWidth="2.1"
      />
      <circle cx="16" cy="16" r="4.1" fill="none" stroke="#fff" strokeWidth="2.1" />
      <circle cx="21.4" cy="10.7" r="1.35" fill="#fff" />
    </svg>
  );
}

export function LinkedInMark({ size = 26, className }: MarkProps) {
  return (
    <svg {...box(size)} viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="9" fill="#0A66C2" />
      <circle cx="10.6" cy="10.3" r="2.1" fill="#fff" />
      <rect x="8.9" y="13.6" width="3.4" height="10" rx="1" fill="#fff" />
      <path
        d="M15.2 13.6h3.2v1.4c.6-1 1.7-1.7 3.2-1.7 2.5 0 4 1.6 4 4.6v5.7h-3.4v-5.2c0-1.4-.6-2.2-1.8-2.2-1.1 0-1.8.8-1.8 2.2v5.2h-3.4v-10Z"
        fill="#fff"
      />
    </svg>
  );
}

export function TikTokMark({ size = 26, className }: MarkProps) {
  return (
    <svg {...box(size)} viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="9" fill="#0B0B0F" />
      <path
        d="M19.1 7.5c.4 2.3 1.8 3.7 4.1 4v2.8c-1.4 0-2.7-.4-3.9-1.2v5.6c0 3.6-2.6 5.9-5.8 5.9-2.9 0-5.3-2.2-5.3-5.1 0-3.1 2.6-5.4 6.1-4.9v3c-1.7-.5-3.2.4-3.2 1.9 0 1.3 1 2.2 2.3 2.2 1.4 0 2.5-1 2.5-2.7V7.5h3.2Z"
        fill="#25F4EE"
        transform="translate(-1.3 1.1)"
      />
      <path
        d="M19.1 7.5c.4 2.3 1.8 3.7 4.1 4v2.8c-1.4 0-2.7-.4-3.9-1.2v5.6c0 3.6-2.6 5.9-5.8 5.9-2.9 0-5.3-2.2-5.3-5.1 0-3.1 2.6-5.4 6.1-4.9v3c-1.7-.5-3.2.4-3.2 1.9 0 1.3 1 2.2 2.3 2.2 1.4 0 2.5-1 2.5-2.7V7.5h3.2Z"
        fill="#FE2C55"
        transform="translate(1.1 -0.5)"
      />
      <path
        d="M19.1 7.5c.4 2.3 1.8 3.7 4.1 4v2.8c-1.4 0-2.7-.4-3.9-1.2v5.6c0 3.6-2.6 5.9-5.8 5.9-2.9 0-5.3-2.2-5.3-5.1 0-3.1 2.6-5.4 6.1-4.9v3c-1.7-.5-3.2.4-3.2 1.9 0 1.3 1 2.2 2.3 2.2 1.4 0 2.5-1 2.5-2.7V7.5h3.2Z"
        fill="#fff"
      />
    </svg>
  );
}

export function PinterestMark({ size = 26, className }: MarkProps) {
  return (
    <svg {...box(size)} viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="9" fill="#E60023" />
      <path
        d="M16.6 7.4c-5 0-7.6 3.4-7.6 6.4 0 1.8.7 3.3 2.2 3.9.3.1.5 0 .5-.3l.2-.9c.1-.3 0-.4-.2-.6-.5-.6-.8-1.4-.8-2.4 0-2.9 2.2-5.5 5.7-5.5 3.1 0 5 1.9 5 4.4 0 3.3-1.5 6.1-3.7 6.1-1.1 0-1.9-.9-1.6-2 .3-1.4.9-2.8.9-3.8 0-.9-.5-1.6-1.5-1.6-1.2 0-2.1 1.2-2.1 2.8 0 1 .3 1.7.3 1.7l-1.4 5.7c-.3 1.4-.1 3.1 0 3.3.1.1.2.1.3 0 .1-.2 1.4-1.7 1.8-3.3l.7-2.6c.4.7 1.5 1.3 2.6 1.3 3.5 0 5.9-3.2 5.9-7.4 0-3.2-2.7-6.2-6.9-6.2Z"
        fill="#fff"
      />
    </svg>
  );
}

export function GoogleBusinessMark({ size = 26, className }: MarkProps) {
  return (
    <svg {...box(size)} viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="9" fill="#fff" stroke="#E2E8F0" />
      <path d="M6 13.6 8.9 7.4h5.2l-1.3 6.2H6Z" fill="#4285F4" />
      <path d="M12.8 13.6 14.1 7.4h5.2l.5 6.2h-7Z" fill="#EA4335" />
      <path d="M19.8 13.6 19.3 7.4h4.9L26 13.6h-6.2Z" fill="#FBBC05" />
      <path d="M8.4 15.4h15.2v9.2H8.4z" fill="#34A853" />
      <path d="M8.4 15.4h15.2v2.1H8.4z" fill="#0F9D58" opacity=".55" />
      <rect x="13.4" y="18.6" width="5.2" height="6" rx="1" fill="#fff" opacity=".92" />
    </svg>
  );
}

export function YouTubeMark({ size = 26, className }: MarkProps) {
  return (
    <svg {...box(size)} viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="9" fill="#fff" stroke="#E2E8F0" />
      <rect x="4.5" y="9" width="23" height="14" rx="4.4" fill="#FF0000" />
      <path d="M14 12.7 20.2 16 14 19.3z" fill="#fff" />
    </svg>
  );
}

export function ThreadsMark({ size = 26, className }: MarkProps) {
  return (
    <svg {...box(size)} viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="9" fill="#0B0B0F" />
      <path
        d="M16.8 24.5c-5 0-8-3.1-8-8.5s3.1-8.5 8.1-8.5c3.5 0 5.9 1.6 6.9 4.2l-2.4.9c-.7-1.8-2.2-2.8-4.5-2.8-3.4 0-5.5 2.2-5.5 6.2s2 6.1 5.4 6.1c2.4 0 4-1.1 4-2.7 0-1.2-.9-2-2.5-2.3.2-1.3 1-2.1 2.2-2.1 2 0 3.4 1.6 3.4 3.9 0 3.3-2.9 5.6-7.1 5.6Z"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="17.4" cy="16.4" r="2.6" fill="none" stroke="#fff" strokeWidth="2" />
    </svg>
  );
}
