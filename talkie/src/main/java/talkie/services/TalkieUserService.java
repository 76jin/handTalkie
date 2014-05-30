package talkie.services;

import talkie.vo.TalkieUserVo;

public interface TalkieUserService {
	TalkieUserVo getProfileInfo(String email);

}
