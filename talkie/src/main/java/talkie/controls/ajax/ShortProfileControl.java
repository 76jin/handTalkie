package talkie.controls.ajax;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import talkie.services.ShortProfileService;
import talkie.vo.AjaxResult;
import talkie.vo.UserInfoVo;

import com.google.gson.Gson;

@Controller
@SessionAttributes("signup, loginUser")
public class ShortProfileControl {
	static Logger log = Logger.getLogger(ShortProfileControl.class);

	@Autowired
	ShortProfileService shortProfileService;

	public ShortProfileControl() {
		log.debug("shortProfileService 생성됨");
	}

    @RequestMapping("/ShortProfile")
	public AjaxResult shortProfile(
			int 		no,
			String 	name,
			String nation,
			String languageNo,
			HttpServletResponse response,
			Model model){
		log.debug("여긴가?"+no);

		try{
			List<UserInfoVo> res = shortProfileService.getShortProfile(no); 
			
			AjaxResult result = null;
			if (res == null) {
				result =  new AjaxResult().setStatus("ok").setData("failure");
				log.debug("친구프로필정보없음");

			} else {
				log.debug("=====친구프로필 정보있음=====");
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











