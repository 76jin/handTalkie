package talkie.services;

import java.util.HashMap;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import talkie.controls.ajax.LocationControl;
import talkie.dao.LocationDao;
import talkie.dao.TalkieUserDao;
import talkie.vo.LocationVo;
@Service
public class LocationServiceImpl implements LocationService {
	static Logger log = Logger.getLogger(LocationControl.class);
	@Autowired
	LocationDao locationDao;
	TalkieUserDao talkieUserDao;

	@Override
	public void add(LocationVo location) {
		try {
			locationDao.insert(location);
		} catch (Throwable ex) {
			throw new RuntimeException(ex);
		}
	}

	@Override
	public List<LocationVo>  list(int no) {
		try{
			log.debug("위치태그서비스실행5!");
			HashMap<String,Integer> params = new HashMap<String,Integer>();
			params.put("no", no);
	         
	         return locationDao.getUserLogllist(params);
		} catch (Throwable ex) {
			throw new RuntimeException(ex);
		}
	}
	

	@Override
	public void remove(int logNo) {
		try {
			locationDao.logNodelete(logNo);
		} catch (Throwable ex) {
			throw new RuntimeException(ex);
		}

	}


}

