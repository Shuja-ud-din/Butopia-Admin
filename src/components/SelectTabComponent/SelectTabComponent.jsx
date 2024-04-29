import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '../Table/Table'
import Button from '../Button/Button'
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function FullWidthTabs() {
    const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{
            backgroundColor: 'none',
            width: 500,

        }} >
            <AppBar position="static"  >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    sx={{
                        backgroundColor: '#09373d',
                        // backgroundColor: 'none',
                        borderRadius: '0.5rem',
                        border: '1px solid black',

                    }}


                >
                    <Tab label="Appointment" {...a11yProps(0)} />
                    <Tab label="Payment Details" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <motion.div
                style={{
                    display: 'flex',
                    width: '100%',
                    overflowX: 'hidden',
                }}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Table
                        // array={data}
                        search={"fullName"}
                        keysToDisplay={["id", "fullName", "phNo"]}
                        label={["#", "customer Name", "phone No", "Actions"]}
                        extraColumns={[
                            () => {
                                return (
                                    <Button type="danger" className="w-[80px]" outlined>
                                        Delete
                                    </Button>
                                );
                            },
                        ]}
                    />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <p>Detail of Customer......................................</p>
                    <p>Detail of Customer......................................</p>
                    <p>Detail of Customer......................................</p>
                    <p>Detail of Customer......................................</p>
                    <p>Detail of Customer......................................</p>
                    <p>Detail of Customer......................................</p>
                    <p>Detail of Customer......................................</p>
                    <p>Detail of Customer......................................</p>
                    <p>Detail of Customer......................................</p>
                    <p>Detail of Customer......................................</p>
                    <p>Detail of Customer......................................</p>
                    <p>Detail of Customer......................................</p>
                    <p>Detail of Customer......................................</p>
                    <p>Detail of Customer......................................</p>
                    <p>Detail of Customer......................................</p>
                    <p>Detail of Customer......................................</p>
                    <p>Detail of Customer......................................</p>
                </TabPanel>

            </motion.div>
        </Box >
    );
}
