import { getSystemPreferredTheme } from '../../src';

describe('getSystemPreferredTheme', () => {
  it.each([
    { matches: true, expectedTheme: 'dark' },
    { matches: false, expectedTheme: 'light' },
  ])('returns expected theme', ({ matches, expectedTheme }) => {
    const matchMedia = vi.fn().mockReturnValue({ matches });

    expect(getSystemPreferredTheme(matchMedia)).toEqual(expectedTheme);
    expect(matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
  });
});
