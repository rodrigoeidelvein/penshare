import { __decorate, __metadata } from "tslib";
import { Column, DataType, Model, Table, ForeignKey, CreatedAt, UpdatedAt, BelongsTo, Scopes } from "sequelize-typescript";
import { PadType } from "../enums/PadType";
import { User } from "./User";
let Pad = class Pad extends Model {
};
__decorate([
    Column({
        type: DataType.STRING,
        field: 'id',
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    }),
    __metadata("design:type", String)
], Pad.prototype, "id", void 0);
__decorate([
    Column({
        type: DataType.STRING,
        field: 'title',
        allowNull: false
    }),
    __metadata("design:type", String)
], Pad.prototype, "title", void 0);
__decorate([
    Column({
        type: DataType.ENUM('PRIVATE', 'PUBLIC'),
        field: 'type',
        allowNull: false
    }),
    __metadata("design:type", String)
], Pad.prototype, "type", void 0);
__decorate([
    Column({
        type: DataType.INTEGER,
        field: 'id_author'
    }),
    ForeignKey(() => User),
    __metadata("design:type", Number)
], Pad.prototype, "idAuthor", void 0);
__decorate([
    Column({
        type: DataType.DATE,
        field: 'create_date',
    }),
    CreatedAt,
    __metadata("design:type", Date)
], Pad.prototype, "createdAt", void 0);
__decorate([
    Column({
        type: DataType.DATE,
        field: 'update_date',
    }),
    UpdatedAt,
    __metadata("design:type", Date)
], Pad.prototype, "updatedAt", void 0);
__decorate([
    BelongsTo(() => User, 'idAuthor'),
    __metadata("design:type", User)
], Pad.prototype, "author", void 0);
Pad = __decorate([
    Scopes(() => ({
        author: {
            include: [{ model: () => User }]
        }
    })),
    Table({ modelName: 'pad' })
], Pad);
export { Pad };
