package talkie.services;

import java.util.List;

import talkie.vo.LocationVo;

public interface LocationService {
	void add(LocationVo location);
//	LocationVo list(int no);
	void remove(int logNo);
	List<LocationVo> list(int no);
}