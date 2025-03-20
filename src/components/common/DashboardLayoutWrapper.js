import * as React from 'react';
import {useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {createTheme} from '@mui/material/styles';
import {AppProvider} from '@toolpad/core/AppProvider';
import {DashboardLayout, ThemeSwitcher} from '@toolpad/core/DashboardLayout';
import {useDemoRouter} from "@toolpad/core/internal";
import {useAuth0} from "@auth0/auth0-react";
import {
    Avatar,
    Box,
    Chip,
    Divider, IconButton,
    Link,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Stack, TextField,
    Tooltip,
    Typography
} from "@mui/material";
import {Account, AccountPopoverFooter, AccountPreview, SignOutButton} from '@toolpad/core/Account';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from "@mui/icons-material/Search";
import LanguageSwitcherI18n from "./LanguageSwitcherI18n";
import {useTranslation} from "react-i18next";

const createDemoTheme = () => {
    return createTheme({
        cssVariables: {
            colorSchemeSelector: 'data-toolpad-color-scheme',
        },
        colorSchemes: { light: true, dark: true },
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 600,
                lg: 1200,
                xl: 1536,
            },
        },
    });
};

const createPreviewComponent = (mini) => {
    function PreviewComponent(props) {
        return <AccountSidebarPreview {...props} mini={mini} />;
    }
    return PreviewComponent;
};

const DemoPageContent = ({ pathname }) => (
    <Box
        sx={{
            py: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
        }}
    >
        <Typography>Dashboard content for {pathname}</Typography>
    </Box>
);

const SidebarFooter = ({ mini }) => {
    return (
        <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={1}
            sx={{ m: 1 }}
        >
            <Typography
                variant="caption"
                sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textAlign: 'center' }}
            >
                {mini ? '© MUI' : `© ${new Date().getFullYear()} Fazrul Romli - Portfolio`}
            </Typography>

            <Typography variant="caption" sx={{ textAlign: 'center' }}>
                {mini ? '' : (
                    <>
                        <Link href="https://www.your-portfolio-website.com" target="_blank" rel="noopener" sx={{ color: 'inherit', textDecoration: 'none' }}>
                            Portfolio
                        </Link>
                        |
                        <Link href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener" sx={{ color: 'inherit', textDecoration: 'none' }}>
                            LinkedIn
                        </Link>
                    </>
                )}
            </Typography>
        </Stack>
    );
}

const SidebarFooterAccount = ({ mini }) => {
    const PreviewComponent = React.useMemo(() => createPreviewComponent(mini), [mini]);
    return (
        <Account
            slots={{
                preview: PreviewComponent,
                // popoverContent: SidebarFooterAccountPopover,
            }}
            slotProps={{
                popover: {
                    transformOrigin: { horizontal: 'left', vertical: 'bottom' },
                    anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
                    disableAutoFocus: true,
                    slotProps: {
                        paper: {
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: (theme) =>
                                    `drop-shadow(0px 2px 8px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.32)'})`,
                                mt: 1,
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    bottom: 10,
                                    left: 0,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translate(-50%, -50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        },
                    },
                },
            }}
        />
    );
}

const AccountSidebarPreview = ({ handleClick, open, mini }) => {
    return (
        <Stack direction="column" p={0} overflow="hidden">
            <Divider />
            <AccountPreview
                variant={mini ? 'condensed' : 'expanded'}
                handleClick={handleClick}
                open={open}
            />
        </Stack>
    );
}

const SidebarFooterAccountPopover = () => {
    return (
        (<Stack direction="column">
            <Typography variant="body2" mx={2} mt={1}>
                Accounts
            </Typography>
            <MenuList>
                {accounts.map((account) => (
                    <MenuItem
                        key={account.id}
                        component="button"
                        sx={{
                            justifyContent: 'flex-start',
                            width: '100%',
                            columnGap: 2,
                        }}
                    >
                        <ListItemIcon>
                            <Avatar
                                sx={{
                                    width: 32,
                                    height: 32,
                                    fontSize: '0.95rem',
                                    bgcolor: account.color,
                                }}
                                src={account.image ?? ''}
                                alt={account.name ?? ''}
                            >
                                {account.name[0]}
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                width: '100%',
                            }}
                            primary={account.name}
                            secondary={account.email}
                            slotProps={{
                                primary: { variant: 'body2' },
                                secondary: { variant: 'caption' }
                            }} />
                    </MenuItem>
                ))}
            </MenuList>
            <Divider />
            <AccountPopoverFooter>
                <SignOutButton />
            </AccountPopoverFooter>
        </Stack>)
    );
}

const CustomAppTitle = () => {
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="h6">PORTFOLIO</Typography>
            <Chip size="small" label="BETA" color="info" />
            <Tooltip title="Connected to production">
                <CheckCircleIcon color="success" fontSize="small" />
            </Tooltip>
        </Stack>
    );
}

const ToolbarActionsSearch = () => {
    return (
        <Stack direction="row">
            <Tooltip title="Search" enterDelay={1000}>
                <div>
                    <IconButton
                        type="button"
                        aria-label="search"
                        sx={{
                            display: { xs: 'inline', md: 'none' },
                        }}
                    >
                        <SearchIcon />
                    </IconButton>
                </div>
            </Tooltip>
            <TextField
                label="Search"
                variant="outlined"
                size="small"
                slotProps={{
                    input: {
                        endAdornment: (
                            <IconButton type="button" aria-label="search" size="small">
                                <SearchIcon />
                            </IconButton>
                        ),
                        sx: { pr: 0.5 },
                    },
                }}
                sx={{ display: { xs: 'none', md: 'inline-block' }, mr: 1 }}
            />
            <ThemeSwitcher />
        </Stack>
    );
}

const ToolbarActionsLanguage = () => {
    const { t } = useTranslation();
    return (
        <Stack direction="row">
            <ThemeSwitcher />
            <Tooltip title={t("languageSwitcher.text")} arrow>
                <div>
                    <LanguageSwitcherI18n />
                </div>
            </Tooltip>
        </Stack>
    );
}

const accounts = [
    {
        id: 1,
        name: 'Bharat Kashyap',
        email: 'bharatkashyap@outlook.com',
        image: 'https://avatars.githubusercontent.com/u/19550456',
        projects: [
            {
                id: 3,
                title: 'Project X',
            },
        ],
    }
];

const DashboardLayoutWrapper = ({
                                    navigation,
                                    content,
                                    window,
                                }) => {
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    const [session, setSession] = useState(null);
    const router = useDemoRouter();

    useEffect(() => {
        if (isAuthenticated && user) {
            const userSession = {
                user: {
                    name: user.name,
                    email: user.email,
                    image: user.picture,
                },
            };
            setSession(userSession);
        } else {
            setSession(null);
        }
    }, [isAuthenticated, user]);

    const demoWindow = window !== undefined ? window() : undefined;

    const authentication = useMemo(() => {
        return {
            signIn: () => {
                loginWithRedirect();
            },
            signOut: () => {
                logout();
                setSession(null);
            },
        };
    }, [loginWithRedirect, logout, window]);

    return (
        <AppProvider
            navigation={navigation}
            branding={{
                logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
                title: 'PORTFOLIO',
                homeUrl: '/',
            }}
            router={navigation.route}
            theme={createDemoTheme()}
            authentication={authentication}
            session={session}
            window={demoWindow}

        >
            <DashboardLayout
                slots={{
                    appTitle: CustomAppTitle,
                    toolbarActions: ToolbarActionsLanguage,
                    sidebarFooter: SidebarFooterAccount,
                    toolbarAccount: () => null
                }}
            >
                {content || <DemoPageContent pathname={router.pathname} />}
            </DashboardLayout>
        </AppProvider>
    );
};

DashboardLayoutWrapper.propTypes = {
    navigation: PropTypes.array.isRequired,
    content: PropTypes.node,
    window: PropTypes.func,
};

DashboardLayoutWrapper.defaultProps = {
    content: null,
};

export default DashboardLayoutWrapper;
