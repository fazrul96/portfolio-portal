import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import GDrive from './../components/storage/GDrive';
import DropBox from './../components/storage/DropBox';
import MinIo from './../components/storage/MinIo';

export const STORAGE_CONFIG = {
    gdrive: {
        label: 'GDrive',
        icon: <AddToDriveIcon />,
        component: <GDrive />,
    },
    dropbox: {
        label: 'DropBox',
        icon: <DriveFolderUploadIcon />,
        component: <DropBox />,
    },
    minio: {
        label: 'MinIo',
        icon: <DriveFolderUploadIcon />,
        component: <MinIo />,
    },
};

export const STORAGE_TABS = Object.keys(STORAGE_CONFIG).map((key) => ({
    label: STORAGE_CONFIG[key].label,
    icon: STORAGE_CONFIG[key].icon,
    component: STORAGE_CONFIG[key].component,
    value: key,
}));