import { describe, expect, test } from 'bun:test';
import { pipedriveSimple } from './pipedrive';

// Data rules for the approved 21 October 2026 Pipedrive automation-limits change.
// Pipedrive scopes corroborated against current official documentation:
// https://support.pipedrive.com/en/article/automation-limits (10 actions per automation,
// 90 days total delay, 150 active automations on Premium) and
// https://support.pipedrive.com/en/article/automation-wait-for-condition (7 day maximum
// per wait-for-an-event step). Zapla "no cap" lines are owner-confirmed by Andrew Cao on
// 21 October 2026, not independently account-tested.

const automationRow = pipedriveSimple.rows.find(row => row.id === 'email');

describe('Pipedrive automation workflow cell limits', () => {
  test('the automation row exists and keeps its approved main values', () => {
    expect(automationRow).toBeDefined();
    expect(automationRow!.label).toBe('Automation workflows');
    expect(automationRow!.zapla.text).toBe('Unlimited');
    expect(automationRow!.competitor.text).toBe('150 active');
  });

  test('Zapla cell lists the three owner-confirmed no-cap lines in order', () => {
    expect(automationRow!.zapla.subLines).toEqual([
      'No action cap',
      'No total delay cap',
      'No condition wait cap',
    ]);
  });

  test('Pipedrive cell lists the three documented numeric limits in order', () => {
    expect(automationRow!.competitor.subLines).toEqual([
      '10 actions per workflow',
      '90 days total delay',
      '7 days per condition wait',
    ]);
  });

  test('the paid workflow-count top-up qualification stays in the expandable note', () => {
    expect(automationRow!.competitor.detail).toContain('top-ups');
    expect(automationRow!.competitor.detail).toContain('150 active automations');
  });

  test('both Pipedrive limit sources are linked from the competitor cell', () => {
    expect(automationRow!.competitor.sources).toContain('automation-limits');
    expect(automationRow!.competitor.sources).toContain('wait-condition');
    const ids = pipedriveSimple.sources.map(source => source.id);
    expect(ids).toContain('automation-limits');
    expect(ids).toContain('wait-condition');
  });

  test('no other row on any comparison cell uses subLines, so other pages render unchanged', () => {
    const rows = [...pipedriveSimple.rows, ...pipedriveSimple.growthRows, ...pipedriveSimple.optionalRows];
    for (const row of rows) {
      if (row.id === 'email') continue;
      expect(row.zapla.subLines).toBeUndefined();
      expect(row.competitor.subLines).toBeUndefined();
    }
  });
});
