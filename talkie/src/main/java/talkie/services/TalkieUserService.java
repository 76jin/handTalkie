package talkie.services;

import talkie.vo.TalkieUserVo;

public interface TalkieUserService {
	TalkieUserVo getProfileInfo(String email);
	int updateProfilePhoto(int userNo, String filename);
	TalkieUserVo change(TalkieUserVo talkieUser);
}
