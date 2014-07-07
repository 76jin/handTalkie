package talkie.controls.ajax;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import talkie.services.FriendInfoService;
import talkie.services.TalkieUserService;
import talkie.vo.AjaxResult;
import talkie.vo.FriendInfoVo;
import talkie.vo.TalkieUserVo;

@Controller
@RequestMapping("/friend")
// @SessionAttributes("")
public class FriendInfoControl {
	static Logger log = Logger.getLogger(FriendInfoControl.class);
	
	@Autowired
	FriendInfoService friendInfoService;
	
	@Autowired
	TalkieUserService talkieUserService;
	
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
			log.debug("email:" + email);
			List<FriendInfoVo> friendInfoVoList = friendInfoService.getFriendList(email);
			log.debug(friendInfoVoList.toString());
			
		      return new AjaxResult().setStatus("ok").setData(friendInfoVoList);
			
			
	}	catch (Throwable ex) {
			return new AjaxResult()
					.setStatus("error")
					.setData(ex.getMessage());
		}
	}

	
    @RequestMapping("/getFriendFind")
	public AjaxResult getFriendFind(
	        @RequestParam(value="search") String search) {
		      log.debug("채팅정보실행시작!>>>>>>>>"+search);
		
    			log.debug("여긴가?"+search);

				  HashMap<String,Object> params = new HashMap<String,Object>();
			      params.put("list",talkieUserService.getFriendFind(search));
			      log.debug("친구검색결과::"+params);
			      
			      return new AjaxResult().setStatus("ok").setData(params);
			     
	}
    

    @RequestMapping(value="/getPlusLoveFr", method=RequestMethod.POST)
    public AjaxResult update(TalkieUserVo vo) {
       
    	talkieUserService.updateloveFr(vo);
       return  new AjaxResult().setStatus("ok");
    }
	
    @RequestMapping(value="/addMyFriendList", method=RequestMethod.POST)
	public AjaxResult addMyFriendList(FriendInfoVo vo) {
    	friendInfoService.addMyFriend(vo);
		return  new AjaxResult().setStatus("ok");

    }
}
