// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { schoolUpdateSchema } from '../src/schools.js';

describe('school data validation', () => {
  it('accepts private sponsorship with a recognition status', () => {
    expect(schoolUpdateSchema.safeParse({ sponsorshipType: 'private', recognitionStatus: 'state_recognized' }).success).toBe(true);
  });

  it('rejects recognition status for non-private sponsorship', () => {
    expect(schoolUpdateSchema.safeParse({ sponsorshipType: 'public', recognitionStatus: 'state_recognized' }).success).toBe(false);
  });

  it('rejects unknown formal values', () => {
    expect(schoolUpdateSchema.safeParse({ federalState: 'UNKNOWN' }).success).toBe(false);
  });
});
