package talkie.dao;

import java.util.List;

import talkie.vo.ChatRoomListVo;

public interface ChatRoomListDao {
	void chatListinsert(ChatRoomListVo chatRoomList) throws Throwable;
	void logNodelete(int chatRoomNo) throws Throwable;
	List<ChatRoomListVo> getChatRoomList(int userNo);
}
