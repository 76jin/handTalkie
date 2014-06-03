package talkie.dao;

import java.util.List;

import talkie.vo.FriendInfoVo;

public interface FriendInfoDao {
	List<FriendInfoVo> getFriendList(String email) throws Throwable;
}
