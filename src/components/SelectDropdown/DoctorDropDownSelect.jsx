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
                <InputLabel id="demo-simple-select-label">Doctors</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Doctor's Name</MenuItem>
                    <MenuItem value={20}>Specialty</MenuItem>
                    <MenuItem value={30}>Availability</MenuItem>
                    <MenuItem value={30}>Preferred Doctor</MenuItem>
                    <MenuItem value={30}>All Doctors</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
