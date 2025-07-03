import {COMMON_CONSTANTS} from '../constants/common.constants';

export function formatCamelCase(path: string): string {
  return path
    .split('-')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

export function formatPremium(amount?: number, mode: string = ''): string {
  if (!amount) return '—';
  const normalizedMode = mode.toLowerCase();
  return `RM ${amount} / ${normalizedMode}`;
}

export function splitByComma(input: string): string[] {
  return input ? input.split(COMMON_CONSTANTS.COMMA).map(s => s.trim()).filter(Boolean) : [];
}
