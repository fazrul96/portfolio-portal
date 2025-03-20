import DashboardIcon from '@mui/icons-material/Dashboard';
import MailIcon from '@mui/icons-material/Mail';
import ProjectIcon from '@mui/icons-material/Build';
import MediumIcon from '@mui/icons-material/Book';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import BackupIcon from '@mui/icons-material/Backup';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MosqueIcon from '@mui/icons-material/Mosque';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import PieChartIcon from '@mui/icons-material/PieChart';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ConstructionIcon from '@mui/icons-material/Construction';
import OpenAPIIcon from '@mui/icons-material/Api';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export const SIDEBAR_TEXT = {
    public: {
        dashboard: 'Dashboard',
        inbox: 'Inbox',
        component: 'Component',
        medium: 'Medium',
        module: 'Module',
        mosque: 'Mosque',
        guard: 'Guard',
        dietitian: 'Dietitian',
        ml: 'ML',
    },
    private: {
        workspace: 'GREDAVERSE',
        space: 'Space',
        webtoon: 'Webtoon',
        storage: 'Cloud-Storage',
        openapi: 'OpenAPI',
    },
};

export const SIDEBAR_ICONS = {
    dashboard: <DashboardIcon />,
    inbox: <MailIcon />,
    component: <ProjectIcon />,
    medium: <MediumIcon />,
    module: <ViewModuleIcon />,
    mosque: <MosqueIcon />,
    guard: <LocalPoliceIcon />,
    dietitian: <PieChartIcon />,
    ml: <AutoAwesomeIcon />,
    workspace: <WorkspacePremiumIcon />,
    space: <ConstructionIcon />,
    webtoon: <MenuBookIcon />,
    storage: <BackupIcon />,
    openapi: <OpenAPIIcon />,
};
