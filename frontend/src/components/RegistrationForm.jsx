import React, { useState } from 'react';
import axios from 'axios';

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
            const response = await axios.post('http://localhost:5000/register', teamData);
            console.log('Registration successful', response.data);
        } catch (error) {
            console.error('There was an error registering the team:', error);
        }
    };

    return (
        <div>
            <h1>Team Registration</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Team Name:</label>
                    <input type="text" value={teamName} onChange={handleTeamNameChange} required />
                </div>

                {teamMembers.map((member, index) => (
                    <div key={index}>
                        <h3>Team Member {index + 1}</h3>
                        <div>
                            <label>Student Name:</label>
                            <input
                                type="text"
                                value={member.studentName}
                                onChange={(e) => handleMemberChange(index, 'studentName', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Department:</label>
                            <input
                                type="text"
                                value={member.department}
                                onChange={(e) => handleMemberChange(index, 'department', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Year of Study (1 or 2):</label>
                            <input
                                type="number"
                                value={member.yearOfStudy}
                                onChange={(e) => handleMemberChange(index, 'yearOfStudy', e.target.value)}
                                min="1"
                                max="2"
                                required
                            />
                        </div>
                        {index > 1 && (
                            <button type="button" onClick={() => removeMember(index)}>
                                Remove Member
                            </button>
                        )}
                    </div>
                ))}

                {teamMembers.length < 3 && (
                    <button type="button" onClick={addMember}>
                        Add Team Member
                    </button>
                )}

                <button type="submit">Register Team</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
