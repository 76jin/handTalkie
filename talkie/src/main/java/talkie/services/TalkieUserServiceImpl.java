package talkie.services;

import java.util.HashMap;
import java.util.List;

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
    public TalkieUserVo getfriendProfileInfo(String email) {
		TalkieUserVo talkieUser =  talkieUserDao.getfriendProfileInfo(email);
		System.out.println(talkieUser);
	    return talkieUser ;
    }
	
	@Override
    public List<TalkieUserVo>  getfriendNo(int no) {
		List<TalkieUserVo> vo =  talkieUserDao.getfriendNo(no);
		System.out.println(vo);
	    return vo ;
    }
	
	@Override
    public List<TalkieUserVo>  getfriendinfo(int no) {
		List<TalkieUserVo> vo =  talkieUserDao.getfriendinfo(no);
		System.out.println(vo);
	    return vo ;
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

	@Override
    public TalkieUserVo change(TalkieUserVo talkieUser) {
				try {
					talkieUserDao.update(talkieUser);
				} catch (Throwable ex) {
					throw new RuntimeException(ex);
				}
				return talkieUser;
    }


	@Override
    public List<TalkieUserVo> getFriendFind(String search) {
		log.debug("여긴가?2222"+search);
//	    String Korean = "";
//	    String English = "";
//	    
//	    if(search==Korean) { //언어!!
//	    		search = "1";
//	    } else if(search==English) { 
//	    		search = "2";
//        }
	    log.debug("언어:::>>>"+ search);
	    return talkieUserDao.getFriendFind(search);
	}

	@Override
    public void updateloveFr(TalkieUserVo vo) {
	      try {
	    	  talkieUserDao.updateloveFr(vo);
	       } catch (Throwable ex) {
	          throw new RuntimeException(ex);
	       }
    }
	
//	@Override
//    public List<TalkieUserVo> alarmListFriend(int frNo) {
//		try{
//		      log.debug("getAlarmListFriend22222"+frNo);
//			HashMap<String,Integer> params = new HashMap<String,Integer>();
//			params.put("frNo", frNo);
//			  log.debug("getAlarmListFriend33333"+frNo);
//	         return talkieUserDao.getAlarmListFriend(params);
//		} catch (Throwable ex) {
//			throw new RuntimeException(ex);
//		}    
//	}

	@Override
    public List<TalkieUserVo> alarmListFriend(int frNo, int alarmNo) {
		try{
		      log.debug("getAlarmListFriend22222"+frNo+","+alarmNo);
			HashMap<String,Integer> params = new HashMap<String,Integer>();
			params.put("frNo", frNo);
			params.put("alarmNo", alarmNo);
			  log.debug("getAlarmListFriend33333"+frNo+","+alarmNo);
	         return talkieUserDao.getAlarmListFriend(params);
		} catch (Throwable ex) {
			throw new RuntimeException(ex);
		}   
    }
}









