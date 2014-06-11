package talkie.dao;

import java.util.Map;

import talkie.vo.TalkieUserVo;

public interface TalkieUserDao {
	TalkieUserVo getLoginUser(Map<String,String> params);
	TalkieUserVo getProfileInfo(String email);
	int updateProfilePhoto(Map<String,Object> params);
	
	/*
	void insert(TalkieUserVo user) throws Throwable;
	List<TalkieUserVo> list(Map<String,Integer> params) throws Throwable;
	TalkieUserVo detail(int no) throws Throwable;
	void update(TalkieUserVo user) throws Throwable;
	void delete(int no) throws Throwable;
	*/
}
