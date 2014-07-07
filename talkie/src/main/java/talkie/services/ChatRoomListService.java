package talkie.services;

import java.util.List;

import talkie.vo.ChatRoomListVo;

public interface ChatRoomListService {
	void add(ChatRoomListVo chatRoomList);
	void remove(int logNo);
	List<ChatRoomListVo> list(int userNo);
}
