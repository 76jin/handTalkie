package talkie.controls.ajax;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import talkie.services.LocationService;
import talkie.services.TalkieUserService;
import talkie.vo.AjaxResult;
import talkie.vo.LocationVo;
import talkie.vo.TalkieUserVo;

import com.google.gson.Gson;

@Controller
//@SessionAttributes("locationBox")
public class LocationControl {
	static Logger log = Logger.getLogger(LocationControl.class);
	
	@Autowired
	LocationService locationService;
	
	@Autowired
  TalkieUserService talkieUserService;
	
	@Autowired
	ServletContext servletContext;
	public LocationControl() {
		log.debug("LocationControl 생성됨");
	}


	
	@RequestMapping(value="/insert", method=RequestMethod.POST)
	public AjaxResult insert(LocationVo location) {
		locationService.add(location);
		return new AjaxResult().setStatus("ok");
	}
	
	
	@RequestMapping(value="/delete", method=RequestMethod.GET)
	public AjaxResult delete(int no) {
	      log.debug("몇번몇번:"+no);
		locationService.remove(no);
		return new AjaxResult().setStatus("ok");
	}
	
	
	@RequestMapping("/loglist")
	   public AjaxResult loglist(
	         @RequestParam(value="no") int no) {
	      
	    HashMap<String,Object> params = new HashMap<String,Object>();
	      params.put("list",locationService.list(no));
	      log.debug("위치태그정보7"+params);
	      
	      return new AjaxResult().setStatus("ok").setData(params);
	   }
	

  @RequestMapping("/getUserGPSInfo")
  public AjaxResult profileInfo(
      char sex,
      int language,
      HttpServletResponse response,
      Model model){
    log.debug("called getOtherLocation() sex:" + sex + ", language:" + language);
    
    
    List<HashMap<String, String>> tempGpsInfoList = new ArrayList<HashMap<String, String>>();
    List<HashMap<String, String>> gpsInfoList = (List<HashMap<String, String>>)servletContext.getAttribute("gpsInfo");
    
    log.debug("list.size() 01 " + gpsInfoList.size());
    
    for (int cnt = 0; cnt < gpsInfoList.size(); cnt++) {
      HashMap<String, String> gpsInfo = gpsInfoList.get(cnt);
      
      for ( String key : gpsInfo.keySet() ) {
        System.out.println(key + ":" + gpsInfo.get(key));
      }
      
      // 필터링하여 추가하기
      int userNo = Integer.parseInt(gpsInfo.get("userNo"));
      if (isFiltered(userNo, sex, language)) {
        tempGpsInfoList.add(gpsInfo);
      } else {
        log.debug("필터링됨!");
      }
      
    }
    
    // 결과 리턴
    AjaxResult result = null;
    if (gpsInfoList.equals(null)) {
      log.debug("사용자 위치 정보없음");
      result =  new AjaxResult()
      .setStatus("ok")
      .setData("failure");

    } else {
      log.debug("=====사용자 위치 있음=====");
      log.debug((new Gson().toJson(tempGpsInfoList)));
      result = new AjaxResult()
      .setStatus("ok")
      .setData(tempGpsInfoList);
    }

    return result;
  }



  private boolean isFiltered(int userNo, char sex, int language) {
    // 사용자 번호로 정보 가져옴.
    TalkieUserVo talkieUserVo = talkieUserService.getUserInfo(userNo);
    boolean isGenderOK = false;
    boolean isLangOK = false;
    
    // 성별 검사
    char myGender = talkieUserVo.getGender();
    log.debug("myGender:::" + myGender + "::: sex:::" + sex);
    
    if (sex == 'a' || sex == '0') {
      isGenderOK = true;
    } else if (sex == myGender) {
      isGenderOK = true;
    } else {
      isGenderOK = false;
    }
    
    // 언어 검사
    int myLang = talkieUserVo.getNation();
    log.debug("myLang:::" + myLang + " :::language::: " + language);
    if (language == 0) {
      isLangOK = true;
    } else if (language == myLang) {
      isLangOK = true;
    } else {
      isLangOK = false;
    }
    
    if ( isGenderOK && isLangOK ) {
      return true;
    } else {
      return false;
    }
  }
}
