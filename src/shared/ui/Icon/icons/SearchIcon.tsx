import type { FC } from 'react';

export const SearchIcon: FC = () => (
  <>
    <circle
      cx="11"
      cy="11"
      r="7"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    />
    <line
      x1="16"
      y1="16"
      x2="21"
      y2="21"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </>
);
