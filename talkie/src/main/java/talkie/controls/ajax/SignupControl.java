package talkie.controls.ajax;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import talkie.services.SignupService;
import talkie.services.TalkieUserService;
import talkie.vo.AjaxResult;
import talkie.vo.SignupVo;
import talkie.vo.TalkieUserVo;

@Controller
@RequestMapping("/auth")
@SessionAttributes("signup, loginUser")
public class SignupControl {
	static Logger log = Logger.getLogger(SignupControl.class);
	
	@Autowired
	ServletContext servletContext;
	
	@Autowired
	TalkieUserService talkieUserService;
	
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
				log.info("name:" + name);
				log.info("email:" + email);
				log.info("password:" + password);
				log.info("country:" + country);
				log.info("language:" + language);
				
				int nationNo;
				switch (country) {
					case "Korea":		nationNo = 1;
					case "U.S.A":		nationNo = 2;
					default:			nationNo = 1;
				}
				log.info("nationNo:" + nationNo);
				
				int languageNo;
				switch (language) {
					case "Korean":	languageNo = 1;
					case "English":	languageNo = 2;
					default:			languageNo = 1;
				}
				log.info("languageNo:" + languageNo);
				
				SignupVo svo = new SignupVo();
				svo.setName(name);
				svo.setEmail(email);
				svo.setPassword(password);
				svo.setCountry(nationNo);
				svo.setLanguage(languageNo);
				
				int resultSignUp = signupService.signup(svo);
				
				int userNo = signupService.getUserNo(email);
				
				// check mysql error
				if (resultSignUp == 0 || userNo <= 0 ) {
					AjaxResult result = null;
					result =  new AjaxResult().setStatus("ok").setData("failure");
					
					response.setContentType("text/html;charset=UTF-8");
					return result;
				}
				
				// 서버에 사용자 사진 저장 (기본사진:no-profile-image.jpg)
				String fullPath = servletContext.getRealPath("/img/profile");
				
				String filename = "profile_" + userNo + ".jpg"; // ex) profile_1.jpg
				File destFile = new File(fullPath + "/" + filename);
				String sourceFile = fullPath + "/no-profile-image.jpg";
				
				//log.debug("saveFilePath:" + destFile.toPath());
				//log.debug("sourceFile:" + sourceFile);
				
				Path sourcePath = Paths.get(sourceFile);
				Path destPath = Paths.get(destFile.toPath().toString());
				
				boolean resultCopy = false;
				
				try {
					Files.copy(sourcePath, destPath);
					resultCopy = true;
				} catch (IOException e) {
					resultCopy = false;
					e.printStackTrace();
				}
				
				// DB에 사용자 프로필 사진 경로 저장.
				boolean resultUpdate = false;
				
				try{
					int resUpdate = talkieUserService.updateProfilePhoto(userNo, "img/profile/" + filename);
					log.debug("resUpdate:" + resUpdate);
					resultUpdate = true;

				} catch (Throwable ex) {
					resultUpdate = false;
					ex.printStackTrace();
				}

				
				AjaxResult result = null;
				if (resultSignUp == 0 || !resultCopy || !resultUpdate ) {
					result =  new AjaxResult().setStatus("ok").setData("failure");
					
				} else {
					result = new AjaxResult().setStatus("ok").setData("success");
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



























