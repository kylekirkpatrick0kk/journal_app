import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Container, Paper, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const JournalList = () => {
    const [results, setResults] = useState([])
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [title, setTitle] = useState('');
    const [entry, setEntry] = useState('');
    const [editingId, setEditingId] = useState(null);
    const url = 'http://localhost:8000/api/journals/'

    const decodeToken = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            console.log(e);
            return null;
        }
    };

    useEffect(() => {
        getData();
    }, [url]); // eslint-disable-line react-hooks/exhaustive-deps


    const getData = async () => {
        const access_token = localStorage.getItem('access_token');
        const decodedToken = decodeToken(access_token);
        const userId = decodedToken ? decodedToken.user_id : null;
        const response = await fetch(`${url}${userId}/`, {headers: {'Authorization': `Bearer ${access_token}`}});
        const journals = await response.json();
        setResults(journals);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleEditOpen = (id) => {
        const item = results.find(item => item.id === id);
        setTitle(item.title);
        setEntry(item.entry);
        setEditingId(id); // Set the editing id
        setOpenEdit(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditClose = () => {
        setOpenEdit(false);
    }

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };
    
    const handleChangeEntry = (e) => {
        setEntry(e.target.value);
    };
    
    const handleSubmit = async () => {
        const access_token = localStorage.getItem('access_token');
        const decodedToken = decodeToken(access_token);
        const userId = decodedToken ? decodedToken.user_id : null;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, entry, owner: userId }),
        });
        if (response.ok) {
            getData();
            handleClose();
        }
    };

    const handleSave = async () => {
        const access_token = localStorage.getItem('access_token');
        const decodedToken = decodeToken(access_token);
        const userId = decodedToken ? decodedToken.user_id : null;
        const response = await fetch(`${url}detail/${editingId}/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, entry, owner: userId }),
        });
        if (response.ok) {
            getData();
            handleClose();
        }
    };

    return (
        <Container maxWidth="md">
            <Paper style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h4" gutterBottom style={{ marginBottom: '20px' }}>
                    My Journal Entries
                </Typography>
                <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginTop: '20px' }}>
                    Create
                </Button>
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
                                                <Button onClick={() => handleEditOpen(item.id)}>Edit</Button>
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
                
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Create New Journal Entry</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="title"
                            label="Title"
                            type="text"
                            fullWidth
                            onChange={handleChangeTitle}
                        />
                        <TextField
                            margin="dense"
                            name="content"
                            label="Content"
                            type="text"
                            fullWidth
                            onChange={handleChangeEntry}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={openEdit} onClose={handleEditClose}>
                    <DialogTitle>Edit Journal Entry</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Title"
                            type="text"
                            fullWidth
                            value={title}
                            onChange={handleChangeTitle}
                        />
                        <TextField
                            margin="dense"
                            id="entry"
                            label="Entry"
                            type="text"
                            fullWidth
                            value={entry}
                            onChange={handleChangeEntry}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </Container>
    );
};

export default JournalList