-- 사용자
CREATE TABLE `SE_USERS` (
	`UNO`       INTEGER      NOT NULL COMMENT '사용자번호', -- 사용자번호
	`EMAIL`     VARCHAR(40)  NOT NULL COMMENT '이메일', -- 이메일
	`PASSWORD`  VARCHAR(20)  NOT NULL COMMENT '암호', -- 암호
	`NAME`      VARCHAR(50)  NOT NULL COMMENT '이름', -- 이름
	`AGENO`     INTEGER      NOT NULL COMMENT '연령대 관리 번호', -- 연령대 관리 번호
	`NATINO`    INTEGER      NOT NULL COMMENT '국가 목록 번호', -- 국가 목록 번호
	`GENDER`    CHAR(1)      NOT NULL COMMENT '성별', -- 성별
	`ISDECLARE` CHAR(1)      NULL     COMMENT '신고당했는지 여부', -- 신고당했는지 여부
	`GRADE`     VARCHAR(10)  NOT NULL COMMENT '등급', -- 등급
	`ISEMAIL`   CHAR(1)      NULL     COMMENT '이메일 검증 여부', -- 이메일 검증 여부
	`FAVTAG`    VARCHAR(50)  NULL     COMMENT '좋아하는 태그', -- 좋아하는 태그
	`PHOPATH`   VARCHAR(255) NULL     COMMENT '사진경로' -- 사진경로
)
COMMENT '사용자';

-- 사용자
ALTER TABLE `SE_USERS`
	ADD CONSTRAINT `PK_SE_USERS` -- 사용자 기본키
		PRIMARY KEY (
			`UNO` -- 사용자번호
		);

-- 사용자 유니크 인덱스
CREATE UNIQUE INDEX `UIX_SE_USERS`
	ON `SE_USERS` ( -- 사용자
		`EMAIL` ASC -- 이메일
	);

ALTER TABLE `SE_USERS`
	MODIFY COLUMN `UNO` INTEGER NOT NULL AUTO_INCREMENT COMMENT '사용자번호';

-- 친구정보
CREATE TABLE `SE_FRIENDINFO` (
	`UNO`     INTEGER NOT NULL COMMENT '사용자번호', -- 사용자번호
	`UNO2`    INTEGER NOT NULL COMMENT '친구번호', -- 친구번호
	`ISBLOCK` CHAR(1) NULL     COMMENT '차단여부' -- 차단여부
)
COMMENT '친구정보';

-- 친구정보
ALTER TABLE `SE_FRIENDINFO`
	ADD CONSTRAINT `PK_SE_FRIENDINFO` -- 친구정보 기본키
		PRIMARY KEY (
			`UNO`,  -- 사용자번호
			`UNO2`  -- 친구번호
		);

-- 문자채팅방
CREATE TABLE `SE_CHATROOM` (
	`CHATROOMNO` INTEGER     NOT NULL COMMENT '채팅방 개설 번호', -- 채팅방 개설 번호
	`UNO`        INTEGER     NOT NULL COMMENT '개설자번호', -- 개설자번호
	`TOTALNUM`   INTEGER     NOT NULL COMMENT '총 채팅 가능 인원(30명)', -- 총 채팅 가능 인원(30명)
	`LOCNAME`    VARCHAR(50) NOT NULL COMMENT '지역이름', -- 지역이름
	`ISAUTO`     CHAR(1)     NOT NULL COMMENT '사용자 반경 자동생성 방인지 여부', -- 사용자 반경 자동생성 방인지 여부
	`ISUPDATE`   CHAR(1)     NOT NULL COMMENT '채팅 내용 업데이트 여부', -- 채팅 내용 업데이트 여부
	`CHATDESC`   TEXT        NULL     COMMENT '채팅 내용' -- 채팅 내용
)
COMMENT '문자채팅방';

-- 문자채팅방
ALTER TABLE `SE_CHATROOM`
	ADD CONSTRAINT `PK_SE_CHATROOM` -- 문자채팅방 기본키
		PRIMARY KEY (
			`CHATROOMNO` -- 채팅방 개설 번호
		);

ALTER TABLE `SE_CHATROOM`
	MODIFY COLUMN `CHATROOMNO` INTEGER NOT NULL AUTO_INCREMENT COMMENT '채팅방 개설 번호';

-- 음성사서함
CREATE TABLE `SE_VOICMSG` (
	`VOICMSGNO` INTEGER   NOT NULL COMMENT '음성 메시지 번호', -- 음성 메시지 번호
	`UNO`       INTEGER   NOT NULL COMMENT '보내는사람번호', -- 보내는사람번호
	`UNO2`      INTEGER   NOT NULL COMMENT '받는사람번호', -- 받는사람번호
	`SENDTIME`  DATETIME  NOT NULL COMMENT '발신한 시간', -- 발신한 시간
	`ISRECV`    CHAR(1)   NOT NULL COMMENT '수신 확인 여부(중요)', -- 수신 확인 여부(중요)
	`VOICEFILEPATH` VARCHAR(255) NOT NULL COMMENT '음성 메시지 파일' -- 음성 메시지 파일
)
COMMENT '음성사서함';

-- 음성사서함
ALTER TABLE `SE_VOICMSG`
	ADD CONSTRAINT `PK_SE_VOICMSG` -- 음성사서함 기본키
		PRIMARY KEY (
			`VOICMSGNO` -- 음성 메시지 번호
		);

-- 음성사서함 유니크 인덱스
CREATE UNIQUE INDEX `UIX_SE_VOICMSG`
	ON `SE_VOICMSG` ( -- 음성사서함
		`VOICEFILEPATH` ASC -- 음성 메시지 파일
	);

ALTER TABLE `SE_VOICMSG`
	MODIFY COLUMN `VOICMSGNO` INTEGER NOT NULL AUTO_INCREMENT COMMENT '음성 메시지 번호';

-- 불량사용자신고
CREATE TABLE `SE_DECCREAT` (
	`DECCREATNO` INTEGER  NOT NULL COMMENT '신고하기 개설 번호', -- 신고하기 개설 번호
	`UNO`        INTEGER  NOT NULL COMMENT '신고자번호', -- 신고자번호
	`UNO2`       INTEGER  NOT NULL COMMENT '피신고자번호', -- 피신고자번호
	`DECLISTNO`  INTEGER  NOT NULL COMMENT '신고 종류 목록 번호', -- 신고 종류 목록 번호
	`DECDESC`    TEXT     NOT NULL COMMENT '신고 내용(신고 사유)', -- 신고 내용(신고 사유)
	`DECTIME`    DATETIME NULL     COMMENT '신고 시간' -- 신고 시간
)
COMMENT '불량사용자신고';

-- 불량사용자신고
ALTER TABLE `SE_DECCREAT`
	ADD CONSTRAINT `PK_SE_DECCREAT` -- 불량사용자신고 기본키
		PRIMARY KEY (
			`DECCREATNO` -- 신고하기 개설 번호
		);

ALTER TABLE `SE_DECCREAT`
	MODIFY COLUMN `DECCREATNO` INTEGER NOT NULL AUTO_INCREMENT COMMENT '신고하기 개설 번호';

-- 신고유형
CREATE TABLE `SE_DEC` (
	`DECLISTNO` INTEGER     NOT NULL COMMENT '신고 종류 목록 번호', -- 신고 종류 목록 번호
	`DECTYPE`   VARCHAR(50) NOT NULL COMMENT '신고 종류' -- 신고 종류
)
COMMENT '신고유형';

-- 신고유형
ALTER TABLE `SE_DEC`
	ADD CONSTRAINT `PK_SE_DEC` -- 신고유형 기본키
		PRIMARY KEY (
			`DECLISTNO` -- 신고 종류 목록 번호
		);

ALTER TABLE `SE_DEC`
	MODIFY COLUMN `DECLISTNO` INTEGER NOT NULL AUTO_INCREMENT COMMENT '신고 종류 목록 번호';

-- 국가
CREATE TABLE `SE_NAT` (
	`NATINO`   INTEGER     NOT NULL COMMENT '국가 목록 번호', -- 국가 목록 번호
	`NATITYPE` VARCHAR(50) NOT NULL COMMENT '국가 종류' -- 국가 종류
)
COMMENT '국가';

-- 국가
ALTER TABLE `SE_NAT`
	ADD CONSTRAINT `PK_SE_NAT` -- 국가 기본키
		PRIMARY KEY (
			`NATINO` -- 국가 목록 번호
		);

ALTER TABLE `SE_NAT`
	MODIFY COLUMN `NATINO` INTEGER NOT NULL AUTO_INCREMENT COMMENT '국가 목록 번호';

-- 언어
CREATE TABLE `SE_LAN` (
	`LANNO`   INTEGER     NOT NULL COMMENT '언어 관리 번호', -- 언어 관리 번호
	`LANTYPE` VARCHAR(10) NOT NULL COMMENT '언어 종류' -- 언어 종류
)
COMMENT '언어';

-- 언어
ALTER TABLE `SE_LAN`
	ADD CONSTRAINT `PK_SE_LAN` -- 언어 기본키
		PRIMARY KEY (
			`LANNO` -- 언어 관리 번호
		);

ALTER TABLE `SE_LAN`
	MODIFY COLUMN `LANNO` INTEGER NOT NULL AUTO_INCREMENT COMMENT '언어 관리 번호';

-- 연령대
CREATE TABLE `SE_AGE` (
	`AGENO`   INTEGER     NOT NULL COMMENT '연령대 관리 번호', -- 연령대 관리 번호
	`AGETYPE` VARCHAR(10) NOT NULL COMMENT '연령대 종류' -- 연령대 종류
)
COMMENT '연령대';

-- 연령대
ALTER TABLE `SE_AGE`
	ADD CONSTRAINT `PK_SE_AGE` -- 연령대 기본키
		PRIMARY KEY (
			`AGENO` -- 연령대 관리 번호
		);

ALTER TABLE `SE_AGE`
	MODIFY COLUMN `AGENO` INTEGER NOT NULL AUTO_INCREMENT COMMENT '연령대 관리 번호';

-- 사용가능언어
CREATE TABLE `SE_ADDLANG` (
	`ADDLANNO` INTEGER NOT NULL COMMENT '추가언어 관리 번호', -- 추가언어 관리 번호
	`LANNO`    INTEGER NOT NULL COMMENT '언어 관리 번호', -- 언어 관리 번호
	`UNO`      INTEGER NOT NULL COMMENT '사용자번호' -- 사용자번호
)
COMMENT '사용가능언어';

-- 사용가능언어
ALTER TABLE `SE_ADDLANG`
	ADD CONSTRAINT `PK_SE_ADDLANG` -- 사용가능언어 기본키
		PRIMARY KEY (
			`ADDLANNO` -- 추가언어 관리 번호
		);

ALTER TABLE `SE_ADDLANG`
	MODIFY COLUMN `ADDLANNO` INTEGER NOT NULL AUTO_INCREMENT COMMENT '추가언어 관리 번호';

-- 위치로그
CREATE TABLE `SE_LOCLOG` (
	`LOCLOGNO` INTEGER      NOT NULL COMMENT '위치로그번호', -- 위치로그번호
	`UNO`      INTEGER      NOT NULL COMMENT '사용자번호', -- 사용자번호
	`LOCTAG`   VARCHAR(255) NULL     COMMENT '위치태그', -- 위치태그
	`LOGTIME`  DATETIME     NULL     COMMENT '기록날짜' -- 기록날짜
)
COMMENT '위치로그';

-- 위치로그
ALTER TABLE `SE_LOCLOG`
	ADD CONSTRAINT `PK_SE_LOCLOG` -- 위치로그 기본키
		PRIMARY KEY (
			`LOCLOGNO` -- 위치로그번호
		);

ALTER TABLE `SE_LOCLOG`
	MODIFY COLUMN `LOCLOGNO` INTEGER NOT NULL AUTO_INCREMENT COMMENT '위치로그번호';

-- 사용자
ALTER TABLE `SE_USERS`
	ADD CONSTRAINT `FK_SE_NAT_TO_SE_USERS` -- 국가 -> 사용자
		FOREIGN KEY (
			`NATINO` -- 국가 목록 번호
		)
		REFERENCES `SE_NAT` ( -- 국가
			`NATINO` -- 국가 목록 번호
		);

-- 사용자
ALTER TABLE `SE_USERS`
	ADD CONSTRAINT `FK_SE_AGE_TO_SE_USERS` -- 연령대 -> 사용자
		FOREIGN KEY (
			`AGENO` -- 연령대 관리 번호
		)
		REFERENCES `SE_AGE` ( -- 연령대
			`AGENO` -- 연령대 관리 번호
		);

-- 친구정보
ALTER TABLE `SE_FRIENDINFO`
	ADD CONSTRAINT `FK_SE_USERS_TO_SE_FRIENDINFO` -- 사용자 -> 친구정보
		FOREIGN KEY (
			`UNO` -- 사용자번호
		)
		REFERENCES `SE_USERS` ( -- 사용자
			`UNO` -- 사용자번호
		);

-- 친구정보
ALTER TABLE `SE_FRIENDINFO`
	ADD CONSTRAINT `FK_SE_USERS_TO_SE_FRIENDINFO2` -- 사용자 -> 친구정보2
		FOREIGN KEY (
			`UNO2` -- 친구번호
		)
		REFERENCES `SE_USERS` ( -- 사용자
			`UNO` -- 사용자번호
		);

-- 문자채팅방
ALTER TABLE `SE_CHATROOM`
	ADD CONSTRAINT `FK_SE_USERS_TO_SE_CHATROOM` -- 사용자 -> 문자채팅방
		FOREIGN KEY (
			`UNO` -- 개설자번호
		)
		REFERENCES `SE_USERS` ( -- 사용자
			`UNO` -- 사용자번호
		);

-- 음성사서함
ALTER TABLE `SE_VOICMSG`
	ADD CONSTRAINT `FK_SE_USERS_TO_SE_VOICMSG` -- 사용자 -> 음성사서함
		FOREIGN KEY (
			`UNO` -- 보내는사람번호
		)
		REFERENCES `SE_USERS` ( -- 사용자
			`UNO` -- 사용자번호
		);

-- 음성사서함
ALTER TABLE `SE_VOICMSG`
	ADD CONSTRAINT `FK_SE_USERS_TO_SE_VOICMSG2` -- 사용자 -> 음성사서함2
		FOREIGN KEY (
			`UNO2` -- 받는사람번호
		)
		REFERENCES `SE_USERS` ( -- 사용자
			`UNO` -- 사용자번호
		);

-- 불량사용자신고
ALTER TABLE `SE_DECCREAT`
	ADD CONSTRAINT `FK_SE_USERS_TO_SE_DECCREAT` -- 사용자 -> 불량사용자신고
		FOREIGN KEY (
			`UNO` -- 신고자번호
		)
		REFERENCES `SE_USERS` ( -- 사용자
			`UNO` -- 사용자번호
		);

-- 불량사용자신고
ALTER TABLE `SE_DECCREAT`
	ADD CONSTRAINT `FK_SE_DEC_TO_SE_DECCREAT` -- 신고유형 -> 불량사용자신고
		FOREIGN KEY (
			`DECLISTNO` -- 신고 종류 목록 번호
		)
		REFERENCES `SE_DEC` ( -- 신고유형
			`DECLISTNO` -- 신고 종류 목록 번호
		);

-- 불량사용자신고
ALTER TABLE `SE_DECCREAT`
	ADD CONSTRAINT `FK_SE_USERS_TO_SE_DECCREAT2` -- 사용자 -> 불량사용자신고2
		FOREIGN KEY (
			`UNO2` -- 피신고자번호
		)
		REFERENCES `SE_USERS` ( -- 사용자
			`UNO` -- 사용자번호
		);

-- 사용가능언어
ALTER TABLE `SE_ADDLANG`
	ADD CONSTRAINT `FK_SE_LAN_TO_SE_ADDLANG` -- 언어 -> 사용가능언어
		FOREIGN KEY (
			`LANNO` -- 언어 관리 번호
		)
		REFERENCES `SE_LAN` ( -- 언어
			`LANNO` -- 언어 관리 번호
		);

-- 사용가능언어
ALTER TABLE `SE_ADDLANG`
	ADD CONSTRAINT `FK_SE_USERS_TO_SE_ADDLANG` -- 사용자 -> 사용가능언어
		FOREIGN KEY (
			`UNO` -- 사용자번호
		)
		REFERENCES `SE_USERS` ( -- 사용자
			`UNO` -- 사용자번호
		);

-- 위치로그
ALTER TABLE `SE_LOCLOG`
	ADD CONSTRAINT `FK_SE_USERS_TO_SE_LOCLOG` -- 사용자 -> 위치로그
		FOREIGN KEY (
			`UNO` -- 사용자번호
		)
		REFERENCES `SE_USERS` ( -- 사용자
			`UNO` -- 사용자번호
		);
