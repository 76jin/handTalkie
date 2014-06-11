package talkie.services;

import java.util.HashMap;

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

	@Override
	public int updateProfilePhoto(int userNo, String filename) {
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("userNo", userNo);
		params.put("filename", filename);
		int result = talkieUserDao.updateProfilePhoto(params);
		log.debug("result:" + result);
		return result;
	}


}









