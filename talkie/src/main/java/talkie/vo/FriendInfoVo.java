package talkie.vo;

import java.io.Serializable;

public class FriendInfoVo implements Serializable{
  private static final long serialVersionUID = 1L;
	int userNo;
	int friendNo;
	char isBlock;
	public int getUserNo() {
		return userNo;
	}
	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}
	public int getFriendNo() {
		return friendNo;
	}
	public void setFriendNo(int friendNo) {
		this.friendNo = friendNo;
	}
	public char getIsBlock() {
		return isBlock;
	}
	public void setIsBlock(char isBlock) {
		this.isBlock = isBlock;
	}
	@Override
  public String toString() {
	  return "FriendInfoVo [userNo=" + userNo + ", friendNo=" + friendNo
	      + ", isBlock=" + isBlock + "]";
  }
	
	

}
