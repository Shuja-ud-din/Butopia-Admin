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
                    <MenuItem value={10}>Hair Treatments</MenuItem>
                    <MenuItem value={20}>Body Treatments</MenuItem>
                    <MenuItem value={30}>Chemical Peels</MenuItem>
                    <MenuItem value={30}>Laser Hair Removal</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
