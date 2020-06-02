import React from 'react';
import { connect } from 'react-redux';
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import styles from "./styles";

import ChatView from "./chatView";
import ChatTextBox from "./chatTextBox";
import NewChat from "./newChat";

const firebase = require('firebase');

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            selectedChatIndex: null,
            newChatFormVisible: false,
            email: null,
            chats: []
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(async usr=>{
            console.log("usr-",usr);
            if(!usr){
                this.props.history.push('/signin');
            }else{
                await firebase
                    .firestore()
                    .collection('chats')
                    .where('users','array-contains', usr.email)
                    .onSnapshot(async res=>{
                        const chats= res.docs.map(_doc=> _doc.data());
                        console.log("res-",res);
                        console.log("chats-",chats);
                        await this.setState({
                            email: usr.email,
                            chats: chats
                        })
                    })
            }
        })
    }

    goToChat = async (docKey, msg) => {
        const usersInChat = docKey.split(':');
        const chat = this.state.chats.find(_chat => usersInChat.every(_user => _chat.users.includes(_user)));
        this.setState({ newChatFormVisible: false });
        await this.selectChat(this.state.chats.indexOf(chat));
        this.submitMessage(msg);
    }

    newChatBtnClicked=()=>{
        this.setState({ newChatFormVisible: true, selectedChatIndex: null });
    }

    newChat=()=>{
        // this.setState({ newChatFormVisible:true, selectedChatIndex: null})
    };

    selectChat=async (index)=>{
        this.setState({newChatFormVisible:false, selectedChatIndex: index})
        await this.messageRead(index)
    };

    userIsSender = (chat) => chat.messages[chat.messages.length - 1].sender === this.state.email;

    buidDocKey = (friend) =>{
        console.log('friend', friend)
        return [this.state.email, friend].sort().join(':');
    };

    messageRead = (index) => {
        debugger
        const chatIndex= index >= 0 ?index: this.state.selectedChatIndex;
        debugger
        const docKey = this.buidDocKey(this.state.chats[chatIndex].users.filter(_usr => _usr !== this.state.email)[0]);
        if(this.clickedMessageWhereNotSender(chatIndex)) {
            firebase
                .firestore()
                .collection('chats')
                .doc(docKey)
                .update({ receiverHasRead: true });
        } else {
            console.log('Clicked message where the user was the sender');
        }
    };

    clickedMessageWhereNotSender = (chatIndex) => this.state.chats[chatIndex].messages[this.state.chats[chatIndex].messages.length-1].sender !== this.state.email;


    submitMessage = (msg) => {
        const docKey= this.buidDocKey(this.state.chats[this.state.selectedChatIndex].users.filter(_user=> _user !== this.state.email)[0]);
        console.log('docKey', docKey)
        firebase
            .firestore()
            .collection('chats')
            .doc(docKey)
            .update({
                messages: firebase.firestore.FieldValue.arrayUnion({
                    sender: this.state.email,
                    message: msg,
                    timestamp: Date.now()
                }),
                receiverHasRead: false
            });
    };

    newChatSubmit = async (chatObj) => {
        const docKey = this.buildDocKey(chatObj.sendTo);
        await
            firebase
                .firestore()
                .collection('chats')
                .doc(docKey)
                .set({
                    messages: [{
                        message: chatObj.message,
                        sender: this.state.email
                    }],
                    users: [this.state.email, chatObj.sendTo],
                    receiverHasRead: false
                })
        this.setState({ newChatFormVisible: false });
        this.selectChat(this.state.chats.length - 1);
    };

    render() {
        const {classes}= this.props;
        const {chats, selectedChatIndex, email, newChatFormVisible}= this.state;

        if(chats.length>0){
            return (
                <div>
                    <div className={classes.root}>
                        <Button variant={'contained'}
                                fullWidth
                                color={'primary'}
                                className={classes.newChatBtn}
                                onClick={this.newChatBtnClicked}
                        >New Message</Button>
                        <List>
                            {
                                chats && chats.map((chat, index)=>{
                                    return(
                                        <div key={index}>
                                            <ListItem
                                                onClick={()=> this.selectChat(index)}
                                                className={classes.listItem}
                                                selected={selectedChatIndex===index}
                                                alignItems={"flex-start"}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar>{chat.users.filter(user=>user!==email)[0].split('')[0]}</Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={chat.users.filter(_user => _user !== email)[0]}
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography component='span'
                                                                        color='textPrimary'>
                                                                {chat.messages[chat.messages.length - 1].message.substring(0, 30) + ' ...'}
                                                            </Typography>
                                                        </React.Fragment>
                                                    }/>
                                                {
                                                    chat.receiverHasRead === false && !this.userIsSender(chat) ?
                                                        <ListItemIcon>
                                                            <NotificationImportant className={classes.unreadMessage}/>
                                                        </ListItemIcon> :
                                                        null
                                                }

                                            </ListItem>
                                        </div>
                                    )
                                })

                            }
                        </List>
                    </div>
                    {
                        !newChatFormVisible&&
                        <ChatView
                            user={email}
                            chat={chats[selectedChatIndex]}
                        />
                    }
                    {
                        selectedChatIndex !== null && !newChatFormVisible &&
                        <ChatTextBox
                            submitMessage={this.submitMessage}
                            messageRead={this.messageRead}
                        />
                    }
                    {
                        newChatFormVisible &&
                            <NewChat
                                goToChatFn={this.goToChat}
                                newChatSubmitFn={this.newChatSubmit}
                            />
                    }
                </div>
            )
        }else{
            return(
                <div className={classes.root}>
                    <Button variant="contained"
                            fullWidth
                            color='primary'
                            onClick={this.newChat}
                            className={classes.newChatBtn}>
                        New Message
                    </Button>
                    <List></List>
                </div>
            );
        }

    }
};

const mapStateToProps= (state) =>{
    // console.log("state--", state)
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
};
export default withStyles(styles)(connect(mapStateToProps,null)(Chat));