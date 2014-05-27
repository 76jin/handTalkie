package talkie.services;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import talkie.dao.SignupDao;
import talkie.vo.SignupVo;

@Service
public class SignupServiceImpl implements SignupService {
	static Logger log = Logger.getLogger(AuthServiceImpl.class);
	
	@Autowired
	SignupDao signupDao;

	@Transactional(
			propagation=Propagation.REQUIRED, 
			rollbackFor=Throwable.class)
	@Override
	public int signup(SignupVo signupVo) {
		try {
			log.debug("===== gooood =====");
			int i = signupDao.addUser(signupVo);
			int j = signupDao.addLanguage(signupVo);
			
			System.out.println("i:" + i + ", j:" + j);
			
			if ( i > 0 && j > 0) {
				return 1;
			}
			
			return 0;
			
		} catch (Throwable ex) {
			throw new RuntimeException(ex);
		}
	}
	
}









