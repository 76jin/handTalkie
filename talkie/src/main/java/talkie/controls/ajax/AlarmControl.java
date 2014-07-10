package talkie.controls.ajax;

import java.util.HashMap;

import javax.servlet.ServletContext;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import talkie.services.AlarmService;
import talkie.services.TalkieUserService;
import talkie.vo.AjaxResult;
import talkie.vo.AlarmVo;

@Controller
//@SessionAttributes("locationBox")
public class AlarmControl {
	static Logger log = Logger.getLogger(AlarmControl.class);
	
	@Autowired
	AlarmService alarmService;
	TalkieUserService talkieUserService;
	
	@Autowired
	ServletContext servletContext;
	
	public AlarmControl() {
		log.debug("AlarmControl 생성됨");
	}
	
	@RequestMapping(value="/friendAddAlarm", method=RequestMethod.POST)
	public AjaxResult friendAddAlarm(AlarmVo vo) throws Throwable {
		log.debug("AlarmControl 생성됨1111111");
	        alarmService.addAlarm(vo);
			log.debug("AlarmControl44444 생성됨");
		return new AjaxResult().setStatus("ok");
	}
	
	@RequestMapping("/getAlarmList")
	   public AjaxResult getAlarmList(
	         @RequestParam(value="no") int no) {
	      
	    HashMap<String,Object> params = new HashMap<String,Object>();
	      params.put("list",alarmService.alarmList(no));
	      log.debug("위치태그정보7"+params);
	      
	      return new AjaxResult().setStatus("ok").setData(params);
	   }

	
}
