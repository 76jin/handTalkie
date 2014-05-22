-- �����
CREATE TABLE `SE_USERS` (
	`UNO`       INTEGER      NOT NULL COMMENT '����ڹ�ȣ', -- ����ڹ�ȣ
	`EMAIL`     VARCHAR(40)  NOT NULL COMMENT '�̸���', -- �̸���
	`PASSWORD`  VARCHAR(20)  NOT NULL COMMENT '��ȣ', -- ��ȣ
	`NAME`      VARCHAR(50)  NOT NULL COMMENT '�̸�', -- �̸�
	`AGENO`     INTEGER      NOT NULL COMMENT '���ɴ� ���� ��ȣ', -- ���ɴ� ���� ��ȣ
	`NATINO`    INTEGER      NOT NULL COMMENT '���� ��� ��ȣ', -- ���� ��� ��ȣ
	`GENDER`    CHAR(1)      NOT NULL COMMENT '����', -- ����
	`ISDECLARE` CHAR(1)      NULL     COMMENT '�Ű���ߴ��� ����', -- �Ű���ߴ��� ����
	`GRADE`     VARCHAR(10)  NOT NULL COMMENT '���', -- ���
	`ISEMAIL`   CHAR(1)      NULL     COMMENT '�̸��� ���� ����', -- �̸��� ���� ����
	`FAVTAG`    VARCHAR(50)  NULL     COMMENT '�����ϴ� �±�', -- �����ϴ� �±�
	`PHOPATH`   VARCHAR(255) NULL     COMMENT '�������' -- �������
)
COMMENT '�����';

-- �����
ALTER TABLE `SE_USERS`
	ADD CONSTRAINT `PK_SE_USERS` -- ����� �⺻Ű
		PRIMARY KEY (
			`UNO` -- ����ڹ�ȣ
		);

-- ����� ����ũ �ε���
CREATE UNIQUE INDEX `UIX_SE_USERS`
	ON `SE_USERS` ( -- �����
		`EMAIL` ASC -- �̸���
	);

ALTER TABLE `SE_USERS`
	MODIFY COLUMN `UNO` INTEGER NOT NULL AUTO_INCREMENT COMMENT '����ڹ�ȣ';

-- ģ������
CREATE TABLE `SE_FRIENDINFO` (
	`UNO`     INTEGER NOT NULL COMMENT '����ڹ�ȣ', -- ����ڹ�ȣ
	`UNO2`    INTEGER NOT NULL COMMENT 'ģ����ȣ', -- ģ����ȣ
	`ISBLOCK` CHAR(1) NULL     COMMENT '���ܿ���' -- ���ܿ���
)
COMMENT 'ģ������';

-- ģ������
ALTER TABLE `SE_FRIENDINFO`
	ADD CONSTRAINT `PK_SE_FRIENDINFO` -- ģ������ �⺻Ű
		PRIMARY KEY (
			`UNO`,  -- ����ڹ�ȣ
			`UNO2`  -- ģ����ȣ
		);

-- ����ä�ù�
CREATE TABLE `SE_CHATROOM` (
	`CHATROOMNO` INTEGER     NOT NULL COMMENT 'ä�ù� ���� ��ȣ', -- ä�ù� ���� ��ȣ
	`UNO`        INTEGER     NOT NULL COMMENT '�����ڹ�ȣ', -- �����ڹ�ȣ
	`TOTALNUM`   INTEGER     NOT NULL COMMENT '�� ä�� ���� �ο�(30��)', -- �� ä�� ���� �ο�(30��)
	`LOCNAME`    VARCHAR(50) NOT NULL COMMENT '�����̸�', -- �����̸�
	`ISAUTO`     CHAR(1)     NOT NULL COMMENT '����� �ݰ� �ڵ����� ������ ����', -- ����� �ݰ� �ڵ����� ������ ����
	`ISUPDATE`   CHAR(1)     NOT NULL COMMENT 'ä�� ���� ������Ʈ ����', -- ä�� ���� ������Ʈ ����
	`CHATDESC`   TEXT        NULL     COMMENT 'ä�� ����' -- ä�� ����
)
COMMENT '����ä�ù�';

-- ����ä�ù�
ALTER TABLE `SE_CHATROOM`
	ADD CONSTRAINT `PK_SE_CHATROOM` -- ����ä�ù� �⺻Ű
		PRIMARY KEY (
			`CHATROOMNO` -- ä�ù� ���� ��ȣ
		);

ALTER TABLE `SE_CHATROOM`
	MODIFY COLUMN `CHATROOMNO` INTEGER NOT NULL AUTO_INCREMENT COMMENT 'ä�ù� ���� ��ȣ';

-- �����缭��
CREATE TABLE `SE_VOICMSG` (
	`VOICMSGNO` INTEGER   NOT NULL COMMENT '���� �޽��� ��ȣ', -- ���� �޽��� ��ȣ
	`UNO`       INTEGER   NOT NULL COMMENT '�����»����ȣ', -- �����»����ȣ
	`UNO2`      INTEGER   NOT NULL COMMENT '�޴»����ȣ', -- �޴»����ȣ
	`SENDTIME`  DATETIME  NOT NULL COMMENT '�߽��� �ð�', -- �߽��� �ð�
	`ISRECV`    CHAR(1)   NOT NULL COMMENT '���� Ȯ�� ����(�߿�)', -- ���� Ȯ�� ����(�߿�)
	`VOICEFILEPATH` VARCHAR(255) NOT NULL COMMENT '���� �޽��� ����' -- ���� �޽��� ����
)
COMMENT '�����缭��';

-- �����缭��
ALTER TABLE `SE_VOICMSG`
	ADD CONSTRAINT `PK_SE_VOICMSG` -- �����缭�� �⺻Ű
		PRIMARY KEY (
			`VOICMSGNO` -- ���� �޽��� ��ȣ
		);

-- �����缭�� ����ũ �ε���
CREATE UNIQUE INDEX `UIX_SE_VOICMSG`
	ON `SE_VOICMSG` ( -- �����缭��
		`VOICEFILEPATH` ASC -- ���� �޽��� ����
	);

ALTER TABLE `SE_VOICMSG`
	MODIFY COLUMN `VOICMSGNO` INTEGER NOT NULL AUTO_INCREMENT COMMENT '���� �޽��� ��ȣ';

-- �ҷ�����ڽŰ�
CREATE TABLE `SE_DECCREAT` (
	`DECCREATNO` INTEGER  NOT NULL COMMENT '�Ű��ϱ� ���� ��ȣ', -- �Ű��ϱ� ���� ��ȣ
	`UNO`        INTEGER  NOT NULL COMMENT '�Ű��ڹ�ȣ', -- �Ű��ڹ�ȣ
	`UNO2`       INTEGER  NOT NULL COMMENT '�ǽŰ��ڹ�ȣ', -- �ǽŰ��ڹ�ȣ
	`DECLISTNO`  INTEGER  NOT NULL COMMENT '�Ű� ���� ��� ��ȣ', -- �Ű� ���� ��� ��ȣ
	`DECDESC`    TEXT     NOT NULL COMMENT '�Ű� ����(�Ű� ����)', -- �Ű� ����(�Ű� ����)
	`DECTIME`    DATETIME NULL     COMMENT '�Ű� �ð�' -- �Ű� �ð�
)
COMMENT '�ҷ�����ڽŰ�';

-- �ҷ�����ڽŰ�
ALTER TABLE `SE_DECCREAT`
	ADD CONSTRAINT `PK_SE_DECCREAT` -- �ҷ�����ڽŰ� �⺻Ű
		PRIMARY KEY (
			`DECCREATNO` -- �Ű��ϱ� ���� ��ȣ
		);

ALTER TABLE `SE_DECCREAT`
	MODIFY COLUMN `DECCREATNO` INTEGER NOT NULL AUTO_INCREMENT COMMENT '�Ű��ϱ� ���� ��ȣ';

-- �Ű�����
CREATE TABLE `SE_DEC` (
	`DECLISTNO` INTEGER     NOT NULL COMMENT '�Ű� ���� ��� ��ȣ', -- �Ű� ���� ��� ��ȣ
	`DECTYPE`   VARCHAR(50) NOT NULL COMMENT '�Ű� ����' -- �Ű� ����
)
COMMENT '�Ű�����';

-- �Ű�����
ALTER TABLE `SE_DEC`
	ADD CONSTRAINT `PK_SE_DEC` -- �Ű����� �⺻Ű
		PRIMARY KEY (
			`DECLISTNO` -- �Ű� ���� ��� ��ȣ
		);

ALTER TABLE `SE_DEC`
	MODIFY COLUMN `DECLISTNO` INTEGER NOT NULL AUTO_INCREMENT COMMENT '�Ű� ���� ��� ��ȣ';

-- ����
CREATE TABLE `SE_NAT` (
	`NATINO`   INTEGER     NOT NULL COMMENT '���� ��� ��ȣ', -- ���� ��� ��ȣ
	`NATITYPE` VARCHAR(50) NOT NULL COMMENT '���� ����' -- ���� ����
)
COMMENT '����';

-- ����
ALTER TABLE `SE_NAT`
	ADD CONSTRAINT `PK_SE_NAT` -- ���� �⺻Ű
		PRIMARY KEY (
			`NATINO` -- ���� ��� ��ȣ
		);

ALTER TABLE `SE_NAT`
	MODIFY COLUMN `NATINO` INTEGER NOT NULL AUTO_INCREMENT COMMENT '���� ��� ��ȣ';

-- ���
CREATE TABLE `SE_LAN` (
	`LANNO`   INTEGER     NOT NULL COMMENT '��� ���� ��ȣ', -- ��� ���� ��ȣ
	`LANTYPE` VARCHAR(10) NOT NULL COMMENT '��� ����' -- ��� ����
)
COMMENT '���';

-- ���
ALTER TABLE `SE_LAN`
	ADD CONSTRAINT `PK_SE_LAN` -- ��� �⺻Ű
		PRIMARY KEY (
			`LANNO` -- ��� ���� ��ȣ
		);

ALTER TABLE `SE_LAN`
	MODIFY COLUMN `LANNO` INTEGER NOT NULL AUTO_INCREMENT COMMENT '��� ���� ��ȣ';

-- ���ɴ�
CREATE TABLE `SE_AGE` (
	`AGENO`   INTEGER     NOT NULL COMMENT '���ɴ� ���� ��ȣ', -- ���ɴ� ���� ��ȣ
	`AGETYPE` VARCHAR(10) NOT NULL COMMENT '���ɴ� ����' -- ���ɴ� ����
)
COMMENT '���ɴ�';

-- ���ɴ�
ALTER TABLE `SE_AGE`
	ADD CONSTRAINT `PK_SE_AGE` -- ���ɴ� �⺻Ű
		PRIMARY KEY (
			`AGENO` -- ���ɴ� ���� ��ȣ
		);

ALTER TABLE `SE_AGE`
	MODIFY COLUMN `AGENO` INTEGER NOT NULL AUTO_INCREMENT COMMENT '���ɴ� ���� ��ȣ';

-- ��밡�ɾ��
CREATE TABLE `SE_ADDLANG` (
	`ADDLANNO` INTEGER NOT NULL COMMENT '�߰���� ���� ��ȣ', -- �߰���� ���� ��ȣ
	`LANNO`    INTEGER NOT NULL COMMENT '��� ���� ��ȣ', -- ��� ���� ��ȣ
	`UNO`      INTEGER NOT NULL COMMENT '����ڹ�ȣ' -- ����ڹ�ȣ
)
COMMENT '��밡�ɾ��';

-- ��밡�ɾ��
ALTER TABLE `SE_ADDLANG`
	ADD CONSTRAINT `PK_SE_ADDLANG` -- ��밡�ɾ�� �⺻Ű
		PRIMARY KEY (
			`ADDLANNO` -- �߰���� ���� ��ȣ
		);

ALTER TABLE `SE_ADDLANG`
	MODIFY COLUMN `ADDLANNO` INTEGER NOT NULL AUTO_INCREMENT COMMENT '�߰���� ���� ��ȣ';

-- ��ġ�α�
CREATE TABLE `SE_LOCLOG` (
	`LOCLOGNO` INTEGER      NOT NULL COMMENT '��ġ�α׹�ȣ', -- ��ġ�α׹�ȣ
	`UNO`      INTEGER      NOT NULL COMMENT '����ڹ�ȣ', -- ����ڹ�ȣ
	`LOCTAG`   VARCHAR(255) NULL     COMMENT '��ġ�±�', -- ��ġ�±�
	`LOGTIME`  DATETIME     NULL     COMMENT '��ϳ�¥' -- ��ϳ�¥
)
COMMENT '��ġ�α�';

-- ��ġ�α�
ALTER TABLE `SE_LOCLOG`
	ADD CONSTRAINT `PK_SE_LOCLOG` -- ��ġ�α� �⺻Ű
		PRIMARY KEY (
			`LOCLOGNO` -- ��ġ�α׹�ȣ
		);

ALTER TABLE `SE_LOCLOG`
	MODIFY COLUMN `LOCLOGNO` INTEGER NOT NULL AUTO_INCREMENT COMMENT '��ġ�α׹�ȣ';

-- �����
ALTER TABLE `SE_USERS`
	ADD CONSTRAINT `FK_SE_NAT_TO_SE_USERS` -- ���� -> �����
		FOREIGN KEY (
			`NATINO` -- ���� ��� ��ȣ
		)
		REFERENCES `SE_NAT` ( -- ����
			`NATINO` -- ���� ��� ��ȣ
		);

-- �����
ALTER TABLE `SE_USERS`
	ADD CONSTRAINT `FK_SE_AGE_TO_SE_USERS` -- ���ɴ� -> �����
		FOREIGN KEY (
			`AGENO` -- ���ɴ� ���� ��ȣ
		)
		REFERENCES `SE_AGE` ( -- ���ɴ�
			`AGENO` -- ���ɴ� ���� ��ȣ
		);

-- ģ������
ALTER TABLE `SE_FRIENDINFO`
	ADD CONSTRAINT `FK_SE_USERS_TO_SE_FRIENDINFO` -- ����� -> ģ������
		FOREIGN KEY (
			`UNO` -- ����ڹ�ȣ
		)
		REFERENCES `SE_USERS` ( -- �����
			`UNO` -- ����ڹ�ȣ
		);

-- ģ������
ALTER TABLE `SE_FRIENDINFO`
	ADD CONSTRAINT `FK_SE_USERS_TO_SE_FRIENDINFO2` -- ����� -> ģ������2
		FOREIGN KEY (
			`UNO2` -- ģ����ȣ
		)
		REFERENCES `SE_USERS` ( -- �����
			`UNO` -- ����ڹ�ȣ
		);

-- ����ä�ù�
ALTER TABLE `SE_CHATROOM`
	ADD CONSTRAINT `FK_SE_USERS_TO_SE_CHATROOM` -- ����� -> ����ä�ù�
		FOREIGN KEY (
			`UNO` -- �����ڹ�ȣ
		)
		REFERENCES `SE_USERS` ( -- �����
			`UNO` -- ����ڹ�ȣ
		);

-- �����缭��
ALTER TABLE `SE_VOICMSG`
	ADD CONSTRAINT `FK_SE_USERS_TO_SE_VOICMSG` -- ����� -> �����缭��
		FOREIGN KEY (
			`UNO` -- �����»����ȣ
		)
		REFERENCES `SE_USERS` ( -- �����
			`UNO` -- ����ڹ�ȣ
		);

-- �����缭��
ALTER TABLE `SE_VOICMSG`
	ADD CONSTRAINT `FK_SE_USERS_TO_SE_VOICMSG2` -- ����� -> �����缭��2
		FOREIGN KEY (
			`UNO2` -- �޴»����ȣ
		)
		REFERENCES `SE_USERS` ( -- �����
			`UNO` -- ����ڹ�ȣ
		);

-- �ҷ�����ڽŰ�
ALTER TABLE `SE_DECCREAT`
	ADD CONSTRAINT `FK_SE_USERS_TO_SE_DECCREAT` -- ����� -> �ҷ�����ڽŰ�
		FOREIGN KEY (
			`UNO` -- �Ű��ڹ�ȣ
		)
		REFERENCES `SE_USERS` ( -- �����
			`UNO` -- ����ڹ�ȣ
		);

-- �ҷ�����ڽŰ�
ALTER TABLE `SE_DECCREAT`
	ADD CONSTRAINT `FK_SE_DEC_TO_SE_DECCREAT` -- �Ű����� -> �ҷ�����ڽŰ�
		FOREIGN KEY (
			`DECLISTNO` -- �Ű� ���� ��� ��ȣ
		)
		REFERENCES `SE_DEC` ( -- �Ű�����
			`DECLISTNO` -- �Ű� ���� ��� ��ȣ
		);

-- �ҷ�����ڽŰ�
ALTER TABLE `SE_DECCREAT`
	ADD CONSTRAINT `FK_SE_USERS_TO_SE_DECCREAT2` -- ����� -> �ҷ�����ڽŰ�2
		FOREIGN KEY (
			`UNO2` -- �ǽŰ��ڹ�ȣ
		)
		REFERENCES `SE_USERS` ( -- �����
			`UNO` -- ����ڹ�ȣ
		);

-- ��밡�ɾ��
ALTER TABLE `SE_ADDLANG`
	ADD CONSTRAINT `FK_SE_LAN_TO_SE_ADDLANG` -- ��� -> ��밡�ɾ��
		FOREIGN KEY (
			`LANNO` -- ��� ���� ��ȣ
		)
		REFERENCES `SE_LAN` ( -- ���
			`LANNO` -- ��� ���� ��ȣ
		);

-- ��밡�ɾ��
ALTER TABLE `SE_ADDLANG`
	ADD CONSTRAINT `FK_SE_USERS_TO_SE_ADDLANG` -- ����� -> ��밡�ɾ��
		FOREIGN KEY (
			`UNO` -- ����ڹ�ȣ
		)
		REFERENCES `SE_USERS` ( -- �����
			`UNO` -- ����ڹ�ȣ
		);

-- ��ġ�α�
ALTER TABLE `SE_LOCLOG`
	ADD CONSTRAINT `FK_SE_USERS_TO_SE_LOCLOG` -- ����� -> ��ġ�α�
		FOREIGN KEY (
			`UNO` -- ����ڹ�ȣ
		)
		REFERENCES `SE_USERS` ( -- �����
			`UNO` -- ����ڹ�ȣ
		);