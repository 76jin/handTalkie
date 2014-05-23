package talkie.services;

import talkie.vo.UserVo;

public interface AuthService {
	UserVo getLoginUser(String email, String password, UserGroup group);
}
