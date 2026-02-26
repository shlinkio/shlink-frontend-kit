import { clsx } from 'clsx';
import type { FC, HTMLProps, ReactNode } from 'react';
import { useEffect , useRef,useState  } from 'react';

export type DetailsProps = Omit<HTMLProps<HTMLDetailsElement>, 'ref'> & {
  summary: ReactNode;
  summaryClasses?: string;
};

/**
 * Hide extended details under a collapsible area with an always-visible summary.
 */
export const Details: FC<DetailsProps> = ({ children, summary, summaryClasses, ...rest }) => {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const detailsEl = detailsRef.current;
    const toggleHandler = () => setIsOpen(!!detailsEl?.open);

    detailsEl?.addEventListener('toggle', toggleHandler);
    return () => detailsEl?.removeEventListener('toggle', toggleHandler);
  }, []);

  return (
    <details ref={detailsRef} {...rest}>
      <summary className={clsx('focus-ring px-1 -mx-1 rounded-sm', summaryClasses)}>{summary}</summary>
      {isOpen && (
        <div className="mt-3 flex flex-col gap-y-3">
          {children}
        </div>
      )}
    </details>
  );
};
