import type { StatItem } from '../types'

export const heroStats: StatItem[] = [
  { value: 40, suffix: 'M', label: 'Annual Visitors' },
  { value: 520, suffix: '+', label: 'Stores' },
  { value: 1, prefix: '$', suffix: 'B+', label: 'Annual Sales' },
  { value: 12, suffix: 'min', label: 'from MSP Airport' },
]

export const whyStats: StatItem[] = [
  { value: 40000000, suffix: '', label: 'Annual Visitors' },
  { value: 162, prefix: '$', suffix: '', label: 'Avg Spend Per Visit' },
  { value: 25000000, suffix: '', label: 'Out-of-State Guests' },
  { value: 30000000, suffix: '', label: 'Within One Day\'s Drive' },
]

export const visitorOrigin = [
  { label: 'Local (MN)', percent: 35, color: '#C9A84C' },
  { label: 'Regional', percent: 25, color: '#E4C97A' },
  { label: 'Out-of-State', percent: 30, color: '#9CA3AF' },
  { label: 'International', percent: 10, color: '#6B7280' },
]

export const retailStats = [
  { value: '520+', label: 'Specialty Stores' },
  { value: '$1B+', label: 'Combined Annual Sales' },
  { value: '100+', label: 'MN-Exclusive Stores' },
  { value: '2.5M', label: 'Sq Ft Leasable' },
]

export const eventStats = [
  { value: '400+', label: 'Events Per Year' },
  { value: '1.5M', label: 'Visitors in 10 Days (Super Bowl LII)' },
  { value: '26,300', label: 'Sq Ft Hotel Event Space' },
  { value: '1,700', label: 'Grand Ballroom Capacity' },
]
