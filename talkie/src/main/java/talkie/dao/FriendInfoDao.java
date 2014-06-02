package talkie.dao;

import talkie.vo.FriendInfoVo;

public interface FriendInfoDao {
	FriendInfoVo getFriendList(String email) throws Throwable;
}
