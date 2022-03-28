import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ReactScrollableFeed from 'react-scrollable-feed';

import { CTX } from "./Store";
import ScrollableFeed from "react-scrollable-feed";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "50px",
    padding: theme.spacing(3, 2),
  },
  flex: {
    display: "flex",
    alignItems:'center'
  },
  topicsWindow: {
    width: "30%",
    height: "300px",
    borderRight:'1px solid grey'
  },
  chatWindow: {
    width: "70%",
    height: "300px",
    padding:'20px',
    overflow: "auto"
  },
  chatBox: {
    width: "85%",
  },
  button: {
    width: "15%",
  },
}));

export default function Dashboard() {
  const classes = useStyles();
//CTX store
  const {allChats, sendChatAction, user}= React.useContext(CTX);  
  const topics = Object.keys(allChats);

  //local state
  const [activeTopic, changeActiveTopic] = React.useState(topics[0]);
  const [textValue, changeTextValue] = React.useState(''); 

  const focusMethod = function getFocus(){
      document.getElementById("inputText").focus();
  }

  
  return (
    <Paper className={classes.root}>
      <Typography variant="h4" component="h4">
        Live Chat
      </Typography>
      <Typography variant="h5" component="h5">
        {activeTopic}
      </Typography>
      <div className={classes.flex}>
        <div className={classes.topicsWindow}>
            <List>
                {
                    topics.map(topic => (
                        <ListItem onClick={e => changeActiveTopic(e.target.innerText)} key={topic} button>
                            <ListItemText primary={topic} />
                        </ListItem>
                    ))     
                }           
            </List>
        </div>
        <div className={classes.chatWindow}>
            <ReactScrollableFeed>
            {
                    allChats[activeTopic].map((chat, i) => (
                        <div className={classes.flex} key={i}>
                            <Chip label={chat.from} className={classes.chip}/>
                            <Typography variant='body1'>{chat.msg}</Typography>
                        </div>
                    ))     
                }   
                </ReactScrollableFeed>
        </div>
      </div>
      <div className={classes.flex}> 
        <TextField id="inputText"
        label="Mensaje" 
        className={classes.chatBox} 
        value={textValue}
        onChange={e=>changeTextValue(e.target.value)}
        onKeyPress={event=>{
            if(event.key ==='Enter'){
            sendChatAction({from: user,msg:textValue, topic: activeTopic});
            changeTextValue('');
            focusMethod();
            }
        }}
        />
        <Button
        variant="contained" 
        color="secondary"
        onClick={()=> {
            sendChatAction({from: user,msg:textValue, topic: activeTopic});
            changeTextValue('');
            focusMethod();
        }}
        >
            Enviar
        </Button>
      </div>
    </Paper>
  );
}
