import type { ReactElement } from 'react';
interface ErrorMessageProps extends React.HTMLProps<HTMLParagraphElement> {
  errorMessage?: string;
}

export default function ErrorMessage({ children, className }: ErrorMessageProps): ReactElement {
  return (
    <aside className={ [className, 'rounded-md border-red-800 bg-red-100 p-5'].join(" ") }>
      <p className="text-red-800">
        { children }
      </p>
    </aside>
  );
}
