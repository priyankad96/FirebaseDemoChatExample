import React from "react";
import {withStyles} from "@material-ui/core";
import styles from "./styles";

class ChatView extends React.Component{

    componentDidUpdate() {
        const container=document.getElementById('chatview-container');
        if(container){
            container.scrollTo(0, container.scrollHeight);
        }
    }

    render() {
        const {classes, chat, user}= this.props;

        if(chat === undefined){
            return (
                <main id={'chatview-container'} className={classes.content}/>
            )
        }else{
            return(
                <div>
                   <div className={classes.chatHeader}>
                       Your conversation with {chat.users.filter(_user => _user!== user)[0]}
                   </div>
                    <main id={'chatview-container'} className={classes.content}>
                        {
                            chat.messages.map((msg, index)=>{
                                return(
                                    <div key={index} className={msg.sender===user ? classes.userSent : classes.friendSent}>
                                        {msg.message}
                                    </div>
                                )})
                        }
                    </main>
                </div>
            )

        }
    }
}

export default withStyles(styles)(ChatView);