import assert from 'node:assert/strict';
import { pipedriveSimple } from './pipedrive';
import type { ComparisonRow } from './types';

// Data rules for the approved 21 October 2026 Pipedrive automation-limits change.
// Pipedrive scopes corroborated against current official documentation:
// https://support.pipedrive.com/en/article/automation-limits (10 actions per automation,
// 90 days total delay, 150 active automations on Premium) and
// https://support.pipedrive.com/en/article/automation-wait-for-condition (7 day maximum
// per wait-for-an-event step). Zapla "no cap" lines are owner-confirmed by Andrew Cao on
// 21 October 2026, not independently account-tested.
// Run with: bun src/components/compare/simple/pipedrive-automation-limits.test.ts

const rows: readonly ComparisonRow[] = pipedriveSimple.rows;
const automationRow = rows.find(row => row.id === 'email');

// The automation row exists and keeps its approved main values.
assert.ok(automationRow, 'automation row exists');
assert.equal(automationRow.label, 'Automation workflows');
assert.equal(automationRow.zapla.text, 'Unlimited');
assert.equal(automationRow.competitor.text, '150 active');

// Zapla cell lists the three owner-confirmed no-cap lines in order.
assert.deepEqual(automationRow.zapla.subLines, [
  'No action cap',
  'No total delay cap',
  'No condition wait cap',
]);

// Pipedrive cell lists the three documented numeric limits in order.
assert.deepEqual(automationRow.competitor.subLines, [
  '10 actions per workflow',
  '90 days total delay',
  '7 days per condition wait',
]);

// The paid workflow-count top-up qualification stays in the expandable note.
assert.match(automationRow.competitor.detail ?? '', /top-ups/);
assert.match(automationRow.competitor.detail ?? '', /150 active automations/);

// Both Pipedrive limit sources are linked from the competitor cell.
assert.ok(automationRow.competitor.sources.includes('automation-limits'));
assert.ok(automationRow.competitor.sources.includes('wait-condition'));
const sourceIds = pipedriveSimple.sources.map(source => source.id);
assert.ok(sourceIds.includes('automation-limits'));
assert.ok(sourceIds.includes('wait-condition'));

// No other row uses subLines, so other pages render exactly unchanged.
const allRows: readonly ComparisonRow[] = [...pipedriveSimple.rows, ...pipedriveSimple.growthRows, ...pipedriveSimple.optionalRows];
for (const row of allRows) {
  if (row.id === 'email') continue;
  assert.equal(row.zapla.subLines, undefined, `${row.id} zapla cell has no subLines`);
  assert.equal(row.competitor.subLines, undefined, `${row.id} competitor cell has no subLines`);
}

console.log('pipedrive-automation-limits data rules: all 6 checks passed');
