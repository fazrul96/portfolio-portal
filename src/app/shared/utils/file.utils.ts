import {COMMON_CONSTANTS} from '../constants/common.constants';

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k: number = 1024;
  const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i: number = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + COMMON_CONSTANTS.SPACE + sizes[i];
}
