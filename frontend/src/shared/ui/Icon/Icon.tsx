import { type FC } from 'react';
import { ICON_REGISTRY, type IconName } from './icons';

export type { IconName };
import styles from './Icon.module.scss';

const ICON_SIZES = [12, 16, 18, 24, 28] as const;
export type IconSize = (typeof ICON_SIZES)[number];

const ICON_COLORS = ['inherit', 'primary', 'muted', 'secondary'] as const;
export type IconColor = (typeof ICON_COLORS)[number];

interface IconProps {
  name: IconName;
  size?: IconSize;
  color?: IconColor;
  'aria-hidden'?: boolean;
  className?: string;
}

const STROKE_ICONS: IconName[] = ['plus', 'search', 'users'];

const COLOR_CLASS: Record<IconColor, string> = {
  inherit: styles.colorInherit,
  primary: styles.colorPrimary,
  muted: styles.colorMuted,
  secondary: styles.colorSecondary,
};

export const Icon: FC<IconProps> = ({
  name,
  size = 24,
  color = 'inherit',
  'aria-hidden': ariaHidden = true,
  className,
}) => {
  const IconComponent = ICON_REGISTRY[name];
  const isStroke = STROKE_ICONS.includes(name);

  return (
    <svg
      className={[COLOR_CLASS[color], className].filter(Boolean).join(' ')}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden={ariaHidden}
      fill={isStroke ? 'none' : undefined}
      stroke={isStroke ? 'currentColor' : undefined}
      strokeWidth={isStroke ? 2 : undefined}
      strokeLinecap={isStroke ? 'round' : undefined}
      strokeLinejoin={isStroke ? 'round' : undefined}
    >
      <IconComponent />
    </svg>
  );
};
