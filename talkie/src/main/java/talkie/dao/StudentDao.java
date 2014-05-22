package talkie.dao;

import java.util.Map;

import talkie.vo.StudentVo;

public interface StudentDao {
	void insert(StudentVo student);
	StudentVo getLoginUser(Map<String,String> params);
}
