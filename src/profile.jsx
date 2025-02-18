import { Container, Paper } from "@mui/material";
import React, { useState } from "react";
import { Avatar, Button } from "@mui/material";
import { useRef } from "react";
import CreateIcon from "@mui/icons-material/Create";

const Profile = ({ changeAvatar, changeNames }) => {
  const [selectedImg, setSelectedImg] = useState(
    localStorage.getItem("avatar") || ""
  );
  const [changeName, setChangeName] = useState(
    localStorage.getItem("nick") || ""
  );
  const [edit, setEdit] = useState(false);

  const fileReader = new FileReader();
  const refInput = useRef();

  fileReader.onloadend = () => {
    setSelectedImg(fileReader.result);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    fileReader.readAsDataURL(file);
  };

  const saveAvatar = () => {
    changeAvatar(selectedImg);
    localStorage.setItem("avatar", selectedImg);
  };
  const handlePick = () => {
    refInput.current.click();
  };

  const saveName = () => {
    setEdit(false);
    changeNames(changeName);
    localStorage.setItem("nick", changeName);
  };
  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{ display: "flex", alignItems: "flex-start", padding: "15px" }}
      >
        <div>
          <Avatar
            sx={{ width: 100, height: 100, mb: "20px" }}
            alt="avatar"
            src={selectedImg}
          />
          <div style={{ display: "flex", gap: "5px" }}>
            <Button
              sx={{ textTransform: "none", ml: "1px" }}
              variant="contained"
              onClick={handlePick}
            >
              Edit
            </Button>
            <input
              style={{
                width: "0px",
                height: "0px",
                opacity: 0,
                display: "block",
              }}
              ref={refInput}
              type="file"
              onChange={handleChange}
            />
            {selectedImg && <Button onClick={saveAvatar}>Upload</Button>}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
          }}
        >
          {edit ? (
            <input
              value={changeName}
              onChange={(e) => setChangeName(e.target.value)}
            />
          ) : (
            <div>{changeName}</div>
          )}

          <CreateIcon
            sx={{ width: "20px", height: "20px" }}
            onClick={() => setEdit(true)}
          >
            edit
          </CreateIcon>
          {edit && <Button onClick={saveName}>Save</Button>}
        </div>
      </Paper>
    </Container>
  );
};

export default Profile;
