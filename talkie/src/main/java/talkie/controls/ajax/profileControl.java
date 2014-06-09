package talkie.controls.ajax;

import java.io.File;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;

import talkie.services.TalkieUserService;
import talkie.vo.AjaxResult;
import talkie.vo.TalkieUserVo;

import com.google.gson.Gson;

@Controller
@SessionAttributes("signup, loginUser")
public class profileControl {
	static Logger log = Logger.getLogger(SubjectControl.class);

	static long fileCount;
	@Autowired
	TalkieUserService talkieUserService;

	@Autowired
	ServletContext servletContext;
	public profileControl() {
		log.debug("profileInfoControl 생성됨");
	}

	@RequestMapping("/profileInfo")
	public AjaxResult profileInfo(
			String email,
			HttpServletResponse response,
			Model model){
		email = email.replace("\"","");	// "hong@test.com" 버그수정
		try{
			TalkieUserVo res = talkieUserService.getProfileInfo(email);
			AjaxResult result = null;
			if (res == null) {
				result =  new AjaxResult()
							.setStatus("ok")
							.setData("failure");
				log.debug("프로필정보없음");

			} else {
				log.debug("=====프로필 정보있음=====");
				log.debug((new Gson().toJson(res)));
				result = new AjaxResult()
							.setStatus("ok")
							.setData((new Gson().toJson(res)));
			}

			response.setContentType("text/html;charset=UTF-8");
			return result;

		} catch (Throwable ex) {
			return new AjaxResult()
			.setStatus("error")
			.setData(ex.getMessage());
		}
	}


	// file upload
	//@RequestMapping("/profilePhoto")
	@RequestMapping(value="/profilePhoto", method=RequestMethod.POST)
	public AjaxResult profilePhoto(
			@RequestParam("photoData") MultipartFile photoData,
			HttpSession session,
			HttpServletResponse response) {
		try {
			AjaxResult result = null;

			TalkieUserVo loginUser = (TalkieUserVo) session.getAttribute("loginUser");

			String fullPath = servletContext.getRealPath("/img/profile");
			if (!photoData.isEmpty() && loginUser != null) {
				String filename = "profile_" + loginUser.getNo() + ".jpg"; // ex) profile_1.jpg
				File savedFile = new File(fullPath + "/" + filename);
				photoData.transferTo(savedFile);

				log.debug("=====프로필 사진 업로드 성공 =====");
				log.debug((new Gson().toJson(fullPath)));
				result = new AjaxResult().setStatus("ok").setData("success");
			} else {
				result =  new AjaxResult().setStatus("ok").setData("failure");
				log.debug("프로필 사진 업로드 실패");
			}

			response.setContentType("text/html;charset=UTF-8");

			log.debug("result:" + result);

			return result;

		} catch (Throwable ex) {
			return new AjaxResult()
			.setStatus("error")
			.setData(ex.getMessage());
		}
	}

}











