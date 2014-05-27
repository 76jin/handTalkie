package talkie.services;

import talkie.vo.TalkieUserVo;

public interface AuthService {
	TalkieUserVo getLoginUser(String email, String password);
}
