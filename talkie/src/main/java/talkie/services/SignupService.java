package talkie.services;

import talkie.vo.SignupVo;

public interface SignupService {
	int signup(SignupVo signupVo);
	int getUserNo(String email);
}
