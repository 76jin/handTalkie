package talkie.services;

import org.springframework.beans.factory.annotation.Autowired;

import talkie.dao.FriendInfoDao;
import talkie.vo.FriendInfoVo;

public class FriendInfoServiceImpl implements FriendInfoService {

	@Autowired
	FriendInfoDao friendInfoDao;
	
	@Override
	public FriendInfoVo getFriendList(String email) {
		try{
			return friendInfoDao.getFriendList(email);
		} catch (Throwable ex) {
			throw new RuntimeException(ex);
		}
	}

}
