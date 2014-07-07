package talkie.vo;

public class ChattingRoomVo {
	
	int chatRoomNo;
	int totalNum;
	int currentNum;
	String locName;
	char isAuto;
	String member;
	
	
	@Override
    public String toString() {
	    return "ChattingRoomVo [chatRoomNo=" + chatRoomNo + ", totalNum="
	            + totalNum + ", locName=" + locName + ", isAuto=" + isAuto
	            + ", member=" + member + "]";
    }
	
	public int getChatRoomNo() {
		return chatRoomNo;
	}
	public ChattingRoomVo setChatRoomNo(int chatRoomNo) {
		this.chatRoomNo = chatRoomNo;
		return this;
	}
	public int getTotalNum() {
		return totalNum;
	}
	public ChattingRoomVo setTotalNum(int totalNum) {
		this.totalNum = totalNum;
		return this;
	}
	public String currentNum() {
		return locName;
	}
	public ChattingRoomVo currentNum(int currentNum) {
		this.currentNum = currentNum;
		return this;
	}
	public String getLocName() {
		return locName;
	}
	public ChattingRoomVo setLocName(String locName) {
		this.locName = locName;
		return this;
	}
	public char getIsAuto() {
		return isAuto;
	}
	public ChattingRoomVo setIsAuto(char isAuto) {
		this.isAuto = isAuto;
		return this;
	}
	public String getMember() {
		return member;
	}
	public ChattingRoomVo setMember(String member) {
		this.member = member;
		return this;
	}
	
	

}
