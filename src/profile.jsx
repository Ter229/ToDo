import { Container, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Avatar, Button } from "@mui/material";
import { useRef } from "react";
import CreateIcon from "@mui/icons-material/Create";
import { updateAvatar, getUserAvatar } from "./services/authService";

const Profile = ({ changeAvatar, changeNames }) => {
  const [selectedImg, setSelectedImg] = useState("");
  const [changeName, setChangeName] = useState(
    localStorage.getItem("nick") || ""
  );
  const [edit, setEdit] = useState(false);

  const fileReader = new FileReader();
  const refInput = useRef();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const storedAvatar = localStorage.getItem("avatar");
    if (storedAvatar) {
      setSelectedImg(storedAvatar);
    } else {
      // Если аватарка в localStorage отсутствует, то делаем запрос на сервер
      const fetchProfile = async () => {
        const data = await getUserAvatar(token);
        if (data && data.avatar) {
          localStorage.setItem("avatar", data.avatar);
          setSelectedImg(data.avatar);
        }
      };
      fetchProfile();
    }
  }, [token]);

  fileReader.onloadend = () => {
    setSelectedImg(fileReader.result);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    fileReader.readAsDataURL(file);
  };

  // const saveAvatar = async () => {
  //   try {
  //     const response = await updateAvatar(selectedImg, token);
  //     console.log("gellll", response);
  //     if (response.data) {
  //       changeAvatar(response.data.avatar);
  //       localStorage.setItem("avatar", response.data.avatar);
  //     }
  //   } catch (error) {
  //     console.log("Error updating:", error);
  //   }
  // };

  const saveAvatar = async () => {
    try {
      const data = await updateAvatar(selectedImg, token);
      console.log("Response from server:", data); // Посмотреть, что реально приходит

      if (data && data.avatar) {
        changeAvatar(data.avatar);
        localStorage.setItem("avatar", data.avatar);
        console.log(
          "Avatar saved to localStorage:",
          localStorage.getItem("avatar")
        );
      } else {
        console.log("Server response does not contain avatar field");
      }
    } catch (error) {
      console.log("Error updating avatar:", error);
    }
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
