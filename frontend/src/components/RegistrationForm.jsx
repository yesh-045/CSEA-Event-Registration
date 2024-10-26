import React, { useState } from 'react';
import LOGO from '../assets/Black Yellow Bold Minimalist Technology Expo Event Poster.png';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  Grid,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Chip,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Fade,
  Zoom,
  useTheme,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  Delete as DeleteIcon,
  EmojiEvents as EmojiEventsIcon,
  Group as GroupIcon,
  Code as CodeIcon,
  Celebration as CelebrationIcon,
  School as SchoolIcon,
  ArrowBack as ArrowBackIcon,
  Phone as PhoneIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';

const CodeRushRegistration = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState([
    { studentName: '', department: '', yearOfStudy: '', roll_no: '', phone: '' },
    { studentName: '', department: '', yearOfStudy: '', roll_no: '', phone: '' }
  ]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowSuccess(true);
    setIsSubmitting(false);
  };

  const handleDialogClose = () => {
    setShowSuccess(false);
    navigate('/');
  };

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { studentName: '', department: '', yearOfStudy: '', roll_no: '', phone: '' }]);
  };

  const removeTeamMember = (index) => {
    const updated = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updated);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              fullWidth
              label="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
              variant="outlined"
              InputProps={{
                startAdornment: <GroupIcon sx={{ mr: 1, color: 'text.secondary' }} />
              }}
              sx={{ mb: 4 }}
            />

            {teamMembers.map((member, index) => (
              <Fade in timeout={500} key={index}>
                <Card 
                  sx={{ 
                    mt: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '16px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.07)'
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                        <SchoolIcon />
                      </Avatar>
                      <Typography variant="h6">
                        Team Member {index + 1}
                      </Typography>
                    </Box>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          value={member.studentName}
                          onChange={(e) => {
                            const updated = [...teamMembers];
                            updated[index].studentName = e.target.value;
                            setTeamMembers(updated);
                          }}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          value={member.phone}
                          onChange={(e) => {
                            const updated = [...teamMembers];
                            updated[index].phone = e.target.value;
                            setTeamMembers(updated);
                          }}
                          required
                          InputProps={{
                            startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          label="Department"
                          select
                          value={member.department || ""}
                          onChange={(e) => {
                            const updated = [...teamMembers];
                            updated[index].department = e.target.value;
                            setTeamMembers(updated);
                          }}
                          required
                          variant="outlined"
                          SelectProps={{
                            MenuProps: {
                              PaperProps: {
                                style: {
                                  maxHeight: 200,
                                  backgroundColor: "#f9f9f9",
                                },
                              },
                            },
                          }}
                        >
                          <MenuItem value="" disabled>
                            Select Department
                          </MenuItem>
                          <MenuItem value="CSE1">CSE G1</MenuItem>
                          <MenuItem value="CSE2">CSE G2</MenuItem>
                          <MenuItem value="CSE AIML">CSE AIML</MenuItem>
                        </TextField>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          label="Year of Study"
                          type="number"
                          InputProps={{ inputProps: { min: 1, max: 2 } }}
                          value={member.yearOfStudy}
                          onChange={(e) => {
                            const updated = [...teamMembers];
                            updated[index].yearOfStudy = e.target.value;
                            setTeamMembers(updated);
                          }}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          label="Roll NO"
                          value={member.roll_no}
                          onChange={(e) => {
                            const updated = [...teamMembers];
                            updated[index].roll_no = e.target.value;
                            setTeamMembers(updated);
                          }}
                          placeholder="e.g., 23N244"
                          required
                        />
                      </Grid>
                    </Grid>
                    {index > 1 && (
                      <Box sx={{ mt: 2, textAlign: 'right' }}>
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => removeTeamMember(index)}
                        >
                          Remove Member
                        </Button>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Fade>
            ))}

            {teamMembers.length < 3 && (
              <Button
                startIcon={<PersonAddIcon />}
                onClick={addTeamMember}
                sx={{ mt: 3 }}
                variant="outlined"
                fullWidth
                size="large"
              >
                Add Team Member
              </Button>
            )}
          </>
        );
      case 1:
        return (
          <Card sx={{ p: 4, borderRadius: '16px' }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
              <CheckCircleIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
              Review Your Details
            </Typography>
            
            <Typography variant="h6" gutterBottom color="primary">
              Team Name: {teamName}
            </Typography>
            
            <List>
              {teamMembers.map((member, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start', py: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Team Member {index + 1}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <ListItemText 
                          primary="Name" 
                          secondary={member.studentName}
                          sx={{ '& .MuiListItemText-primary': { color: 'text.secondary' } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ListItemText 
                          primary="Phone" 
                          secondary={member.phone}
                          sx={{ '& .MuiListItemText-primary': { color: 'text.secondary' } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <ListItemText 
                          primary="Department" 
                          secondary={member.department}
                          sx={{ '& .MuiListItemText-primary': { color: 'text.secondary' } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <ListItemText 
                          primary="Year" 
                          secondary={member.yearOfStudy}
                          sx={{ '& .MuiListItemText-primary': { color: 'text.secondary' } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <ListItemText 
                          primary="Roll No" 
                          secondary={member.roll_no}
                          sx={{ '& .MuiListItemText-primary': { color: 'text.secondary' } }}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                  {index < teamMembers.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Card>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Fade in timeout={1000}>
        <Box>
          <Box 
            textAlign="center" 
            mb={6}
            sx={{
              background: 'white',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.07)'
            }}
          >
            <Box 
              component="img"
              src={LOGO}
              alt="Event Logo"
              sx={{
                maxWidth: '500px',
                height: 'auto',
                mb: 2
              }}
            />
            
            <Chip
              icon={<EmojiEventsIcon />}
              label="₹6000 Prize Pool"
              sx={{
                bgcolor: theme.palette.primary.main,
                color: 'white',
                fontSize: '1.1rem',
                alignSelf: 'center',
                py: 2.5
              }}
            />
          </Box>

          <Paper 
            elevation={0} 
            sx={{ 
              p: 4,
              borderRadius: '16px',
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              <Step>
                <StepLabel>Registration</StepLabel>
              </Step>
              <Step>
                <StepLabel>Review</StepLabel>
              </Step>
            </Stepper>

            {/* Main content area */}
            <Box>
              {/* Registration Step */}
              {activeStep === 0 && (
                <Box>
                  {getStepContent(0)}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Button
                      onClick={handleBack}
                      startIcon={<ArrowBackIcon />}
                      disabled={true}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      disabled={!teamName || teamMembers.some(member => 
                        !member.studentName || !member.department || !member.yearOfStudy || !member.phone || !member.roll_no
                      )}
                    >
                      Review Details
                    </Button>
                  </Box>
                </Box>
              )}

              {/* Review Step */}
              {activeStep === 1 && (
                <Box component="form" onSubmit={handleSubmit}>
                  {getStepContent(1)}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Button
                      onClick={handleBack}
                      startIcon={<ArrowBackIcon />}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting}
                      sx={{ minWidth: 200 }}
                    >
                      {isSubmitting ? 'Confirming...' : 'Confirm Registration'}
                    </Button>
                  </Box>
                  {isSubmitting && (
                    <LinearProgress 
                      sx={{ 
                        mt: 2,
                        borderRadius: 1,
                        height: 8
                      }} 
                    />
                  )}
                </Box>
              )}
            </Box>
          </Paper>

          <Dialog 
            open={showSuccess} 
            onClose={handleDialogClose}
            TransitionComponent={Fade}
            transitionDuration={400}
          >
            <DialogTitle sx={{ textAlign: 'center', pt: 3 }}>
              <CelebrationIcon sx={{ fontSize: 40, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" component="div">
                Registration Successful!
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Typography align="center" color="text.secondary">
                Your team has been registered successfully. 
                Get ready to showcase your coding prowess and compete for glory!
              </Typography>
              <Typography align="center" color="text.secondary" sx={{ mt: 2 }}>
                <b>Make sure to join the Whatsapp group for further updates.</b>
                <br/>
                <a 
                  href="https://chat.whatsapp.com/L8n6N6YQjUkF7dlrO2LVxi" 
                  target="_blank" 
                  rel="noreferrer"
                  style={{
                    color: theme.palette.primary.main,
                    textDecoration: 'none',
                    fontWeight: 'bold'
                  }}
                >
                  Click here to join the Whatsapp Group
                </a>
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} variant="contained" fullWidth>
                Close
              </Button> 
            </DialogActions>
          </Dialog>
        </Box>
      </Fade>
    </Container>
  );
}

export default CodeRushRegistration;