/*
Navicat MySQL Data Transfer

Source Server         : HHH
Source Server Version : 80018
Source Host           : localhost:3308
Source Database       : socialm

Target Server Type    : MYSQL
Target Server Version : 80018
File Encoding         : 65001

Date: 2020-10-11 23:45:38
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `contentid` int(11) NOT NULL,
  `tel` char(11) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `content` varchar(800) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `contentid` (`contentid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of comments
-- ----------------------------

-- ----------------------------
-- Table structure for contents
-- ----------------------------
DROP TABLE IF EXISTS `contents`;
CREATE TABLE `contents` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `tel` char(11) COLLATE utf8_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `week` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `isaddcommunity` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `seenumber` int(11) NOT NULL,
  `zannumber` int(11) NOT NULL,
  `content` varchar(800) COLLATE utf8_unicode_ci NOT NULL,
  `contentimgurls` varchar(800) COLLATE utf8_unicode_ci DEFAULT NULL,
  `contentlabel` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tel` (`tel`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of contents
-- ----------------------------
INSERT INTO `contents` VALUES ('1', '', '2020-10-10', '23:31:55', '六', '0', '0', '0', 'www', '', '');

-- ----------------------------
-- Table structure for replaycomments
-- ----------------------------
DROP TABLE IF EXISTS `replaycomments`;
CREATE TABLE `replaycomments` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `commentid` int(11) NOT NULL,
  `tel` char(11) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `content` varchar(800) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `commentid` (`commentid`),
  UNIQUE KEY `tel` (`tel`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of replaycomments
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `tel` char(11) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `signature` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `photoimgurl` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `interestedlabels` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`tel`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('18700000000', 'hhh', '123456', null, 'IMG_2774.JPG', '开心,孤独,自卑');

-- ----------------------------
-- Table structure for zans
-- ----------------------------
DROP TABLE IF EXISTS `zans`;
CREATE TABLE `zans` (
  `id` int(11) NOT NULL,
  `tel` char(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  KEY `tel` (`tel`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of zans
-- ----------------------------
