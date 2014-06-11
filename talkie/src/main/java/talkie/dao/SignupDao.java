package talkie.dao;

import talkie.vo.SignupVo;

public interface SignupDao {
	//SignupVo signup(SignupVo signupVo);
	int addLanguage(SignupVo signupVo)  throws Throwable;
	int addUser(SignupVo signupVo)  throws Throwable;
	int getUserNo(String email)  throws Throwable;

}
