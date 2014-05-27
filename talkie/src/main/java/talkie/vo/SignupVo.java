package talkie.vo;

import java.io.Serializable;

public class SignupVo implements Serializable {
	private static final long serialVersionUID = 1L;

	String name;
	String email; 
	String password;
	int 	country;
	int		language;
	
	public String getName() {
		return name;
	}
	public SignupVo setName(String name) {
		this.name = name;
		return this;
	}
	public String getEmail() {
		return email;
	}
	public SignupVo setEmail(String email) {
		this.email = email;
		return this;
	}
	public String getPassword() {
		return password;
	}
	public SignupVo setPassword(String password) {
		this.password = password;
		return this;
	}
	public int getCountry() {
		return country;
	}
	public SignupVo setCountry(int country) {
		this.country = country;
		return this;
	}
	public int getLanguage() {
		return language;
	}
	public SignupVo setLanguage(int language) {
		this.language = language;
		return this;
	}
	
	
	
}
