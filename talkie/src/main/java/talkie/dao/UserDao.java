package talkie.dao;

import java.util.Map;

import talkie.vo.UserVo;

public interface UserDao {
	UserVo getUser(Map<String,String> params);
	void insert(UserVo user);
}
