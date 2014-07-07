package talkie.services;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import talkie.dao.UserInfoDao;
import talkie.vo.UserInfoVo;

@Service
public class ShortProfileServiceImpl implements ShortProfileService {
	static Logger log = Logger.getLogger(AuthServiceImpl.class);
	
	@Autowired
	UserInfoDao userInfoDao;

	@Override
    public List<UserInfoVo> getShortProfile(int no) {
		return userInfoDao.getShortProfile(no);
    }
	@Override
    public List<UserInfoVo> getMemberArrLIst(String memberNo) {
		return userInfoDao.getMemberInfo(memberNo);
	
	
	}
}









