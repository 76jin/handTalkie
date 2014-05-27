package talkie.vo;

import java.io.Serializable;

public class UserInfoVo implements Serializable {
	private static final long serialVersionUID = 1L;
	static final int MAX_LANGUAGE_NO = 3;
	
	int 		no;
	String 	name;
	String 	email;
	int			nation;
	int 		languageNo;

	public int getLanguageNo() {
		return languageNo;
	}

	public UserInfoVo setLanguageNo(int languageNo) {
		this.languageNo = languageNo;
		return this;
	}

	public int getNo() {
		return no;
	}

	public UserInfoVo setNo(int no) {
		this.no = no;
		return this;
	}

	public String getName() {
		return name;
	}

	public UserInfoVo setName(String name) {
		this.name = name;
		return this;
	}

	public String getEmail() {
		return email;
	}

	public UserInfoVo setEmail(String email) {
		this.email = email;
		return this;
	}

	public int getNation() {
		return nation;
	}

	public UserInfoVo setNation(int nation) {
		this.nation = nation;
		return this;
	}
	
}
