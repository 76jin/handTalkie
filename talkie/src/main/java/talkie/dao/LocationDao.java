package talkie.dao;

import java.util.HashMap;
import java.util.List;

import talkie.vo.LocationVo;

public interface LocationDao {
	void insert(LocationVo location) throws Throwable;
//	LocationVo getUserLogllist(int no) throws Throwable;
	void logNodelete(int logNo) throws Throwable;
	List<LocationVo> getUserLogllist(HashMap<String, Integer> params);
}
