import { useRef } from 'react';

/** @deprecated Use `useRef<T>(null) instead */
export const useElementRef = <T extends HTMLElement>() => useRef<T>(null);
