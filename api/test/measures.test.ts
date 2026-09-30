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
});
