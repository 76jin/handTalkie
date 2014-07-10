package talkie.services;

import java.util.HashMap;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import talkie.controls.ajax.AlarmControl;
import talkie.dao.AlarmDao;
import talkie.vo.AlarmVo;


@Service
public class AlarmServiceImpl implements AlarmService{
	static Logger log = Logger.getLogger(AlarmControl.class);
	@Autowired
	AlarmDao alarmDao;
	
	@Override
	  public void addAlarm(AlarmVo vo){
		try {
			log.debug("AlarmControl22222생성됨");
			alarmDao.addAlarm(vo);
		} catch (Throwable ex) {
			throw new RuntimeException(ex);
		}
	}

	@Override
    public List<AlarmVo> alarmList(int no) {
		try{
			log.debug("알람리스트 불러오기실행5!");
			HashMap<String,Integer> params = new HashMap<String,Integer>();
			params.put("no", no);
	         
	         return alarmDao.getAlarmList(params);
		} catch (Throwable ex) {
			throw new RuntimeException(ex);
		}    
	}
	

	
	
	
	
	
}
