import {Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt} from "sequelize-typescript";
import {User} from "./User";
import {Pad} from "./Pad";

@Table({modelName: 'like_pad'})
export class LikePad extends Model<LikePad> {

    @Column({
        type: DataType.INTEGER,
        field: 'id_user',
        primaryKey: true
    })
    @ForeignKey(() => User)
    public idUser: number;

    @Column({
        type: DataType.STRING,
        field: 'id_pad',
        primaryKey: true
    })
    @ForeignKey(() => Pad)
    public idPad: number;

    @Column({
        type: DataType.INTEGER,
        field: 'amount'
    })
    public amount: number;

    @Column({
        type: DataType.DATE,
        field: 'create_date',
    })
    @CreatedAt
    public createdAt: Date;

    @Column({
        type: DataType.DATE,
        field: 'update_date'
    })
    @UpdatedAt
    public updatedAt: Date;
}