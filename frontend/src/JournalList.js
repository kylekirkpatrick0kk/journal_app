import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Container, Paper, TextField } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const JournalList = () => {
    const [results, setResults] = useState([])
    const url = 'http://localhost:8000/api/journals/user/'

    useEffect(() => {
        async function getData() {
            const token = localStorage.getItem('token');
            const response = await fetch(url, {headers: {'Authorization': `Token ${token}`}});
            const journals = await response.json();
            setResults(journals);
        }
        getData();
    }, []);

    return (
        <Container maxWidth="md">
            <Paper style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h4" gutterBottom style={{ marginBottom: '20px' }}>
                    My Journal Entries
                </Typography>
                <List>
                    {results.map(item => (
                        <ListItem key={item.id} style={{ border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px' }}>
                            <ListItemText
                                primary={
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="h6" component="div">
                                                {item.title}
                                            </Typography>
                                            <div>
                                                <StarIcon color={item.starred ? 'primary' : 'action'} />
                                                <Typography variant="caption" color="textSecondary">
                                                    {new Date(item.created_date).toLocaleString()}
                                                </Typography>
                                            </div>
                                        </div>
                                        <TextField
                                            fullWidth
                                            multiline
                                            label="Entry"
                                            variant="outlined"
                                            defaultValue={item.entry}
                                            disabled
                                        />
                                    </div>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default JournalList