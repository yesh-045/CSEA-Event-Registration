import React from 'react';
import { Container, Typography, Button, Grid, Paper, Box } from '@mui/material';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const HomePage = () => {
    return (
        <Container maxWidth="lg" sx={{ padding: '2rem' }}>
            {/* Hero Section */}
            <Paper
                elevation={4}
                sx={{
                    padding: '3rem',
                    backgroundImage: 'url(https://example.com/banner-image.jpg)', // Add your banner image URL
                    backgroundSize: 'cover',
                    color: 'white',
                    textAlign: 'center',
                    marginBottom: '2rem',
                }}
            >
                <Typography variant="h3" gutterBottom>
                    Welcome to CodeRush 2024
                </Typography>
                <Typography variant="h6" gutterBottom>
                    The ultimate coding challenge for 1st and 2nd-year students of CSE and CSE AIML at PSG Tech!
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    component={Link}
                    to="/events/CodeRush/register"
                    sx={{ marginTop: '1.5rem' }}
                >
                    Register Now
                </Button>
            </Paper>

            {/* About Event Section */}
            <Box sx={{ marginBottom: '3rem' }}>
                <Typography variant="h4" gutterBottom>
                    About CodeRush
                </Typography>
                <Typography variant="body1" paragraph>
                    CodeRush is an exciting coding competition exclusively for the students of PSG Tech, aimed at
                    fostering problem-solving skills and promoting healthy competition among the best minds in the
                    Department of Computer Science and Artificial Intelligence & Machine Learning.
                </Typography>
                <Typography variant="body1" paragraph>
                    Team up with your peers (2-3 members per team) and battle it out in this coding extravaganza. Sharpen
                    your coding skills, learn new technologies, and stand a chance to win exciting prizes!
                </Typography>
            </Box>

            {/* Sections/Links */}
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <Paper elevation={2} sx={{ padding: '2rem', textAlign: 'center' }}>
                        <Typography variant="h5" gutterBottom>
                            Previous Events
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Discover the past events conducted by the CSEA and how CodeRush has evolved over the years.
                        </Typography>
                        <Button
                            variant="outlined"
                            color="primary"
                            component={Link}
                            to="/events"
                        >
                            View Past Events
                        </Button>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Paper elevation={2} sx={{ padding: '2rem', textAlign: 'center' }}>
                        <Typography variant="h5" gutterBottom>
                            Ongoing Events
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Stay updated with the current events happening in CSEA, including CodeRush.
                        </Typography>
                        <Button
                            variant="outlined"
                            color="primary"
                            component={Link}
                            to="/events/CodeRush"
                        >
                            Ongoing Events
                        </Button>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Paper elevation={2} sx={{ padding: '2rem', textAlign: 'center' }}>
                        <Typography variant="h5" gutterBottom>
                            Upcoming Events
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Check out the upcoming events hosted by CSEA and start preparing early.
                        </Typography>
                        <Button
                            variant="outlined"
                            color="primary"
                            component={Link}
                            to="/events/upcoming"
                        >
                            Upcoming Events
                        </Button>
                    </Paper>
                </Grid>
            </Grid>

            {/* Footer */}
            <Box sx={{ marginTop: '3rem', padding: '1rem 0', textAlign: 'center', borderTop: '1px solid #ccc' }}>
                <Typography variant="body2" color="textSecondary">
                    © 2024 Computer Science Engineering Association, PSG Tech. All rights reserved.
                </Typography>
            </Box>
        </Container>
    );
};

export default HomePage;
