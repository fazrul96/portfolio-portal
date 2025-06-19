import React from 'react';
import {Box, Card, CardContent, CardHeader, Chip, Divider, Grid2, Link, Stack, Typography} from '@mui/material';
import PortfolioContent from './PortfolioContent';
import Profile from '../../../components/section/portfolios/Profile';
import {PORTAL} from "../../../data/portalData";

const PortalCard = ({ portal }) => (
    <Card elevation={3} sx={{ height: '100%' }}>
        <CardHeader
            avatar={<Typography fontSize={24}>{portal.icon}</Typography>}
            title={portal.title}
            subheader={portal.status}
            titleTypographyProps={{ fontWeight: 600 }}
        />
        <CardContent>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                {portal.description}
            </Typography>

            <Typography variant="subtitle2" fontWeight="bold" mt={1}>
                Features:
            </Typography>
            <ul>
                {portal.features.map((feature, i) => (
                    <li key={i}>
                        <Typography variant="body2">{feature}</Typography>
                    </li>
                ))}
            </ul>

            <Divider sx={{ my: 1 }} />

            <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
                {portal.techStack.map((tech, i) => (
                    <Chip key={i} label={tech} size="small" />
                ))}
            </Stack>

            <Stack direction="row" spacing={2}>
                <Link href={portal.github} target="_blank" rel="noopener" underline="hover">
                    GitHub
                </Link>
                <Link href={portal.liveUrl} target="_blank" rel="noopener" underline="hover">
                    Live Site
                </Link>
            </Stack>
        </CardContent>
    </Card>
);

const Portfolio = () => {
	return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <section id="portfolio" className="portfolio-section">
                {/*
                <h1 className="text-justify" style={{ fontWeight: 'bold', fontSize: 100 }}>About</h1>
                <p className="portfolio-subheading">Welcome to my Portfolio Page</p>
                <p className="portfolio-description">
                    I am a Software Developer with 4+ years of experience, specializing in the Laravel framework and web development projects. I constantly update and improve my projects for future reference.
                    As a highly skilled and innovative professional, I excel at prioritizing tasks, resolving technical issues, and delivering exceptional results. Feel free to explore my project collection and contact me if you have any questions or need assistance.
                </p>
                */}
                <PortfolioContent/>
                <Grid2 container spacing={3} style={{ justifyContent: 'center', margin: '1rem' }}>
                    {PORTAL.map((portal) => (
                        <Grid2 item xs={12} sm={6} md={4} key={portal.id}>
                            <PortalCard portal={portal} />
                        </Grid2>
                    ))}
                </Grid2>
                <Profile/>
	        </section>
        </Box>
	);
};

export default Portfolio;