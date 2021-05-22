import {DataType, Model, Table, Column, ForeignKey, CreatedAt, UpdatedAt, BelongsTo} from "sequelize-typescript";
import {Pad} from "./Pad";
import {User} from "./User";
import {PadRole} from "./PadRole";

@Table({ modelName: 'member_pad'})
export class MemberPad extends Model<MemberPad> {

    @Column({
        type: DataType.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true
    })
    public id: number;

    @Column({
        type: DataType.STRING,
        field: 'id_pad'
    })
    @ForeignKey(() => Pad)
    public idPad: string

    @Column({
        type: DataType.NUMBER,
        field: 'id_user'
    })
    @ForeignKey(() => User)
    public idUser: number;

    @Column({
        type: DataType.INTEGER,
        field: 'id_pad_role'
    })
    @ForeignKey(() => PadRole)
    public idPadRole: number;

    @Column({
        type: DataType.DATE,
        field: 'create_date',
    })
    @CreatedAt
    public createdAt: Date;

    @Column({
        type: DataType.DATE,
        field: 'update_date',
    })
    @UpdatedAt
    public updatedAt: Date;

    @BelongsTo(() => Pad, 'idPad')
    public pad: Pad;

    @BelongsTo(() => User, 'idUser')
    public user: User;
}