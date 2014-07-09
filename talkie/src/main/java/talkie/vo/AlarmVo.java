package talkie.vo;

import java.util.Date;

public class AlarmVo {

	int no;
	int frNo;
	int alarmNo;
	String alarmMsg;
	Date dateTime;
	
	@Override
    public String toString() {
	    return "AlarmVo [no=" + no + ", frNo=" + frNo + ", alarmNo=" + alarmNo
	            + ", alarmMsg=" + alarmMsg + ", dateTime=" + dateTime + "]";
    }

	public int getNo() {
		return no;
	}

	public AlarmVo setNo(int no) {
		this.no = no;
		return this;
	}

	public int getFrNo() {
		return frNo;
	}

	public AlarmVo setFrNo(int frNo) {
		this.frNo = frNo;
		return this;
	}

	public int getAlarmNo() {
		return alarmNo;
	}

	public AlarmVo setAlarmNo(int alarmNo) {
		this.alarmNo = alarmNo;
		return this;
	}

	public String getAlarmMsg() {
		return alarmMsg;
	}

	public AlarmVo setAlarmMsg(String alarmMsg) {
		this.alarmMsg = alarmMsg;
		return this;
	}
	
	public Date getDateTime() {
		return dateTime;
	}

	public AlarmVo setDateTime(Date dateTime) {
		this.dateTime = dateTime;
		return this;
	}
	
	
}
