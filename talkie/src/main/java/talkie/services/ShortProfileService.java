package talkie.services;

import java.util.List;

import talkie.vo.UserInfoVo;

public interface ShortProfileService {
	List<UserInfoVo> getShortProfile(int no);
}
