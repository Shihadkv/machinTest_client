import React, { useEffect, useState } from "react";
import axios from "axios";
import randomColor from "randomcolor";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, Typography, Modal, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DisplayNotes = (props) => {
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.post("/notes/deleteNotes", { Id: id });
      setDeleteNote(true);
    } catch (error) {
      console.log(error);
    }
  };

  const Navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [deleteNote, setDeleteNote] = useState(false);
  const [edit, setEdit] = useState(false);

  const editedData = async () => {
    try {
      console.log(title, content);
      const { data } = await axios.post("/notes/editNotes", {
        title: title === "" ? edit.title : title,
        content: content === "" ? edit.content : content,
        id: edit._id,
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOpen = (index) => {
    const result = notes[index];
    console.log(result);
    setEdit(result);
    setOpen(true);
  };

  const displayNotes = async () => {
    try {
      let userData = JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.get("/notes/getNotes", {
        params: { userId: userData._id },
      });
      setDeleteNote(false);
      console.log(data);
      setNotes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    displayNotes();
    Navigate("/");
  }, [deleteNote, Navigate, open]);

  return (
    <React.Fragment>
      <Box sx={{ width: "100%", marginLeft: 5, marginTop: 5 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {notes ? (
            notes.map((data, index) => {
              return (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                  <Box
                    sx={{
                      width: 300,
                      height: 300,
                      backgroundColor: randomColor(),
                      borderRadius: 3,
                    }}
                  >
                    <Typography
                      align="center"
                      mt={4}
                      variant="h5"
                      component="h2"
                    >
                      title : {data.title}
                    </Typography>
                    <Typography
                      align="center"
                      mt={4}
                      variant="h6"
                      component="h2"
                    >
                      content : {data.content}
                    </Typography>

                    {/* <DeleteIcon sx = {{display:"flex"}}/> */}

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginLeft: 2,
                        marginRight: 2,
                        marginTop: 5,
                      }}
                    >
                      <Button
                        variant="outlined"
                        onClick={() => handleDelete(data._id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => handleClickOpen(index)}
                      >
                        EDIT
                      </Button>
                      <Modal
                        sx={{ display: "flex" }}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <TextField
                            sx={{ mt: 2, width: 320 }}
                            name="title"
                            placeholder="title"
                            onChange={(e) => setTitle(e.target.value)}
                            defaultValue={edit.title}
                            label="Filled success"
                            variant="filled"
                            color="success"
                            focused
                          />
                          <TextField
                            sx={{ mt: 2, width: 320 }}
                            name="content"
                            placeholder="Content"
                            onChange={(e) => setContent(e.target.value)}
                            defaultValue={edit.content}
                            label="Filled success"
                            variant="filled"
                            color="success"
                            focused
                          />
                          <Button
                            sx={{ marginTop: 5, marginLeft: 1 }}
                            variant="contained"
                            onClick={editedData}
                          >
                            submit
                          </Button>
                        </Box>
                      </Modal>
                    </Box>
                  </Box>
                </Grid>
              );
            })
          ) : (
            <h1>PLEASE ADD NOTES</h1>
          )}
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default DisplayNotes;
