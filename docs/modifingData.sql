select UNO,NAME,EMAIL,AGENO,NATINO,GENDER,FAVTAG,PHOPATH
    from SE_USERS
    where EMAIL="hong@test.com" and PASSWORD="1111";

select FAVTAG, PHOPATH, PROFILETITLE, PROFILEDESC
    from SE_USERS
    where EMAIL="hong@test.com";


select PHOPATH from SE_USERS where UNO='4' and PHOPATH is null;
update SE_USERS set PHOPATH='img/profile/profile_1.jpg' where UNO='1';


select UNO, if(PHOPATH='null', PHOPATH, PHOPATH ) FROM SE_USERS WHERE UNO='4';

select UNO from SE_USERS where EMAIL="lim@test.com";

select * from SE_USERS;


-- ====================================================================================
-- 문자 채팅방
INSERT INTO `talkiedb`.`SE_CHATTINGROOM`
(`CHATROOMNO`,`TOTALNUM`,`CURRENTNUM`,`LOCNAME`,`ISAUTO`,`MEMBER`)
VALUES (1,30,2,"","N","1,2");

SELECT * FROM SE_CHATTINGROOM;

-- ====================================================================================
-- 문자채팅로그
INSERT INTO `talkiedb`.`SE_CHATLOG`
(`LOGNO`,`CHATROOMNO`,`SENDER`,`CHATTEXT`,`SENDTIME`)
VALUES (1,1,1,"안녕~ 반가워~!!",now());

INSERT INTO `talkiedb`.`SE_CHATLOG`
(`LOGNO`,`CHATROOMNO`,`SENDER`,`CHATTEXT`,`SENDTIME`)
VALUES (2,1,2,"Nice to me too!",now());

INSERT INTO `talkiedb`.`SE_CHATLOG`
(`LOGNO`,`CHATROOMNO`,`SENDER`,`CHATTEXT`,`SENDTIME`)
VALUES (3,1,2,"What's your name?",now());

INSERT INTO `talkiedb`.`SE_CHATLOG`
(`LOGNO`,`CHATROOMNO`,`SENDER`,`CHATTEXT`,`SENDTIME`)
VALUES (4,1,1,"My name is hong~!",now());

select * FROM SE_CHATLOG;

-- ====================================================================================

