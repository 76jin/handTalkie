package talkie.services;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import talkie.controls.ajax.LocationControl;
import talkie.dao.ChattingRoomDao;
import talkie.vo.ChattingRoomVo;
@Service
public class ChattingRoomServiceImpl implements ChattingRoomService{
	static Logger log = Logger.getLogger(LocationControl.class);
	@Autowired
	ChattingRoomDao chattingRoomDao;
	
	@Override
    public List<ChattingRoomVo> SenderNameLIst(int chatRoomNo) {
		try{
			log.debug("채팅사용자정:chatRoomNo:"+chatRoomNo);
	         return chattingRoomDao.SenderName(chatRoomNo);
		
		} catch (Throwable ex) {
			throw new RuntimeException(ex);
		}
    }
	
	



}
