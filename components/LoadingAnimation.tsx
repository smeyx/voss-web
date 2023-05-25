import React from 'react'
import { Spinner } from 'phosphor-react';

interface Props extends React.HTMLProps<HTMLDivElement> {
    
}
const LoadingAnimation: React.FC<Props> = ({ className }): JSX.Element => {
  return (
    <div className={["flex items-center justify-center", className].join(" ")}>
      <Spinner size={20} className="animate-spin-slow" />
    </div>
  );
}

export default LoadingAnimation;