package talkie.controls.ajax;

import java.util.HashMap;

import javax.servlet.ServletContext;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import talkie.services.ChattingRoomService;
import talkie.vo.AjaxResult;

@Controller
public class ChattingRoomControl {
	static Logger log = Logger.getLogger(ChattingRoomControl.class);
	
	@Autowired
	ChattingRoomService chattingRoomService;
	
	@Autowired
	ServletContext servletContext;
	public ChattingRoomControl() {
		log.debug("ChattingRoomControl 생성됨");
	}
	
	
	@RequestMapping("/getSenderName")
	   public AjaxResult getSenderName(
	         @RequestParam(value="chatRoomNo") int chatRoomNo) {
	      log.debug("chatRoomNo!>>>>>>>>"+chatRoomNo);
	      
	    HashMap<String,Object> params = new HashMap<String,Object>();
	      params.put("list",chattingRoomService.SenderNameLIst(chatRoomNo));
	      log.debug("채팅정보"+params);
	      
	      return new AjaxResult().setStatus("ok").setData(params);
	   }
}
