import type { ReactNode } from 'react';

export type Size = 'sm' | 'md' | 'lg';

export type RequiredReactNode = Exclude<ReactNode, undefined | null>;
