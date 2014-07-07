package talkie.dao;

import java.util.List;
import java.util.Map;

import talkie.vo.TalkieUserVo;
import talkie.vo.UserInfoVo;

public interface UserInfoDao {
	UserInfoVo getUserLanguage(Map<String,String> params);
	TalkieUserVo getfriend(int no);
	List<UserInfoVo> getShortProfile(int no);
	List<UserInfoVo> getMemberInfo(String memberNo);
}
