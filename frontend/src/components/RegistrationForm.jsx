import React, { useState } from 'react';
import axios from 'axios';
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
  ListItemText,
  useMediaQuery
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
  // ... (keep all existing state and handlers)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState([
    { studentName: '', department: '', yearOfStudy: '', roll_no: '', phone: '' },
    { studentName: '', department: '', yearOfStudy: '', roll_no: '', phone: '' }
  ]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

 const handleNext = () => {
  setActiveStep((prevStep) => prevStep + 1);
};

const handleBack = () => {
  setActiveStep((prevStep) => prevStep - 1);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, {
      teamName,
      teamMembers,
    });

    if (response.status === 201) {
      setSuccessMessage('Registration successful!');
      setErrorMessage('');
      setShowSuccess(true);
    }
  } catch (error) {
    if (error.response) {
      setErrorMessage(error.response.data.message);
    } else {
      setErrorMessage('An error occurred. Please try again later.');
    }
  } finally {
    setIsSubmitting(false);
  }
};

const handleDialogClose = () => {
  setShowSuccess(false);
  navigate('/');
};

const addTeamMember = () => {
  setTeamMembers([
    ...teamMembers, 
    { studentName: '', department: '', yearOfStudy: '', roll_no: '', phone: '' }
  ]);
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
                <Typography variant="h6" sx={{ fontSize: isMobile ? '1.1rem' : '1.25rem' }}>
            Team Member {index + 1}
                </Typography>
              </Box>
              <Grid container spacing={isMobile ? 2 : 3}>
  <Grid item xs={12} sm={6}>
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
  <Grid item xs={12} sm={6}>
  <TextField
    fullWidth
    label="Phone Number"
    value={member.phone}
    onChange={(e) => {
      const updated = [...teamMembers];
      updated[index].phone = e.target.value;
      setTeamMembers(updated);
    }}
    error={!!member.phone && !/^[0-9]{10}$/.test(member.phone)}
    helperText={
      member.phone && !/^[0-9]{10}$/.test(member.phone)
        ? "Please enter a valid 10-digit phone number"
        : ""
    }
    required
    InputProps={{
      startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
    }}
    inputProps={{
      pattern: "^[0-9]{10}$",
      title: "Please enter a valid 10-digit phone number"
    }}
  />
</Grid>



  <Grid item xs={12} sm={4}>
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
    >
      <MenuItem value="" disabled>Select Department</MenuItem>
      <MenuItem value="CSE1">CSE G1</MenuItem>
      <MenuItem value="CSE2">CSE G2</MenuItem>
      <MenuItem value="CSE AIML">CSE AIML</MenuItem>
    </TextField>
  </Grid>

  <Grid item xs={12} sm={4}>
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
  <Grid item xs={12} sm={4}>
  <TextField
    fullWidth
    label="Roll NO"
    value={member.roll_no}
    onChange={(e) => {
      const updated = [...teamMembers];
      updated[index].roll_no = e.target.value;
      setTeamMembers(updated);
    }}
    error={!!member.roll_no && !/^[0-9]{2}[A-Z]{1}[0-9]{3}$/.test(member.roll_no)}
    helperText={
      member.roll_no && !/^[0-9]{2}[A-Z]{1}[0-9]{3}$/.test(member.roll_no)
        ? "Please enter a valid roll number (e.g., 23N244)"
        : ""
    }
    placeholder="e.g., 23N244"
    required
    inputProps={{
      pattern: "^[0-9]{2}[A-Z]{1}[0-9]{3}$",
      title: "Please enter a valid roll number (e.g., 23N244)"
    }}
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
              size={isMobile ? "small" : "medium"}
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
          size={isMobile ? "medium" : "large"}
              >
          Add Team Member
              </Button>
            )}
          </>
        );
      case 1:
        return (
          <Card sx={{ p: isMobile ? 2 : 4, borderRadius: '16px' }}>
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              gutterBottom 
              sx={{ 
                mb: 4, 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'center' 
              }}
            >
              <CheckCircleIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
              Review Your Details
            </Typography>

            <Typography 
              variant="h6" 
              gutterBottom 
              color="primary"
              sx={{ 
                textAlign: 'center',
                fontSize: isMobile ? '1.1rem' : '1.25rem',
                mb: 3
              }}
            >
              Team Name: {teamName}
            </Typography>

            <List sx={{ width: '100%' }}>
              {teamMembers.map((member, index) => (
                <React.Fragment key={index}>
                  <ListItem 
                    sx={{ 
                      flexDirection: 'column', 
                      alignItems: 'flex-start', 
                      py: 3,
                      px: isMobile ? 1 : 3,
                      bgcolor: index % 2 === 0 ? 'background.default' : 'transparent',
                      borderRadius: '8px'
                    }}
                  >
                    <Typography 
                      variant={isMobile ? "subtitle1" : "h6"} 
                      gutterBottom
                      sx={{ 
                        width: '100%',
                        textAlign: 'center',
                        color: theme.palette.primary.main,
                        fontWeight: 'bold'
                      }}
                    >
                      Team Member {index + 1}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <ListItemText
                          primary={
                            <Typography variant="body2" color="text.secondary">
                              Name
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {member.studentName}
                            </Typography>
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ListItemText
                          primary={
                            <Typography variant="body2" color="text.secondary">
                              Phone
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {member.phone}
                            </Typography>
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <ListItemText
                          primary={
                            <Typography variant="body2" color="text.secondary">
                              Department
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {member.department}
                            </Typography>
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <ListItemText
                          primary={
                            <Typography variant="body2" color="text.secondary">
                              Year
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {member.yearOfStudy}
                            </Typography>
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <ListItemText
                          primary={
                            <Typography variant="body2" color="text.secondary">
                              Roll No
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {member.roll_no}
                            </Typography>
                          }
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                  {index < teamMembers.length - 1 && <Divider sx={{ my: 2 }} />}
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
    <Container maxWidth="lg" sx={{ py: isMobile ? 3 : 6 }}>
      <Fade in timeout={1000}>
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 6,
              background: 'white',
              borderRadius: '16px',
              padding: isMobile ? '1rem' : '2rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.07)'
            }}
          >
            <Box
              component="img"
              src={LOGO}
              alt="Event Logo"
              sx={{
                width: '100%',
                maxWidth: '500px',
                height: 'auto',
                mb: 2,
                objectFit: 'contain'
              }}
            />

            <Chip
              icon={<EmojiEventsIcon />}
              label="₹6000 Prize Pool"
              sx={{
                bgcolor: 'white',
                color: theme.palette.primary.main,
                fontSize: isMobile ? '0.9rem' : '1.1rem',
                py: 2.5,
                border: `2px solid ${theme.palette.primary.main}`
              }}
            />
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: isMobile ? 2 : 4,
              borderRadius: '16px',
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Stepper 
              activeStep={activeStep} 
              sx={{ mb: 4 }}
              orientation={isMobile ? "vertical" : "horizontal"}
            >
              <Step>
                <StepLabel>Registration</StepLabel>
              </Step>
              <Step>
                <StepLabel>Review</StepLabel>
              </Step>
            </Stepper>

            <Box>
              {getStepContent(activeStep)}
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                mt: 4,
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? 2 : 0
              }}>
                <Button
                  onClick={handleBack}
                  startIcon={<ArrowBackIcon />}
                  disabled={activeStep === 0}
                  fullWidth={isMobile}
                >
                  Back
                </Button>
                {activeStep === 0 ? (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={!teamName || teamMembers.some(member =>
                      !member.studentName || !member.department || !member.yearOfStudy || !member.phone || !member.roll_no
                    )}
                    fullWidth={isMobile}
                  >
                    Review Details
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    sx={{ minWidth: isMobile ? '100%' : 200 }}
                  >
                    {isSubmitting ? 'Confirming...' : 'Confirm Registration'}
                  </Button>
                )}
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