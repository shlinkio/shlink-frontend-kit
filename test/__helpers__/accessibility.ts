import axe from 'axe-core';

export const checkAccessibility = async ({ container }: { container: HTMLElement }) => {
  const result = await axe.run(container);
  expect(result.violations).toStrictEqual([]);
};
