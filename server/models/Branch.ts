import {HasOne, BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt} from "sequelize-typescript";
import {User} from "./User";
import {Pad} from "./Pad";
import {Revision} from "./Revision";

@Table({ modelName: 'branch'})
export class Branch extends Model<Branch> {

    @Column({
        type: DataType.STRING,
        field: 'id',
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    })
    public id: string;

    @Column({
        type: DataType.TEXT,
        field: 'content'
    })
    public content: string;

    @Column({
        type: DataType.TEXT,
        field: 'raw_content'
    })
    public rawContent: string;

    @Column({
        type: DataType.INTEGER,
        field: 'head'
    })
    public head: number;

    @Column({
        type: DataType.STRING,
        field: 'id_pad'
    })
    @ForeignKey(() => Pad)
    public idPad: number;

    @Column({
        type: DataType.INTEGER,
        field: 'id_user'
    })
    @ForeignKey(() => User)
    public idUser: number;

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

    @BelongsTo(() => User, 'idUser')
    public user: User;

    @HasOne(() => Revision, 'head')
    public revision: Revision;
}