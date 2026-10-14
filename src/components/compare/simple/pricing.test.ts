import { describe, expect, it } from 'vitest';
import { pipedriveSimple } from './pipedrive';
import { teamPricing, TEAM_SIZES } from './types';

describe('owner-confirmed concise offer', () => {
  it.each(TEAM_SIZES)('keeps Follow-Through at A$399 for %i users', team => {
    expect(teamPricing(pipedriveSimple.offer, team).zaplaMonthly).toBe(399);
  });
  it('keeps required Follow-Through launch at A$1,997', () => {
    expect(teamPricing(pipedriveSimple.offer, 20).requiredLaunch).toBe(1997);
  });
  it.each(TEAM_SIZES)('shows %i paid Pipedrive seats', team => {
    expect(teamPricing(pipedriveSimple.offer, team).competitorSeats).toBe(team);
  });
  it('prices Growth at A$699 monthly', () => { expect(pipedriveSimple.offer.growthMonthly).toBe(699); });
  it('sets required Growth launch from A$2,997', () => { expect(pipedriveSimple.offer.growthLaunch).toBe(2997); });
  it('includes unlimited users', () => { expect(pipedriveSimple.offer.unlimitedUsers).toBe(true); });
  it('has no free trial', () => { expect(pipedriveSimple.offer.trial).toBe(false); });
  it('ties every row and foundation to existing sources', () => {
    const ids = new Set<string>(pipedriveSimple.sources.map(source => source.id));
    for (const row of pipedriveSimple.rows) for (const cell of [row.competitor, row.zapla]) {
      expect(cell.sources.length).toBeGreaterThan(0);
      for (const id of cell.sources) expect(ids.has(id)).toBe(true);
    }
    for (const foundation of pipedriveSimple.foundations) for (const id of foundation.sources) expect(ids.has(id)).toBe(true);
  });
});