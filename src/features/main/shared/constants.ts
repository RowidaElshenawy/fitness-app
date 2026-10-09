import type { NavLinkItem, StatItem } from '../types';

export const NAV_LINKS: NavLinkItem[] = [
  { key: 'home', path: '' },
  { key: 'about', path: 'about' },
  { key: 'classes', path: 'classes' },
  { key: 'healthy', path: 'healthy' },
];

export const HERO_STATS: StatItem[] = [
  { value: '1200+', labelKey: 'main.header.hero.stats.members' },
  { value: '12+', labelKey: 'main.header.hero.stats.trainers' },
  { value: '20+', labelKey: 'main.header.hero.stats.experience' },
];
