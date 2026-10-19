// Published USD monthly list prices checked 19 October 2026; not checkout quotes.
export const keapContactBands = [
  { contacts: 1500, monthly: 299 }, { contacts: 2500, monthly: 335 },
  { contacts: 4000, monthly: 383 }, { contacts: 6500, monthly: 449 },
  { contacts: 11500, monthly: 539 }, { contacts: 16500, monthly: 629 },
  { contacts: 26500, monthly: 719 },
] as const;
export function keapMonthly(users: number, contacts: number, annual = false): number | null {
  if (annual || !Number.isInteger(users) || users < 1 || users > 50) return null;
  const band = keapContactBands.find(item => item.contacts === contacts);
  return band ? band.monthly + 39 * Math.max(users - 2, 0) : null;
}
