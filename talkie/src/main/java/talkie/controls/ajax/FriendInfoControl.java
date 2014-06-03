package talkie.controls.ajax;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import talkie.services.FriendInfoService;
import talkie.vo.AjaxResult;
import talkie.vo.FriendInfoVo;

@Controller
@RequestMapping("/friend")
// @SessionAttributes("")
public class FriendInfoControl {
	static Logger log = Logger.getLogger(FriendInfoControl.class);
	
	@Autowired
	FriendInfoService friendInfoService;
	
	@RequestMapping("/friendList")
	public AjaxResult friendList(
			 String email,
			 HttpServletResponse response){
		try{
			log.debug("===== 11111 =====");
			log.debug("email:" + email);
			List<FriendInfoVo> friendInfoVoList = friendInfoService.getFriendList(email);
			log.debug(friendInfoVoList.toString());
			
			
		  AjaxResult result = null;
			if (friendInfoVoList == null) {
				result =  new AjaxResult().setStatus("ok").setData("failure");
				log.debug("===== 66666 fail =====");
				
			} else {
				log.debug("===== 77777 ok =====");
				result = new AjaxResult().setStatus("ok")	.setData(friendInfoVoList);
				//model.addAttribute("loginUser", friendInfoVo);
				//log.debug(friendInfoVo);
				
				// add userinfoVo
			}
			
			response.setContentType("text/html;charset=UTF-8");
			
			return result;
			
	}	catch (Throwable ex) {
			return new AjaxResult()
					.setStatus("error")
					.setData(ex.getMessage());
		}
	}
	
	@RequestMapping("/getFriendInfo")
	public AjaxResult getFriendInfo(
			 String email,
			 HttpServletResponse response){
		try{
			log.debug("===== 11111 =====");
			log.debug("email:" + email);
			List<FriendInfoVo> friendInfoVoList = friendInfoService.getFriendList(email);
			log.debug(friendInfoVoList.toString());
			
			
		  AjaxResult result = null;
			if (friendInfoVoList == null) {
				result =  new AjaxResult().setStatus("ok").setData("failure");
				log.debug("===== 66666 fail =====");
				
			} else {
				log.debug("===== 77777 ok =====");
				result = new AjaxResult().setStatus("ok")	.setData(friendInfoVoList);
				//model.addAttribute("loginUser", friendInfoVo);
				//log.debug(friendInfoVo);
				
				// add userinfoVo
			}
			
			response.setContentType("text/html;charset=UTF-8");
			
			return result;
			
	}	catch (Throwable ex) {
			return new AjaxResult()
					.setStatus("error")
					.setData(ex.getMessage());
		}
	}

}
