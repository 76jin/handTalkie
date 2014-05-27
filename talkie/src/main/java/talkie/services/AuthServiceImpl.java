package talkie.services;

import java.util.HashMap;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import talkie.dao.TalkieUserDao;
import talkie.vo.TalkieUserVo;

@Service
public class AuthServiceImpl implements AuthService {
	static Logger log = Logger.getLogger(AuthServiceImpl.class);
	
	@Autowired
	TalkieUserDao talkieUserDao;
	
	@Override
	public TalkieUserVo getLoginUser(String email, String password) {
		try {
				log.debug("===== 22222 =====");
				HashMap<String,String> params = new HashMap<String,String>();
				params.put("email", email);
				params.put("password", password);
				
				log.debug("===== 22233 =====");
				TalkieUserVo uiv = talkieUserDao.getLoginUser(params);
				log.debug("===== 33333 =====");
				if (uiv == null) 
					log.debug("uiv is null!");
				else {
					log.debug("uiv.name: " + uiv.getName());
					log.debug("uiv.email: " + uiv.getEmail());
				}
					
				log.debug("===== 44444 =====");
				
				
				return talkieUserDao.getLoginUser(params);
		} catch (Throwable ex) {
			throw new RuntimeException(ex);
		}
	}

}









