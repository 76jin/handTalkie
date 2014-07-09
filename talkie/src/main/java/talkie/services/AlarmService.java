package talkie.services;

import java.util.List;

import talkie.vo.AlarmVo;

public interface AlarmService {
	void addAlarm(AlarmVo vo);
	List<AlarmVo> alarmList(int no);

}
