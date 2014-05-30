package talkie.controls.ajax;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import talkie.services.TalkieUserService;
import talkie.vo.AjaxResult;
import talkie.vo.TalkieUserVo;

import com.google.gson.Gson;

@Controller
@SessionAttributes("signup, loginUser")
public class profileControl {
	static Logger log = Logger.getLogger(SubjectControl.class);

	@Autowired
	TalkieUserService talkieUserService;

	public profileControl() {
		log.debug("profileInfoControl 생성됨");
	}

	@RequestMapping("/profileInfo")
	public AjaxResult profileInfo(
			String email,
			HttpServletResponse response,
			Model model){
		log.debug(email);
		
		try{
			TalkieUserVo res = talkieUserService.getProfileInfo(email);
			AjaxResult result = null;
			if (res == null) {
				result =  new AjaxResult().setStatus("ok").setData("failure");
				log.debug("프로필정보없음");

			} else {
				log.debug("=====프로필 정보있음=====");
				log.debug((new Gson().toJson(res)));
				result = new AjaxResult().setStatus("ok")	.setData((new Gson().toJson(res)));
				
			}

			response.setContentType("text/html;charset=UTF-8");

			return result;

		} catch (Throwable ex) {
			return new AjaxResult()
			.setStatus("error")
			.setData(ex.getMessage());
		}
	}

}











