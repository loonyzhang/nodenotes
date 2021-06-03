-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        10.5.9-MariaDB-1:10.5.9+maria~focal - mariadb.org binary distribution
-- 服务器操作系统:                      debian-linux-gnu
-- HeidiSQL 版本:                  11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- 导出 nodenotes 的数据库结构
DROP DATABASE IF EXISTS `nodenotes`;
CREATE DATABASE IF NOT EXISTS `nodenotes` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `nodenotes`;

-- 导出  表 nodenotes.comments 结构
DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cid` int(10) unsigned NOT NULL COMMENT 'contents id',
  `created` int(10) unsigned DEFAULT NULL COMMENT '创建时间',
  `author` varchar(255) DEFAULT NULL COMMENT '评论作者',
  `authorId` int(10) unsigned DEFAULT NULL COMMENT '评论所属用户id',
  `ownerId` int(10) unsigned DEFAULT NULL COMMENT '评论所属内容作者id',
  `mail` varchar(255) DEFAULT NULL COMMENT '评论者邮箱',
  `url` varchar(255) DEFAULT NULL COMMENT '评论者网站',
  `ip` varchar(64) DEFAULT NULL COMMENT '评论者ip地址',
  `agent` varchar(255) DEFAULT NULL COMMENT '评论者客户端',
  `text` text DEFAULT NULL COMMENT '评论正文',
  `type` varchar(255) DEFAULT NULL COMMENT '评论类型',
  `status` varchar(50) DEFAULT NULL COMMENT '评论状态',
  `parent` int(10) unsigned DEFAULT NULL COMMENT '父级评论',
  PRIMARY KEY (`id`),
  KEY `cid` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='评论表';

-- 数据导出被取消选择。

-- 导出  表 nodenotes.contents 结构
DROP TABLE IF EXISTS `contents`;
CREATE TABLE IF NOT EXISTS `contents` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `slug` varchar(255) DEFAULT NULL COMMENT '标题英文字符',
  `created` int(10) unsigned DEFAULT NULL COMMENT '创建时间',
  `modified` int(10) unsigned DEFAULT NULL COMMENT '修改时间',
  `text` text DEFAULT NULL COMMENT '正文',
  `seq` int(10) unsigned DEFAULT NULL COMMENT '排序',
  `authorId` int(10) unsigned DEFAULT NULL COMMENT '内容所属用户id',
  `template` varchar(50) DEFAULT NULL COMMENT '内容使用的模板',
  `type` varchar(50) DEFAULT NULL COMMENT '内容类别',
  `status` varchar(50) DEFAULT NULL COMMENT '内容状态-上线/草稿等',
  `password` varchar(32) DEFAULT NULL COMMENT '内容密码',
  `commentsNum` int(10) unsigned DEFAULT NULL COMMENT '内容评论数',
  `allowComment` char(1) DEFAULT NULL COMMENT '是否允许评论-Y/N',
  `allowPing` char(1) DEFAULT NULL COMMENT '是否允许ping',
  `allowFeed` char(1) DEFAULT NULL COMMENT '是否出现在聚合中',
  `parent` int(10) unsigned DEFAULT NULL COMMENT '父id',
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `created` (`created`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='内容表';

-- 数据导出被取消选择。

-- 导出  表 nodenotes.metas 结构
DROP TABLE IF EXISTS `metas`;
CREATE TABLE IF NOT EXISTS `metas` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `slug` varchar(255) DEFAULT NULL COMMENT '项目英文字符',
  `type` varchar(255) DEFAULT NULL COMMENT '项目类型',
  `description` varchar(255) DEFAULT NULL COMMENT '项目描述',
  `count` int(10) unsigned DEFAULT NULL COMMENT '项目所属内容个数',
  `seq` int(10) unsigned DEFAULT NULL COMMENT '项目排序',
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='项目表';

-- 数据导出被取消选择。

-- 导出  表 nodenotes.options 结构
DROP TABLE IF EXISTS `options`;
CREATE TABLE IF NOT EXISTS `options` (
  `key` varchar(50) NOT NULL COMMENT '配置名称',
  `user` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '配置所属用户,默认为0(全局配置)',
  `value` text DEFAULT NULL COMMENT '配置值',
  PRIMARY KEY (`key`,`user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='配置表';

-- 数据导出被取消选择。

-- 导出  表 nodenotes.relationships 结构
DROP TABLE IF EXISTS `relationships`;
CREATE TABLE IF NOT EXISTS `relationships` (
  `cid` int(10) unsigned NOT NULL COMMENT 'contents id',
  `mid` int(10) unsigned NOT NULL COMMENT 'metas id',
  PRIMARY KEY (`cid`,`mid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='内容/项目关系表';

-- 数据导出被取消选择。

-- 导出  表 nodenotes.users 结构
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `password` varchar(32) DEFAULT NULL,
  `mail` varchar(255) NOT NULL,
  `url` varchar(255) DEFAULT NULL COMMENT '用户主页',
  `created` int(10) unsigned DEFAULT NULL COMMENT '注册时间',
  `activated` int(10) unsigned DEFAULT NULL COMMENT '最后活动时间',
  `group` varchar(50) DEFAULT NULL COMMENT '用户组',
  `authCode` varchar(50) DEFAULT NULL COMMENT '用户登录验证码',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `mail` (`mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

-- 数据导出被取消选择。

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
