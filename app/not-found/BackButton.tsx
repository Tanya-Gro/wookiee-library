'use client';

import Button from '@/src/components/UI/button/Button';

export default function BackButton(): React.ReactNode {
  const handleClick = (): void => {
    window.history.back();
  };

  return <Button onClick={handleClick}>Back to base</Button>;
}
