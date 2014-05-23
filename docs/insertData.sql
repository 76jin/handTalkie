-- Insert SE_AGE --------------------------------------------------
INSERT INTO `talkiedb`.`SE_AGE` (`AGENO`,`AGETYPE`) VALUES (1,0);
INSERT INTO `talkiedb`.`SE_AGE` (`AGENO`,`AGETYPE`) VALUES (2,1);
INSERT INTO `talkiedb`.`SE_AGE` (`AGENO`,`AGETYPE`) VALUES (3,2);
INSERT INTO `talkiedb`.`SE_AGE` (`AGENO`,`AGETYPE`) VALUES (4,3);
INSERT INTO `talkiedb`.`SE_AGE` (`AGENO`,`AGETYPE`) VALUES (5,4);
INSERT INTO `talkiedb`.`SE_AGE` (`AGENO`,`AGETYPE`) VALUES (6,5);
INSERT INTO `talkiedb`.`SE_AGE` (`AGENO`,`AGETYPE`) VALUES (7,6);

select * from SE_AGE;
-- --------------------------------------------------
-- Insert SE_LAN --------------------------------------------------
INSERT INTO `talkiedb`.`SE_LAN` (`LANNO`,`LANTYPE`) VALUES (1,'ko');
INSERT INTO `talkiedb`.`SE_LAN` (`LANNO`,`LANTYPE`) VALUES (2,'en');

select * from SE_LAN;

-- --------------------------------------------------
-- Insert SE_NAT --------------------------------------------------
INSERT INTO `talkiedb`.`SE_NAT` (`NATINO`,`NATITYPE`) VALUES (1,'kr');
INSERT INTO `talkiedb`.`SE_NAT` (`NATINO`,`NATITYPE`) VALUES (2,'us');

select * from SE_NAT;

-- --------------------------------------------------
-- Insert SE_USERS --------------------------------------------------
insert into SE_USERS(UNO,EMAIL,PASSWORD,NAME,AGENO,NATINO,GENDER,ISDECLARE,GRADE,ISEMAIL,FAVTAG)
  values(1,'hong@test.com','1111','홍길동',2,1,'m','y','0','y','kpop');
insert into SE_USERS(UNO,EMAIL,PASSWORD,NAME,AGENO,NATINO,GENDER,ISDECLARE,GRADE,ISEMAIL,FAVTAG)
  values(2,'lim@test.com','2222','임꺽정',3,1,'m','n','1','n','kpop');
insert into SE_USERS(UNO,EMAIL,PASSWORD,NAME,AGENO,NATINO,GENDER,ISDECLARE,GRADE,ISEMAIL,FAVTAG)
  values(3,'jang@test.com','3333','장보고',3,1,'m','n','1','n','kpop');
insert into SE_USERS(UNO,EMAIL,PASSWORD,NAME,AGENO,NATINO,GENDER,ISDECLARE,GRADE,ISEMAIL,FAVTAG)
  values(4,'lee@test.com','4444','이순신',2,1,'m','n','1','n','shopping');
insert into SE_USERS(UNO,EMAIL,PASSWORD,NAME,AGENO,NATINO,GENDER,ISDECLARE,GRADE,ISEMAIL,FAVTAG)
  values(5,'kang@test.com','5555','강감찬',3,1,'m','n','1','n','kpop');
insert into SE_USERS(UNO,EMAIL,PASSWORD,NAME,AGENO,NATINO,GENDER,ISDECLARE,GRADE,ISEMAIL,FAVTAG)
  values(6,'tom@test.com','6666','tom',3,2,'m','n','1','n','kpop');

select * from SE_USERS;
-- --------------------------------------------------
-- Insert SE_LOCLOG (logtime: 2006-01-10 13:56:16 --------------
INSERT INTO `talkiedb`.`SE_LOCLOG` (`LOCLOGNO`,`UNO`,`LOCTAG`,`LOGTIME`)
VALUES (1,1,'kangnam','2014-05-22 11:56:16');
INSERT INTO `talkiedb`.`SE_LOCLOG` (`LOCLOGNO`,`UNO`,`LOCTAG`,`LOGTIME`)
VALUES (2,1,'kangnam','2014-05-23 10:15:48');
INSERT INTO `talkiedb`.`SE_LOCLOG` (`LOCLOGNO`,`UNO`,`LOCTAG`,`LOGTIME`)
VALUES (3,2,'kangnam','2014-05-23 14:22:14');
INSERT INTO `talkiedb`.`SE_LOCLOG` (`LOCLOGNO`,`UNO`,`LOCTAG`,`LOGTIME`)
VALUES (4,3,'kangnam','2014-05-23 15:31:55');

select * from SE_LOCLOG;
-- --------------------------------------------------
-- Insert SE_FRIENDINFO --------------------------------------------------
INSERT INTO `talkiedb`.`SE_FRIENDINFO` (`UNO`,`UNO2`,`ISBLOCK`) VALUES (1,2,'n');
INSERT INTO `talkiedb`.`SE_FRIENDINFO` (`UNO`,`UNO2`,`ISBLOCK`) VALUES (2,1,'n');
INSERT INTO `talkiedb`.`SE_FRIENDINFO` (`UNO`,`UNO2`,`ISBLOCK`) VALUES (1,3,'n');
INSERT INTO `talkiedb`.`SE_FRIENDINFO` (`UNO`,`UNO2`,`ISBLOCK`) VALUES (3,1,'n');
INSERT INTO `talkiedb`.`SE_FRIENDINFO` (`UNO`,`UNO2`,`ISBLOCK`) VALUES (1,4,'n');

select * from SE_FRIENDINFO;
-- --------------------------------------------------
-- Insert SE_CHATROOM --------------------------------------------------
INSERT INTO `talkiedb`.`SE_CHATROOM`
(`CHATROOMNO`,`UNO`,`TOTALNUM`,`LOCNAME`,`ISAUTO`,`ISUPDATE`,`CHATDESC`)
VALUES (1,1,30,'kangnam','y','n','hello good morning.');

INSERT INTO `talkiedb`.`SE_CHATROOM`
(`CHATROOMNO`,`UNO`,`TOTALNUM`,`LOCNAME`,`ISAUTO`,`ISUPDATE`,`CHATDESC`)
VALUES (2,6,30,'kangnam','y','n','hi im tom');

select * from SE_CHATROOM;
-- --------------------------------------------------
-- Insert SE_AGE --------------------------------------------------
INSERT INTO `talkiedb`.`SE_LAN` (`LANNO`,`LANTYPE`) VALUES (2,'en');

select * from SE_AGE;
-- --------------------------------------------------
-- Insert SE_AGE --------------------------------------------------
INSERT INTO `talkiedb`.`SE_LAN` (`LANNO`,`LANTYPE`) VALUES (2,'en');

select * from SE_AGE;
-- --------------------------------------------------
-- Insert SE_AGE --------------------------------------------------
INSERT INTO `talkiedb`.`SE_LAN` (`LANNO`,`LANTYPE`) VALUES (2,'en');

select * from SE_AGE;
-- --------------------------------------------------
-- Insert SE_AGE --------------------------------------------------
INSERT INTO `talkiedb`.`SE_LAN` (`LANNO`,`LANTYPE`) VALUES (2,'en');

select * from SE_AGE;
-- --------------------------------------------------
-- Insert SE_AGE --------------------------------------------------
INSERT INTO `talkiedb`.`SE_LAN` (`LANNO`,`LANTYPE`) VALUES (2,'en');

select * from SE_AGE;
-- --------------------------------------------------
