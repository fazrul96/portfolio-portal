import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import {
    ROUTE_COMPONENT,
    ROUTE_DIETITIAN,
    ROUTE_GUARD,
    ROUTE_HOME, ROUTE_INBOX,
    ROUTE_MEDIUM, ROUTE_ML,
    ROUTE_MODULE,
    ROUTE_MOSQUE,
    ROUTE_OPENAPI,
    ROUTE_SPACE,
    ROUTE_STORAGE,
    ROUTE_WEBTOON
} from '../constants/AppRoutes';
import {SIDEBAR_ICONS, SIDEBAR_TEXT} from '../constants/SidebarConstants';
import * as React from "react";
import {Chip} from "@mui/material";

const createChip = (label, color) => {
    return <Chip label={label} color={color} size="small" />;
};

export const PUBLIC_NAVIGATION = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: SIDEBAR_TEXT.public.dashboard.toLocaleLowerCase(),
        title: SIDEBAR_TEXT.public.dashboard,
        icon: SIDEBAR_ICONS.dashboard,
        route: ROUTE_HOME,
        action: createChip("Completed", "success")
    },
    {
        segment: SIDEBAR_TEXT.public.inbox.toLocaleLowerCase(),
        title: SIDEBAR_TEXT.public.inbox,
        icon: SIDEBAR_ICONS.inbox,
        route: ROUTE_INBOX,
        action: createChip("Ongoing", "warning")
    },
    {
        segment: SIDEBAR_TEXT.public.medium.toLocaleLowerCase(),
        title: SIDEBAR_TEXT.public.medium,
        icon: SIDEBAR_ICONS.medium,
        route: ROUTE_MEDIUM,
        action: createChip("Completed", "success")
    },
    {
        segment: SIDEBAR_TEXT.public.module.toLocaleLowerCase(),
        title: SIDEBAR_TEXT.public.module,
        icon: SIDEBAR_ICONS.module,
        route: ROUTE_MODULE,
        children: [
            {
                segment: SIDEBAR_TEXT.public.component.toLocaleLowerCase(),
                title: SIDEBAR_TEXT.public.component,
                icon: SIDEBAR_ICONS.component,
                route: ROUTE_COMPONENT,
                action: createChip("Dev", "warning")
            }
        ],
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Analytics',
    },
    {
        segment: 'reports',
        title: 'Reports',
        icon: <BarChartIcon />,
        children: [
            {
                segment: 'sales',
                title: 'Sales',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'traffic',
                title: 'Traffic',
                icon: <DescriptionIcon />,
            },
        ],
    },
    {
        segment: 'integrations',
        title: 'Integrations',
        icon: <LayersIcon />,
    }
];

export const PRIVATE_NAVIGATION = [
    {
        kind: 'header',
        title: 'Workspace',
    },
    {
        segment: SIDEBAR_TEXT.private.workspace.toLocaleLowerCase(),
        title: SIDEBAR_TEXT.private.workspace,
        icon: SIDEBAR_ICONS.workspace,
        children: [
            {
                segment: SIDEBAR_TEXT.private.space.toLocaleLowerCase(),
                title: SIDEBAR_TEXT.private.space,
                icon: SIDEBAR_ICONS.space,
                route: ROUTE_SPACE,
                action: <Chip label="Ongoing" color="warning" size="small" />,
            },
            {
                segment: SIDEBAR_TEXT.private.webtoon.toLocaleLowerCase(),
                title: SIDEBAR_TEXT.private.webtoon,
                icon: SIDEBAR_ICONS.webtoon,
                route: ROUTE_WEBTOON,
                action: <Chip label="Completed" color="success" size="small" />,
            },
            {
                segment: SIDEBAR_TEXT.private.storage.toLocaleLowerCase(),
                title: SIDEBAR_TEXT.private.storage,
                icon: SIDEBAR_ICONS.storage,
                route: ROUTE_STORAGE,
                action: <Chip label="Completed" color="success" size="small" />,
            },
            {
                segment: SIDEBAR_TEXT.private.openapi.toLocaleLowerCase(),
                title: SIDEBAR_TEXT.private.openapi,
                icon: SIDEBAR_ICONS.openapi,
                route: ROUTE_OPENAPI,
                action: <Chip label="Dev" color="warning" size="small" />,
            }
        ],
    },
];