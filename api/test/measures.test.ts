// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { measureUpdateSchema } from '../src/measures.js';

describe('measure and funding-area validation', () => {
  it('accepts each MVP funding area', () => {
    for (const fundingArea of ['infrastructure_network_wlan', 'digital_devices', 'educational_software_platforms']) {
      expect(measureUpdateSchema.safeParse({ fundingArea }).success).toBe(true);
    }
  });

  it('rejects non-MVP funding areas and negative numeric data', () => {
    expect(measureUpdateSchema.safeParse({ fundingArea: 'teacher_training' }).success).toBe(false);
    expect(measureUpdateSchema.safeParse({ estimatedCostEur: -1 }).success).toBe(false);
  });

  it('accepts ISO implementation dates and rejects an end before the start', () => {
    expect(measureUpdateSchema.safeParse({ implementationStartDate: '2026-09-01', implementationEndDate: '2027-06-30' }).success).toBe(true);
    expect(measureUpdateSchema.safeParse({ implementationStartDate: '2027-06-30', implementationEndDate: '2026-09-01' }).success).toBe(false);
  });
});
