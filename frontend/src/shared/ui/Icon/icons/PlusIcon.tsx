import type { FC } from 'react';

export const PlusIcon: FC = () => (
  <>
    <line
      x1="12"
      y1="4"
      x2="12"
      y2="20"
      stroke="currentColor"
      strokeWidth={2}
      vectorEffect="nonScalingStroke"
    />
    <line
      x1="4"
      y1="12"
      x2="20"
      y2="12"
      stroke="currentColor"
      strokeWidth={2}
      vectorEffect="nonScalingStroke"
    />
  </>
);
