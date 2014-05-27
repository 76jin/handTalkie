package talkie.dao;

import java.util.Map;

import talkie.vo.UserInfoVo;

public interface UserInfoDao {
	UserInfoVo getUserLanguage(Map<String,String> params);
}
