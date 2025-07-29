import {Files} from '../../shared/types/portal.type';
import {DEFAULT_FOLDER_FILTER} from '../../shared/constants/file.constants';

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
  portfolioBucket: {
    folders: [], files: []
  },
  folderFilter: DEFAULT_FOLDER_FILTER,
};

export interface FileStateModel  {
  resumeFiles: Files;
  certificateFiles: Files;
  imageFiles: Files;
  presignedUrl?: string;
  portfolioBucket: Files;
  folderFilter?: string[];
}
