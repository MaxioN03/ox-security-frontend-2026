import type { FC } from 'react';
import { ChevronDownIcon } from './ChevronDownIcon';
import { PlusIcon } from './PlusIcon';
import { SearchIcon } from './SearchIcon';
import { UsersIcon } from './UsersIcon';

export type IconName = 'plus' | 'search' | 'chevronDown' | 'users';

export const ICON_REGISTRY: Record<IconName, FC> = {
  plus: PlusIcon,
  search: SearchIcon,
  chevronDown: ChevronDownIcon,
  users: UsersIcon,
};
