import {Box, Tab, Tabs} from '@mui/material';
import {TabContext} from '@mui/lab';
import React from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';

const TabsComponent = ({ selectedTab, handleTabChange, moduleType, t }) => (
    <TabContext value={selectedTab}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ flexGrow: 1, borderBottom: 1, borderColor: 'divider' }}>
                <Tabs onChange={handleTabChange} aria-label={t(`tabs.${moduleType}.donationManagement`)}>
                    <Tab icon={<CalendarMonthIcon />} label={t(`tabs.${moduleType}.viewDonations`)} value="1" />
                    <Tab icon={<BarChartIcon />} label={t(`tabs.${moduleType}.donationAnalysis`)} value="2" />
                </Tabs>
            </Box>
        </Box>
    </TabContext>
);

export default TabsComponent;
