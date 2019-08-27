/*
 Navicat Premium Data Transfer

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 50642
 Source Host           : localhost:3306
 Source Schema         : express_admin

 Target Server Type    : MySQL
 Target Server Version : 50642
 File Encoding         : 65001

 Date: 27/08/2019 13:41:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for branch
-- ----------------------------
DROP TABLE IF EXISTS `branch`;
CREATE TABLE `branch`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0',
  `parent_id` int(11) NOT NULL DEFAULT 0,
  `level` int(11) NOT NULL DEFAULT 0,
  `sort` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of branch
-- ----------------------------
INSERT INTO `branch` VALUES (1, '科学研究有限公司', '01', 0, 0, 0, '2019-08-20 09:40:09', '2019-08-20 09:40:11');
INSERT INTO `branch` VALUES (2, '信息部', '0101', 1, 1, 0, '2019-08-20 09:40:13', '2019-08-20 09:40:15');

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `page_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `control_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `parent_id` int(11) NOT NULL DEFAULT 0,
  `level` int(11) NOT NULL DEFAULT 0,
  `sort` int(11) NOT NULL DEFAULT 0,
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `is_show` tinyint(4) NOT NULL DEFAULT 1,
  `is_enabled` tinyint(4) NOT NULL DEFAULT 1,
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES (1, '主页', '/main', '', 0, 0, 0, 'fa fa-desktop', 1, 1, '2019-08-20 09:39:10', '2019-08-20 09:39:13');
INSERT INTO `menu` VALUES (2, '系统管理', '', '', 0, 0, 0, 'fa fa-cog', 1, 1, '2019-08-20 09:39:15', '2019-08-20 09:39:17');
INSERT INTO `menu` VALUES (3, '用户管理', '/system/userList', '/system/getUserPage', 2, 1, 0, '', 1, 1, '2019-08-20 09:39:19', '2019-08-20 09:39:22');
INSERT INTO `menu` VALUES (4, '菜单管理', '/system/menuList', '/system/getMenuPage', 2, 1, 1, '', 1, 1, '2019-08-20 09:39:24', '2019-08-20 09:39:26');
INSERT INTO `menu` VALUES (5, '部门管理', '/system/branchList', '/system/getBranchPage', 2, 1, 2, '', 1, 1, '2019-08-20 09:39:29', '2019-08-20 09:39:31');
INSERT INTO `menu` VALUES (6, '职位管理', '/system/positionList', '/system/getPositionPage', 2, 1, 3, '', 1, 1, '2019-08-20 09:39:34', '2019-08-20 09:39:36');
INSERT INTO `menu` VALUES (7, '用户编辑', '', '/system/userEdit/:id', 3, 2, 0, '', 0, 1, '2019-08-20 09:39:38', '2019-08-20 09:39:40');
INSERT INTO `menu` VALUES (8, '用户删除', '', '/system/deleteUser/:id', 3, 2, 1, '', 0, 1, '2019-08-20 09:39:43', '2019-08-20 09:39:45');
INSERT INTO `menu` VALUES (9, '菜单编辑', '', '/system/menuEdit/:id', 4, 2, 0, '', 0, 1, '2019-08-20 09:39:48', '2019-08-20 09:39:50');
INSERT INTO `menu` VALUES (10, '菜单删除', '', '/system/deleteMenu/:id', 4, 2, 1, '', 0, 1, '2019-08-20 09:39:52', '2019-08-20 09:39:55');
INSERT INTO `menu` VALUES (11, '部门编辑', '', '/system/branchEdit/:id', 5, 2, 0, '', 0, 1, '2019-08-20 09:18:27', '2019-08-20 09:18:27');
INSERT INTO `menu` VALUES (12, '部门删除', '', '/system/deleteBranch/:id', 5, 2, 1, '', 0, 1, '2019-08-20 09:19:29', '2019-08-20 09:19:29');
INSERT INTO `menu` VALUES (13, '职位编辑', '', '/system/positionEdit/:id', 6, 2, 0, '', 0, 1, '2019-08-20 09:20:23', '2019-08-20 09:20:23');
INSERT INTO `menu` VALUES (14, '职位删除', '', '/system/deletePosition/:id', 6, 2, 1, '', 0, 1, '2019-08-20 09:20:50', '2019-08-20 09:20:50');

-- ----------------------------
-- Table structure for position
-- ----------------------------
DROP TABLE IF EXISTS `position`;
CREATE TABLE `position`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `branch_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0',
  `branch_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `menu_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of position
-- ----------------------------
INSERT INTO `position` VALUES (1, '软件开发', '2', '信息部', '1,2,3,4,5,6,7,8,9,10,11,12,13,14', '2019-08-20 09:39:02', '2019-08-20 09:39:04');
INSERT INTO `position` VALUES (2, '软件测试', '2', '信息部', '1,2,3', '2019-08-20 09:42:24', '2019-08-20 09:44:09');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `login_password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `real_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `position_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0',
  `position_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `branch_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0',
  `branch_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `mobile` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `is_enabled` tinyint(4) NOT NULL DEFAULT 1,
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin', '21232f297a57a5a743894a0e4a801fc3', '管理员', '1', '软件开发', '2', '信息部', '15757288533', 1, '2019-08-20 09:38:53', '2019-08-20 09:38:56');
INSERT INTO `user` VALUES (2, 'test', '098f6bcd4621d373cade4e832627b4f6', '测试1', '2', '软件测试', '2', '信息部', '', 1, '2019-08-20 09:43:05', '2019-08-20 09:43:05');

SET FOREIGN_KEY_CHECKS = 1;
