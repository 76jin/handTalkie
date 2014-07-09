package talkie.dao;

import java.util.HashMap;
import java.util.List;

import talkie.vo.AlarmVo;

public interface AlarmDao {
	void addAlarm(AlarmVo vo) throws Throwable;
	List<AlarmVo> getAlarmList(HashMap<String, Integer> params);

}
