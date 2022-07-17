import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { updateProfile } from "firebase/auth";
import { authService, storageService } from "fbase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: "rgb(170 155 221)",
}));

const EditProfileForm = (props) => {
  const userData = useSelector((state) => state.userData);
  const [editOpen, setEditOpen] = useState(props.edit ? true : false);
  const [newDisplayName, setNewDisplayName] = useState(userData.displayName);
  const [newPhoto, setNewPhoto] = useState(userData.photoURL);
  const fileInput = useRef();

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;

    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;

      setNewPhoto(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onChangeNickName = async () => {
    if (userData.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      props.refreshUser();
      alert("닉네임이 변경되었습니다.");
      props.edithandleClose();
    }
  };

  const onChangePhoto = async () => {
    if (newPhoto === null) {
      return alert("변경할 프로필 사진을 선택해 주세요.");
    }

    let photo = "";
    if (newPhoto !== "") {
      const fileRef = ref(storageService, `${userData.uid}/${uuidv4()}`);
      const response = await uploadString(fileRef, newPhoto, "data_url");
      photo = await getDownloadURL(fileRef);
    }

    if (userData.photoURL !== newPhoto) {
      await updateProfile(authService.currentUser, {
        photoURL: photo,
      });
      props.refreshUser();
      alert("프로필 사진이 변경되었습니다.");
      props.edithandleClose();
    }
  };

  return (
    <div>
      <Modal
        open={editOpen}
        onClose={props.edithandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex align-items-center justify-content text-center"
      >
        <div className="bgWhite border-radius min-width-250px pxy-2 mxy-1">
          <div className="mb-3">
            <h3 className="mb-1">닉네임</h3>

            <div className="flex">
              <TextField
                id="outlined-basic"
                variant="outlined"
                defaultValue={newDisplayName}
                onChange={onChange}
                inputProps={{ maxLength: 20 }}
              />
              <Button variant="contained" onClick={onChangeNickName}>
                변경
              </Button>
            </div>
          </div>

          <div>
            <h3 className="mb-1">프로필 사진</h3>

            <div className="flex align-items-center justify-space-around">
              <Avatar
                alt="프로필 사진"
                src={newPhoto}
                sx={{ width: 100, height: 100 }}
              />

              <div className="flex flex-column align-items-center align-items-stretch">
                <ColorButton variant="contained" className="mb-05">
                  <label htmlFor="profile-file" className="cursor-p">
                    사진 가져오기
                  </label>

                  <input
                    id="profile-file"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={fileInput}
                    onChange={onFileChange}
                  />
                </ColorButton>

                <ColorButton variant="contained" onClick={onChangePhoto}>
                  변경
                </ColorButton>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditProfileForm;
