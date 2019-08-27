'use strict';
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    let Menu = sequelize.define('menu', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        /**菜单名称 */
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        /**页面地址 */
        page_url: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        /**控件地址 */
        control_url: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        /**上一级菜单id */
        parent_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        /**层级 */
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        /**排序 */
        sort: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        /**图标 */
        icon: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        /**是否显示：0否 1是*/
        is_show: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1
        },
        /**是否启用：0禁用 1正常*/
        is_enabled: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1
        },
        createdAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        freezeTableName: true,
    });

    return Menu;
};