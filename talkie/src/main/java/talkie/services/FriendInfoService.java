package talkie.services;

import java.util.List;

import talkie.vo.FriendInfoVo;

public interface FriendInfoService {
	List<FriendInfoVo> getFriendList(String email);
	
}
