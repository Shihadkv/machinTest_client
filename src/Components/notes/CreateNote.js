import React, { useState } from "react";
import axios from 'axios'
import { Box, Grid, TextField, inputLabelClasses, Button } from "@mui/material";

const CreateNote = () => {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let userData = JSON.parse(localStorage.getItem('user'))
            const datas = { title, content, userData }
            const { data } = await axios.post('https://sticky-notes-service.herokuapp.com/api/notes/createNotes', datas)
            window.location.reload()
        } catch (err) {
            console.log(err);
        }

    }



    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1, marginTop: 10, marginLeft: 5 }}>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid item xs={3}>
                        <Box
                            sx={{
                                width: { xs: 250, md: 500 },
                                height: { xs: 350, md: 350 },
                                backgroundColor: "primary.dark",
                                borderRadius: 5,
                                marginRight: 5,
                            }}
                        >
                            <TextField
                                type="text"
                                id="outlined-multiline-flexible"
                                multiline
                                label="Title :"
                                name="title"
                                value={title}
                                required
                                onChange={(e) => setTitle(e.target.value)}
                                sx={{
                                    width: { xs: 200, md: 400 },
                                    height: { xs: 50, md: 55 },
                                    backgroundColor: "#fff",
                                    marginLeft: 3,
                                    marginRight: 3,

                                    marginTop: 5,
                                    borderRadius: 2,
                                    color: "black",
                                }}
                                InputLabelProps={{
                                    sx: {
                                        color: "orange",
                                        [`&.${inputLabelClasses.shrink}`]: {
                                            color: "red",
                                        },
                                    },
                                }}
                            />

                            <TextField
                                id="filled-multiline-static"
                                label="Content"
                                multiline
                                rows={4}
                                name="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                sx={{
                                    width: { xs: 200, md: 400 },
                                    height: { xs: 123, md: 123 },
                                    marginTop: 5,
                                    marginLeft: 3,
                                    marginRight: 3,
                                    borderRadius: 2,
                                    color: "black",
                                    backgroundColor: "#fff",
                                }}
                                InputLabelProps={{
                                    sx: {
                                        color: "orange",
                                        [`&.${inputLabelClasses.shrink}`]: {
                                            color: "red",
                                        },
                                    },
                                }}
                            />
                            <Button sx={{ marginTop: 3, marginLeft: 3 }} variant="contained" onClick={handleSubmit}>Submit</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
};

export default CreateNote;
