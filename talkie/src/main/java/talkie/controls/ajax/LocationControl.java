package talkie.controls.ajax;

import java.util.HashMap;

import javax.servlet.ServletContext;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import talkie.services.LocationService;
import talkie.vo.AjaxResult;
import talkie.vo.LocationVo;

@Controller
//@SessionAttributes("locationBox")
public class LocationControl {
	static Logger log = Logger.getLogger(LocationControl.class);
	
	@Autowired
	LocationService locationService;
	
	@Autowired
	ServletContext servletContext;
	public LocationControl() {
		log.debug("LocationControl 생성됨");
	}


	
	@RequestMapping(value="/insert", method=RequestMethod.POST)
	public AjaxResult insert(LocationVo location) {
		locationService.add(location);
		return new AjaxResult().setStatus("ok");
	}
	
	
	@RequestMapping(value="/delete", method=RequestMethod.GET)
	public AjaxResult delete(int no) {
	      log.debug("몇번몇번:"+no);
		locationService.remove(no);
		return new AjaxResult().setStatus("ok");
	}
	
	
	@RequestMapping("/loglist")
	   public AjaxResult loglist(
	         @RequestParam(value="no") int no) {
	      
	    HashMap<String,Object> params = new HashMap<String,Object>();
	      params.put("list",locationService.list(no));
	      log.debug("위치태그정보7"+params);
	      
	      return new AjaxResult().setStatus("ok").setData(params);
	   }
}
