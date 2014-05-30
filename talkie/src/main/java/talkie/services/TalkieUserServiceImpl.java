package talkie.services;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import talkie.dao.TalkieUserDao;
import talkie.vo.TalkieUserVo;

@Service
public class TalkieUserServiceImpl implements TalkieUserService {
	static Logger log = Logger.getLogger(AuthServiceImpl.class);
	
	@Autowired
	TalkieUserDao talkieUserDao;

	@Override
    public TalkieUserVo getProfileInfo(String email) {
		TalkieUserVo talkieUser =  talkieUserDao.getProfileInfo(email);
		System.out.println(talkieUser);
	    return talkieUser ;
    }


}









