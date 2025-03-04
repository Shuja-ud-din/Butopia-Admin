import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }} className="bg-[white] rounded-md  shadow-md">
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Users</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>User's Name</MenuItem>
                    <MenuItem value={20}>Previous Appointments</MenuItem>
                    <MenuItem value={30}>New User</MenuItem>
                    <MenuItem value={30}>Preferred Contact Method</MenuItem>
                    <MenuItem value={30}>Emergency Contact</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
