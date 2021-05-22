'use strict';
import { __decorate, __metadata } from "tslib";
import { Column, DataType, HasMany, Table, Model, Scopes } from "sequelize-typescript";
import { Pad } from "./Pad";
let User = class User extends Model {
};
__decorate([
    Column({
        type: DataType.INTEGER,
        field: 'id',
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    Column({
        type: DataType.STRING,
        field: 'fist_name',
        allowNull: false
    }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    Column({
        type: DataType.STRING,
        field: 'full_name',
        allowNull: false
    }),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    Column({
        type: DataType.STRING,
        field: 'photo',
    }),
    __metadata("design:type", String)
], User.prototype, "photo", void 0);
__decorate([
    Column({
        type: DataType.STRING,
        field: 'email',
        allowNull: false
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column({
        type: DataType.STRING,
        field: 'id_google'
    }),
    __metadata("design:type", String)
], User.prototype, "idGoogle", void 0);
__decorate([
    Column({
        type: DataType.STRING,
        field: 'id_outlook'
    }),
    __metadata("design:type", String)
], User.prototype, "idOutlook", void 0);
__decorate([
    Column({
        type: DataType.STRING,
        field: 'created_date'
    }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    Column({
        type: DataType.STRING,
        field: 'updated_date'
    }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    HasMany(() => Pad, 'idAuthor'),
    __metadata("design:type", Array)
], User.prototype, "pads", void 0);
User = __decorate([
    Scopes(() => ({
        pads: {
            include: [{ model: () => Pad, as: 'pads' }]
        }
    })),
    Table({ modelName: 'user' })
], User);
export { User };
