package talkie.dao;

import java.util.List;

import talkie.vo.ChattingRoomVo;

public interface ChattingRoomDao {
	List<ChattingRoomVo> SenderName(int chatRoomNo);
}
