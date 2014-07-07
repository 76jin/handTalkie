package talkie.services;

import java.util.List;

import talkie.vo.TalkieUserVo;

public interface TalkieUserService {
	TalkieUserVo getProfileInfo(String email);
	TalkieUserVo getfriendProfileInfo(String email);
	int updateProfilePhoto(int userNo, String filename);
	TalkieUserVo change(TalkieUserVo talkieUser);
	List<TalkieUserVo> getFriendFind(String search);
	void updateloveFr(TalkieUserVo vo);
	List<TalkieUserVo> getfriendNo(int no);
	List<TalkieUserVo> getfriendinfo(int no);
	// List<TalkieUserVo>  alarmListFriend(int frNo);
	List<TalkieUserVo> alarmListFriend(int frNo, int alarmNo);
	
}
