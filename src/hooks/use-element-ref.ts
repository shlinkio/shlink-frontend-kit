import { useRef } from 'react';

export const useElementRef = <T extends HTMLElement>() => useRef<T>(null);
