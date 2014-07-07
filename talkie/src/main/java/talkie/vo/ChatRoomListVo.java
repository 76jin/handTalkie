package talkie.vo;

import java.sql.Date;

public class ChatRoomListVo {

	int textNo;
	int chatRoomNo;
	int sender;
	String chatText;
	Date sendTime;
	
	@Override
    public String toString() {
	    return "ChatRoomListVo [textNo=" + textNo + ", chatRoomNo="
	            + chatRoomNo + ", sender=" + sender + ", chatText=" + chatText
	            + ", sendTime=" + sendTime + "]";
    }
	
	public int getTextNo() {
		return textNo;
	}
	public ChatRoomListVo setTextNo(int textNo) {
		this.textNo = textNo;
		return this;
	}
	public int getChatRoomNo() {
		return chatRoomNo;
	}
	public ChatRoomListVo setChatRoomNo(int chatRoomNo) {
		this.chatRoomNo = chatRoomNo;
		return this;
	}
	public int getSender() {
		return sender;
	}
	public ChatRoomListVo setSender(int sender) {
		this.sender = sender;
		return this;
	}
	public String getChatText() {
		return chatText;
	}
	public ChatRoomListVo setChatText(String chatText) {
		this.chatText = chatText;
		return this;
	}
	public Date getSendTime() {
		return sendTime;
	}
	public ChatRoomListVo setSendTime(Date sendTime) {
		this.sendTime = sendTime;
		return this;
	}
	
//	LOGNO
//	CHATROOMNO
//	SENDER
//	CHATTEXT
//	SENDTIME
	
	
	
}
