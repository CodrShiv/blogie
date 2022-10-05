import React, { useRef, useState } from "react";

import { Button, TextField } from "@mui/material";
import BundledEditor from "./BundledEditor";
import axios from "axios";
import {BASE_API_URL, CLIENT_URL} from "./constants";
import base64 from 'base-64';
import utf8 from 'utf8';

const Interface = () => {
  return     <main>
      
  <BundledEditor editorRef={editorRef} />
  <form onSubmit={(e) => handleSubmit(e)}>
    <TextField
      id="filled-basic"
      label="UserName"
      onChange={(e) => onTextChange(e)}
      name="username"
      variant="filled"
      required
    />
    <TextField
      id="filled-basic"
      label="RepoName"
      onChange={(e) => onTextChange(e)}
      name="reponame"
      variant="filled"
      required
    />
    <Button type="submit" variant="outlined">
      PUSH TO GITHUB
    </Button>
  </form>
</main>
}
const App = () => {
  const editorRef = useRef(null);
  let token = window.location.href.split("access_token=")[1];
  if (token) {
    localStorage.setItem("access_token", token);
  } 
  // if (!localStorage.getItem("access_token")) {
  //   window.location.href = `${CLIENT_URL}/login`
  // }
  const [textValue, setTextValue] = useState({});

  const onTextChange = (e) => {
    let myObj = { ...textValue };
    myObj[e.target.name] = e.target.value;
    setTextValue(myObj);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editorRef.current) {
      let bytes = utf8.encode(editorRef.current.getContent());
      axios.post(`${BASE_API_URL}/create`, { data: JSON.stringify(textValue), content: base64.encode(bytes), auth: localStorage.getItem("access_token") })
    }
  };
  return (

  );
};

export default App;
