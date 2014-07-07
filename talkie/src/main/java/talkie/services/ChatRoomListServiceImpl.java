package talkie.services;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import talkie.controls.ajax.LocationControl;
import talkie.dao.ChatRoomListDao;
import talkie.vo.ChatRoomListVo;
@Service
public class ChatRoomListServiceImpl implements ChatRoomListService{
	static Logger log = Logger.getLogger(LocationControl.class);
	@Autowired
	ChatRoomListDao chatRoomListDao;
	
	@Override
    public void add(ChatRoomListVo chatRoomList) {
		try {
			chatRoomListDao.chatListinsert(chatRoomList);
			} catch (Throwable ex) {
				throw new RuntimeException(ex);
			}
	    
    }

	@Override
    public void remove(int logNo) {
	    // TODO Auto-generated method stub
	    
    }

	@Override
    public List<ChatRoomListVo> list(int userNo) {
		try{
			log.debug("채팅서비스실행5!:userNo:"+userNo);
	         return chatRoomListDao.getChatRoomList(userNo);
		
		} catch (Throwable ex) {
			throw new RuntimeException(ex);
		}
    }

}
