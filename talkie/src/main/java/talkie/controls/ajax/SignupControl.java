package talkie.controls.ajax;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import talkie.services.SignupService;
import talkie.vo.AjaxResult;
import talkie.vo.SignupVo;
import talkie.vo.TalkieUserVo;

@Controller
@RequestMapping("/auth")
@SessionAttributes("signup, loginUser")
public class SignupControl {
	static Logger log = Logger.getLogger(SignupControl.class);
	
	@Autowired
	SignupService signupService;
	
	/* 리턴 타입은 JSON으로 출력할 객체이다.
	 * - 자동으로 JSON 문자열로 변환하려면, 빈 설정파일에
	 *   JSON 변환 해결사를 등록해야 한다.
	 */
	@RequestMapping("/insertSignUp")
	public AjaxResult insertSignUp(
			String name, 
			String email, 
			String password,
			String country, 
			String language, 
			HttpServletResponse response,
			Model model) {
		try {
				log.debug("===== 11111 =====");
				log.debug("name:" + name);
				log.debug("email:" + email);
				log.debug("password:" + password);
				log.debug("country:" + country);
				log.debug("language:" + language);
				
				int nationNo;
				switch (country) {
					case "Korea":		nationNo = 1;
					case "U.S.A":		nationNo = 2;
					default:			nationNo = 1;
				}
				log.debug("nationNo:" + nationNo);
				
				int languageNo;
				switch (country) {
					case "Korean":	languageNo = 1;
					case "English":	languageNo = 2;
					default:			languageNo = 1;
				}
				log.debug("languageNo:" + languageNo);
				
				SignupVo svo = new SignupVo();
				svo.setName(name);
				svo.setEmail(email);
				svo.setPassword(password);
				svo.setCountry(nationNo);
				svo.setLanguage(languageNo);
				
				int res = signupService.signup(svo);
				log.debug("===== 55555 =====");
				
				AjaxResult result = null;
				if (res == 0) {
					result =  new AjaxResult().setStatus("ok").setData("failure");
					log.debug("===== 66666 fail =====");
					
				} else {
					log.debug("===== 77777 ok =====");
					result = new AjaxResult().setStatus("ok")	.setData("success");
					model.addAttribute("signup", svo);
					log.debug("svo.getlang:" + svo.getLanguage());
				}
				
				response.setContentType("text/html;charset=UTF-8");
				
				return result;
				
		} catch (Throwable ex) {
			return new AjaxResult()
					.setStatus("error")
					.setData(ex.getMessage());
		}
	}
	
	@RequestMapping("/deleteSignUp")
  public String deleteSignUp(HttpSession session) {
		// TBD
/*	  session.invalidate();
	  return "redirect:login.bit";*/
		return null;
  }
	
	@RequestMapping("/getUserInfo")
	public AjaxResult getLoginInfo(HttpSession session) {
		TalkieUserVo loginUser = (TalkieUserVo) session.getAttribute("loginUser");
		
		if (loginUser == null) {
			log.debug("after userInfo:" + loginUser);
			
			return new AjaxResult()
									.setStatus("failure")
									.setData("로그인 하지 않았습니다.2222");
		} else {
			return new AjaxResult()
									.setStatus("ok")
									.setData(loginUser);
		}
	}
}



























