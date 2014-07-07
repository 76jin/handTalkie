package talkie.vo;

import java.io.Serializable;
import java.sql.Date;

public class LocationVo implements Serializable{
    private static final long serialVersionUID = 1L;
    
    int no;
    int logNo;
    String loctionTag;
    Date logTime;
    
    
	@Override
    public String toString() {
	    return "LocationVo [no=" + no + ", logNo=" + logNo + ", loctionTag="
	            + loctionTag + ", logTime=" + logTime + "]";
    }
	
	public int getNo() {
		return no;
	}
	public LocationVo setNo(int no) {
		this.no = no;
		return this;
	}
	public int getLogNo() {
		return logNo;
	}
	public LocationVo setLogNo(int logNo) {
		this.logNo = logNo;
		return this;
	}
	public String getLoctionTag() {
		return loctionTag;
	}
	public LocationVo setLoctionTag(String loctionTag) {
		this.loctionTag = loctionTag;
		return this;
	}
	public Date getLogTime() {
		return logTime;
	}
	public LocationVo setLogTime(Date logTime) {
		this.logTime = logTime;
		return this;
	}

    
    
}
