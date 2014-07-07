package talkie.vo;

import java.io.Serializable;

public class TalkieUserVo implements Serializable {
	private static final long serialVersionUID = 1L;
	
	int 			no;
	String 	name;
	String 	email;
	String 	password;
	int			age;
	int			nation;
	char		gender;
	char		isDeclare;
	String		grade;
	char		isEmail;
	String		favTag;
	String		phoPath;
	String 	profileTitle;
	String 	profileDesc;
	int   recommend;
	
	@Override
    public String toString() {
	    return "TalkieUserVo [no=" + no + ", name=" + name + ", email=" + email
	            + ", password=" + password + ", age=" + age + ", nation="
	            + nation + ", gender=" + gender + ", isDeclare=" + isDeclare
	            + ", grade=" + grade + ", isEmail=" + isEmail + ", favTag="
	            + favTag + ", phoPath=" + phoPath + ", profileTitle="
	            + profileTitle + ", profileDesc=" + profileDesc
	            + ", recommend=" + recommend + "]";
    }
	public int getNo() {
		return no;
	}
	public TalkieUserVo setNo(int no) {
		this.no = no;
		return this;
	}
	public String getName() {
		return name;
	}
	public TalkieUserVo setName(String name) {
		this.name = name;
		return this;
	}
	public String getEmail() {
		return email;
	}
	public TalkieUserVo setEmail(String email) {
		this.email = email;
		return this;
	}
	public String getPassword() {
		return password;
	}
	public TalkieUserVo setPassword(String password) {
		this.password = password;
		return this;
	}
	public int getAge() {
		return age;
	}
	public TalkieUserVo setAge(int age) {
		this.age = age;
		return this;
	}
	public int getNation() {
		return nation;
	}
	public TalkieUserVo setNation(int nation) {
		this.nation = nation;
		return this;
	}
	public char getGender() {
		return gender;
	}
	public TalkieUserVo setGender(char gender) {
		this.gender = gender;
		return this;
	}
	public char getIsDeclare() {
		return isDeclare;
	}
	public TalkieUserVo setIsDeclare(char isDeclare) {
		this.isDeclare = isDeclare;
		return this;
	}
	public String getGrade() {
		return grade;
	}
	public TalkieUserVo setGrade(String grade) {
		this.grade = grade;
		return this;
	}
	public char getIsEmail() {
		return isEmail;
	}
	public TalkieUserVo setIsEmail(char isEmail) {
		this.isEmail = isEmail;
		return this;
	}
	public String getFavTag() {
		return favTag;
	}
	public TalkieUserVo setFavTag(String favTag) {
		this.favTag = favTag;
		return this;
	}
	public String getPhoPath() {
		return phoPath;
	}
	public TalkieUserVo setPhoPath(String phoPath) {
		this.phoPath = phoPath;
		return this;
	}
	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getProfileTitle() {
		return profileTitle;
	}

	public TalkieUserVo setProfileTitle(String profileTitle) {
		this.profileTitle = profileTitle;
		return this;
	}

	public String getProfileDesc() {
		return profileDesc;
	}

	public TalkieUserVo setProfileDesc(String profileDesc) {
		this.profileDesc = profileDesc;
		return this;
	}
	
	public int getRecommend() {
		return recommend;
	}

	public TalkieUserVo setRecommend(int recommend) {
		this.recommend = recommend;
		return this;
	}
	
}
