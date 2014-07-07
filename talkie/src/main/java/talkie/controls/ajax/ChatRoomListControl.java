package talkie.controls.ajax;

import java.util.HashMap;

import javax.servlet.ServletContext;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import talkie.services.ChatRoomListService;
import talkie.vo.AjaxResult;
import talkie.vo.ChatRoomListVo;

@Controller
public class ChatRoomListControl {
	static Logger log = Logger.getLogger(ChatRoomListControl.class);
	
	@Autowired
	ChatRoomListService chatRoomListService;
	
	@Autowired
	ServletContext servletContext;
	public ChatRoomListControl() {
		log.debug("ChatRoomListControl 생성됨");
	}
	
	@RequestMapping(value="/chatListinsert", method=RequestMethod.POST)
	public AjaxResult chatListinsert(ChatRoomListVo chatRoomList) {
		log.debug("ChatRoomListControl 시작?????");
		chatRoomListService.add(chatRoomList);
		return new AjaxResult().setStatus("ok");
	}
	
	
	@RequestMapping("/chatList")
	   public AjaxResult chatList(
	         @RequestParam(value="userNo") int userNo) {
	      log.debug("채팅정보실행시작!>>>>>>>>"+userNo);
	      
	    HashMap<String,Object> params = new HashMap<String,Object>();
	      params.put("list",chatRoomListService.list(userNo));
	      log.debug("채팅정보"+params);
	      
	      return new AjaxResult().setStatus("ok").setData(params);
	   }
}
