package talkie.controls.ajax;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import talkie.services.AuthService;
import talkie.vo.AjaxResult;
import talkie.vo.TalkieUserVo;

@Controller
@RequestMapping("/auth")
@SessionAttributes("loginUser")
public class AuthControl {
	static Logger log = Logger.getLogger(AuthControl.class);
	@Autowired
	AuthService authService;
	
	@Autowired
  ServletContext servletContext;
	
	/* 리턴 타입은 JSON으로 출력할 객체이다.
	 * - 자동으로 JSON 문자열로 변환하려면, 빈 설정파일에
	 *   JSON 변환 해결사를 등록해야 한다.
	 */
	@RequestMapping("/login")
	public AjaxResult login(
			String email,
			String password,
			@RequestParam(required=false) String saveEmail,
			HttpServletResponse response,
			Model model) {
		try {
				log.debug("===== 11111 =====");
				
				// 임시로 더미 사용자 위치 정보 저장
				loadDumyUserGPSInfo();
				
				TalkieUserVo talkieUserVo = authService.getLoginUser(email, password);
				log.debug("===== 55555 =====");
				AjaxResult result = null;
				if (talkieUserVo == null) {
					result =  new AjaxResult().setStatus("ok").setData("failure");
					log.debug("===== 66666 fail =====");
				} else {
					log.debug("===== 77777 ok =====");
					result = new AjaxResult().setStatus("ok")	.setData(talkieUserVo.getNo());
					model.addAttribute("loginUser", talkieUserVo);
					log.debug(talkieUserVo);
					
					// 쿠키 설정: 사용자 번호
					Cookie userNoCookie =
							new Cookie("userNo", Integer.toString(talkieUserVo.getNo()));
					userNoCookie.setDomain("s24.java48.com");
					userNoCookie.setPath("/talkie");
					
					response.addCookie(userNoCookie);
					
					// 쿠키 설정: email
					if (saveEmail.equals("true")) {
						Cookie cookie = new Cookie("loginEmail", email);
						cookie.setDomain("s24.java48.com"); // 서버 범위
						cookie.setPath("/talkie");			// 하위 폴더 범위

						response.addCookie(cookie);
					}

				}
				response.setContentType("text/html;charset=UTF-8");
				return result;
		} catch (Throwable ex) {
			return new AjaxResult()
					.setStatus("error")
					.setData(ex.getMessage());
		}
	}
	
	private void loadDumyUserGPSInfo() {
	  
	  // 
	  List<HashMap<String, String>> list = new ArrayList<HashMap<String, String>>();
    
    // 강남역
    putMap01(list);
    
    // 인천공항
    putMap02(list);
    
    // 명동
    // 동대문
    
    servletContext.setAttribute("gpsInfo", list);
    
  }
	
  private void putMap01(List<HashMap<String, String>> list) {
    HashMap<String, String> map01 = new HashMap<>();
    map01.put("userNo", "1"); // 사용자 번호
    map01.put("latitude", "37.494631"); // 위도
    map01.put("longitude", "127.027583"); // 경도
    map01.put("imgSrc", "img/profile/profile_1.jpg"); // 경도
    list.add(map01);
    
    HashMap<String, String> map02 = new HashMap<>();
    map02.put("userNo", "2");
    map02.put("latitude", "37.49760569477413");
    map02.put("longitude", "127.02422618865967");
    map02.put("imgSrc", "img/profile/profile_2.jpg"); // 경도
    list.add(map02);
    
    HashMap<String, String> map03 = new HashMap<>();
    map03.put("userNo", "3");
    map03.put("latitude", "37.49338360812417");
    map03.put("longitude", "127.02311038970947");
    map03.put("imgSrc", "img/profile/profile_3.jpg"); // 경도
    list.add(map03);
    
    HashMap<String, String> map04 = new HashMap<>();
    map04.put("userNo", "4");
    map04.put("latitude", "37.49103411783421");
    map04.put("longitude", "127.0259428024292");
    map04.put("imgSrc", "img/profile/profile_4.jpg"); // 경도
    list.add(map04);
    
    HashMap<String, String> map05 = new HashMap<>();
    map05.put("userNo", "5");
    map05.put("latitude", "37.492838805363476");
    map05.put("longitude", "127.03263759613037");
    map05.put("imgSrc", "img/profile/profile_5.jpg"); // 경도
    list.add(map05);
    
    HashMap<String, String> map06 = new HashMap<>();
    map06.put("userNo", "6");
    map06.put("latitude", "37.498593083824986");
    map06.put("longitude", "127.03276634216309");
    map06.put("imgSrc", "img/profile/profile_6.jpg"); // 경도
    list.add(map06);
  }
  
  private void putMap02(List<HashMap<String, String>> list) {
    HashMap<String, String> map01 = new HashMap<>();
    map01.put("userNo", "11"); // 사용자 번호
    map01.put("latitude", "37.452541"); // 위도
    map01.put("longitude", "126.451749"); // 경도
    map01.put("imgSrc", "img/profile/profile_11.jpg"); // 경도
    list.add(map01);
    
    HashMap<String, String> map02 = new HashMap<>();
    map02.put("userNo", "12");
    map02.put("latitude", "37.449968");
    map02.put("longitude", "126.446728");
    map02.put("imgSrc", "img/profile/profile_12.jpg"); // 경도
    list.add(map02);
    
    HashMap<String, String> map03 = new HashMap<>();
    map03.put("userNo", "13");
    map03.put("latitude", "37.446748");
    map03.put("longitude", "126.447500");
    map03.put("imgSrc", "img/profile/profile_13.jpg"); // 경도
    list.add(map03);
    
    HashMap<String, String> map04 = new HashMap<>();
    map04.put("userNo", "14");
    map04.put("latitude", "37.446628");
    map04.put("longitude", "126.452049");
    map04.put("imgSrc", "img/profile/profile_14.jpg"); // 경도
    list.add(map04);
    
    HashMap<String, String> map05 = new HashMap<>();
    map05.put("userNo", "15");
    map05.put("latitude", "37.443834");
    map05.put("longitude", "126.452178");
    map05.put("imgSrc", "img/profile/profile_15.jpg"); // 경도
    list.add(map05);
    
    HashMap<String, String> map06 = new HashMap<>();
    map06.put("userNo", "16");
    map06.put("latitude", "37.442829");
    map06.put("longitude", "126.454538");
    map06.put("imgSrc", "img/profile/profile_16.jpg"); // 경도
    list.add(map06);
    
    HashMap<String, String> map07 = new HashMap<>();
    map07.put("userNo", "17");
    map07.put("latitude", "37.445470");
    map07.put("longitude", "126.455568");
    map07.put("imgSrc", "img/profile/profile_17.jpg"); // 경도
    list.add(map07);
    
    HashMap<String, String> map08 = new HashMap<>();
    map08.put("userNo", "18");
    map08.put("latitude", "37.446202");
    map08.put("longitude", "126.454603");
    map08.put("imgSrc", "img/profile/profile_18.jpg"); // 경도
    list.add(map08);
    
    HashMap<String, String> map09 = new HashMap<>();
    map09.put("userNo", "19");
    map09.put("latitude", "37.446833");
    map09.put("longitude", "126.455568");
    map09.put("imgSrc", "img/profile/profile_19.jpg"); // 경도
    list.add(map09);
    
    /*
    HashMap<String, String> map10 = new HashMap<>();
    map10.put("userNo", "20");
    map10.put("latitude", "37.450120");
    map10.put("longitude", "126.455804");
    map10.put("imgSrc", "img/profile/profile_20.jpg"); // 경도
    list.add(map10);
    */
  }

  @RequestMapping("/logout")
  public String logout(HttpSession session) {
	  session.invalidate();
	  return "redirect:login.bit";
  }
	@RequestMapping("/getLoginUser")
	public AjaxResult getLoginUser(HttpSession session) {
		TalkieUserVo loginUser = (TalkieUserVo) session.getAttribute("loginUser");
		log.debug(loginUser);
		if (loginUser == null) {
			return new AjaxResult()
									.setStatus("failure")
									.setData("로그인 하지 않았습니다.3333");
		} else {
			return new AjaxResult()
									.setStatus("ok")
									.setData(loginUser);
		}
	}
}



























