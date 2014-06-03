package talkie.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import talkie.dao.FriendInfoDao;
import talkie.vo.FriendInfoVo;

@Service
public class FriendInfoServiceImpl implements FriendInfoService {

	@Autowired
	FriendInfoDao friendInfoDao;
	
	@Override
	public List<FriendInfoVo> getFriendList(String email) {
		try{
			return friendInfoDao.getFriendList(email);
		} catch (Throwable ex) {
			throw new RuntimeException(ex);
		}
	}

}
