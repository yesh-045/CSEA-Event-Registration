import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Grid, Container, Paper } from '@mui/material';

const RegistrationForm = () => {
    const [teamName, setTeamName] = useState('');
    const [teamMembers, setTeamMembers] = useState([
        { studentName: '', department: '', yearOfStudy: '' },
        { studentName: '', department: '', yearOfStudy: '' }
    ]); // Initialize with 2 members

    const handleTeamNameChange = (e) => {
        setTeamName(e.target.value);
    };

    const handleMemberChange = (index, field, value) => {
        const updatedMembers = [...teamMembers];
        updatedMembers[index][field] = value;
        setTeamMembers(updatedMembers);
    };

    const addMember = () => {
        if (teamMembers.length < 3) {
            setTeamMembers([...teamMembers, { studentName: '', department: '', yearOfStudy: '' }]);
        }
    };

    const removeMember = (index) => {
        if (teamMembers.length > 2) {
            const updatedMembers = teamMembers.filter((_, i) => i !== index);
            setTeamMembers(updatedMembers);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const teamData = {
            teamName,
            teamMembers
        };
        try {
            const response = await axios.post('http://localhost:3000/register', teamData);
            console.log('Registration successful', response.data);
        } catch (error) {
            console.error('There was an error registering the team:', error);
        }
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: '2rem', marginTop: '2rem' }}>
                <Typography variant="h4" gutterBottom align="center">
                    Team Registration
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Team Name"
                                value={teamName}
                                onChange={handleTeamNameChange}
                                fullWidth
                                required
                                variant="outlined"
                            />
                        </Grid>

                        {teamMembers.map((member, index) => (
                            <Grid container spacing={2} key={index} sx={{ marginBottom: '1rem' }}>
                                <Grid item xs={12}>
                                    <Typography variant="h6">
                                        Team Member {index + 1}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Student Name"
                                        value={member.studentName}
                                        onChange={(e) => handleMemberChange(index, 'studentName', e.target.value)}
                                        fullWidth
                                        required
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        label="Department"
                                        value={member.department}
                                        onChange={(e) => handleMemberChange(index, 'department', e.target.value)}
                                        fullWidth
                                        required
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        label="Year of Study"
                                        value={member.yearOfStudy}
                                        onChange={(e) => handleMemberChange(index, 'yearOfStudy', e.target.value)}
                                        type="number"
                                        InputProps={{ inputProps: { min: 1, max: 2 } }}
                                        fullWidth
                                        required
                                        variant="outlined"
                                    />
                                </Grid>

                                {index > 1 && (
                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => removeMember(index)}
                                            fullWidth
                                        >
                                            Remove Member
                                        </Button>
                                    </Grid>
                                )}
                            </Grid>
                        ))}

                        {teamMembers.length < 3 && (
                            <Grid item xs={12}>
                                <Button
                                    variant="outlined"
                                    onClick={addMember}
                                    fullWidth
                                >
                                    Add Team Member
                                </Button>
                            </Grid>
                        )}

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Register Team
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
};

export default RegistrationForm;
