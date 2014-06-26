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

	final static String SERVER_IMAGE_PATH = "img/profile/"; 
	final static int MAX_FILE_COUNTER = 10; 
	static long g_fileCount;
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


	@RequestMapping(value="/update", method=RequestMethod.POST)
	public AjaxResult update(
			TalkieUserVo talkieUser, 
			Model model) {
		
		TalkieUserVo res = talkieUserService.change(talkieUser);
	
		return new AjaxResult()
		.setStatus("ok")
		.setData((new Gson().toJson(res)));
	}
	
	
	
	// file upload
	//@RequestMapping("/profilePhoto")
	@RequestMapping(value="/profilePhoto", method=RequestMethod.POST, produces="text/html")
	public AjaxResult profilePhoto(
			@RequestParam("photoData") MultipartFile photoData,
			HttpSession session,
			HttpServletResponse response) {
		try {
			AjaxResult result = null;

			TalkieUserVo loginUser = (TalkieUserVo) session.getAttribute("loginUser");

			String fullPath = servletContext.getRealPath(SERVER_IMAGE_PATH);
			log.debug("fullPath:" + fullPath);
			
			if (!photoData.isEmpty() && loginUser != null) {
				int loginUserNo = loginUser.getNo();
				String loginUserPhotoPath = loginUser.getPhoPath();//img/profile/profile_1.jpg
				String loginUserPhotoFileName = loginUserPhotoPath.substring(12); //split:img/profile/
				log.debug("loginUserPhotoFileName:" + loginUserPhotoFileName);
				log.debug("loginUser.getPhotoPath:" + loginUserPhotoPath);
				log.debug("fullPath + SERVER_IMAGE_PATH + loginUserPhotoFileName:" + (fullPath + "/" + loginUserPhotoFileName));
				
				// 현재 파일 삭제
				File savedFile = new File(fullPath + "/" + loginUserPhotoFileName);
				
				boolean deleteResult = false;
				try {
					deleteResult = savedFile.delete();
				}catch(Exception e){
					log.error("Error: Can't delete this file:" + fullPath + "/" + loginUserPhotoFileName);
					e.printStackTrace();
				
				} finally {
					if (!deleteResult) {
						System.out.println("Failed delete this file!");
						result =  new AjaxResult().setStatus("ok").setData("failure");
						return result;
					}
				}
				
				// 새 파일명으로 프로필 사진 저장.
				// 파일명이 동일하면 웹브라우저에서 사진업데이트가 안됨.
				if ( g_fileCount > 10000) {
					g_fileCount = 0;
				} else {
					g_fileCount++;
				}
				
				String newFileName = "profile_" + loginUser.getNo() +
						"_createdAt_" + System.currentTimeMillis() + 
						"_" + g_fileCount + ".jpg";
				
				log.debug("newFileName:" + newFileName +",\n\n=====full:" + (fullPath + "/" + newFileName));
				File savingFile = new File(fullPath + "/" + newFileName);
				photoData.transferTo(savingFile);

				log.debug("=====프로필 사진 업로드 성공 =====");
				
				// DB에 프로필 사진 파일 경로(이름포함) 저장
				String phoPath = SERVER_IMAGE_PATH + newFileName;
				log.debug("lastFileName:" + phoPath);
				if( savePhotoToDB(loginUserNo, phoPath) == 1 ) {
					log.debug("===== DB에 파일 경로 저장 성공!");
					// 세션에 현재 사용자 프로필 사진 경로 업데이트
					loginUser.setPhoPath(phoPath);
					session.setAttribute("loginUser", loginUser);
					
					result = new AjaxResult().setStatus("ok").setData(phoPath);
				} else {
					log.debug("===== DB에 파일 경로 저장 실패!");
					result =  new AjaxResult().setStatus("ok").setData("failure");
				}
				
			} else {
				result =  new AjaxResult().setStatus("ok").setData("failure");
				log.debug("프로필 사진 업로드 실패");
				log.debug("photoData:" + photoData + ", loginUser:" + loginUser);
			}

			//response.setContentType("text/html;charset=UTF-8");

			log.debug("result:" + result);

			return result;

		} catch (Throwable ex) {
			return new AjaxResult()
			.setStatus("error")
			.setData(ex.getMessage());
		}
	}

	public int savePhotoToDB(int loginUserNo, String filename) {
		try{
			int res = talkieUserService.updateProfilePhoto(loginUserNo, filename);
			log.debug("res:" + res);
			return res;

		} catch (Throwable ex) {
			return 0;
		}
	}

}











