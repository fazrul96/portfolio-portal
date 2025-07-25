import {Files} from '../../shared/types/portal.type';

export const FILE_STATE_DEFAULTS: FileStateModel = {
  resumeFiles: {
    folders: [], files: []
  },
  certificateFiles: {
    folders: [], files: []
  },
  imageFiles: {
    folders: [], files: []
  },
  portfolioFiles: {
    folders: [], files: []
  },
  loading: false,
  error: null,
};

export interface FileStateModel  {
  resumeFiles: Files;
  certificateFiles: Files;
  imageFiles: Files;
  portfolioFiles: Files;
  viewingBlob?: Blob;
  presignedUrl?: string;
  loading: boolean;
  error: string | null;
}
