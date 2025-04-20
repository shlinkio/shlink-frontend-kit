import { clsx } from 'clsx';
import type { FC, HTMLProps, ReactNode } from 'react';
import { useEffect , useRef,useState  } from 'react';

export type DetailsProps = Omit<HTMLProps<HTMLDetailsElement>, 'ref'> & {
  summary: ReactNode;
  summaryClasses?: string;
};

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
      <summary className={clsx('tw:focus-ring tw:px-1 tw:-mx-1 tw:rounded-sm', summaryClasses)}>{summary}</summary>
      {isOpen && (
        <div className="tw:mt-3 tw:flex tw:flex-col tw:gap-y-3">
          {children}
        </div>
      )}
    </details>
  );
};
