const PETAL_PATH =
  "M80 14 C95 14 104 25 102 42 C100 58 92 70 80 82 C68 70 60 58 58 42 C56 25 65 14 80 14 Z";

const PETAL_COLORS = ["#E97D62", "#C96C85", "#DDA34B", "#99A36D", "#9B86B8", "#D58C75"] as const;

export function ZaplaPetal({
  size = 34,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      aria-hidden="true"
      className={"block " + className}
    >
      {PETAL_COLORS.map((color, index) => (
        <g key={color} transform={`rotate(${index * 60} 80 80)`}>
          <path d={PETAL_PATH} fill={color} />
        </g>
      ))}
      <circle cx="80" cy="80" r="14" fill="#111214" />
    </svg>
  );
}
