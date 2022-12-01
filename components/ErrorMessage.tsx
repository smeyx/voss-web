import type { ReactElement } from 'react';
type ErrorMessageProps = {
  errorMessage: string;
}

export default function ErrorMessage({ errorMessage }: ErrorMessageProps): ReactElement {
  return (
    <aside className="rounded-md border-red-800 bg-red-100 p-5">
      <p className="text-red-800">{errorMessage && errorMessage}</p>
    </aside>
  );
}
