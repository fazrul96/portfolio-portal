import {COMMON_CONSTANTS} from '../constants/common.constants';

export function formatFileSize(bytes: number = 0): string {
  if (bytes === 0) return '0 Bytes';
  const k: number = 1024;
  const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i: number = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + COMMON_CONSTANTS.SPACE + sizes[i];
}

export function triggerBrowserDownload(blob: Blob, fileName: string): void {
  const file = new Blob([blob], { type: blob.type || 'application/octet-stream' });
  const url: string = window.URL.createObjectURL(file);

  const link: HTMLAnchorElement = document.createElement('a');
  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
}

export function handleBlobResponse(blob: Blob, fileName: string, isDownload: boolean): void {
  const file = new Blob([blob], { type: blob.type || 'application/octet-stream' });
  const url: string = window.URL.createObjectURL(file);

  if (isDownload) {
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(url, '_blank');
  }

  URL.revokeObjectURL(url);
}

/**
 * Extracts the last folder name from an S3-style path string.
 * Example: 'portfolio-content/resume/' → 'resume'
 */
export function extractFolderNameFromPath(path: any): string {
  const parts = path.split('/');
  const trimmed = parts.filter(Boolean);
  return trimmed[trimmed.length - 1];
}
