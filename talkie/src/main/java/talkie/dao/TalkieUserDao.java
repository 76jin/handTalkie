package talkie.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import talkie.vo.TalkieUserVo;

public interface TalkieUserDao {
	TalkieUserVo getLoginUser(Map<String,String> params);
	TalkieUserVo getfriendProfileInfo(String email);
	TalkieUserVo getProfileInfo(String email);
	int updateProfilePhoto(Map<String,Object> params);
	void update(TalkieUserVo talkieUser) throws Throwable;
	List<TalkieUserVo> getFriendFind(String search);
	void updateloveFr(TalkieUserVo talkieUser);
	List<TalkieUserVo> getfriendNo(int no);
	List<TalkieUserVo> getfriendinfo(int no);
	//List<TalkieUserVo> getAlarmListFriend(HashMap<String, Integer> params);
	List<TalkieUserVo> getAlarmListFriend(HashMap<String, Integer> params);
	
	/*
	void insert(TalkieUserVo user) throws Throwable;
	List<TalkieUserVo> list(Map<String,Integer> params) throws Throwable;
	TalkieUserVo detail(int no) throws Throwable;
	void update(TalkieUserVo user) throws Throwable;
	void delete(int no) throws Throwable;
	*/
}
