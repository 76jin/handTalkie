package talkie.dao;

import talkie.vo.SignupVo;

public interface SignupDao {
	//SignupVo signup(SignupVo signupVo);
	int addLanguage(SignupVo signupVo);
	int addUser(SignupVo signupVo);

}
