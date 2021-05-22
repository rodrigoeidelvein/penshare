import {
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    Model,
    Scopes,
    Table,
    UpdatedAt
} from "sequelize-typescript";
import {PadType} from "../enums/PadType";
import {User} from "./User";

@Scopes(() => ({
    author: {
        include: [{model: User}]
    }
}))
@Table({modelName: 'pad'})
export class Pad extends Model<Pad> {

    @Column({
        type: DataType.STRING,
        field: 'id',
        primaryKey: true,
        allowNull: false,
    })
    public id: string;

    @Column({
        type: DataType.STRING,
        field: 'title',
        allowNull: false
    })
    public title: string;

    @Column({
        type: DataType.ENUM('PRIVATE', 'PUBLIC'),
        field: 'type',
        allowNull: false
    })
    public type: PadType;

    @Column({
        type: DataType.INTEGER,
        field: 'id_author'
    })
    @ForeignKey(() => User)
    public idAuthor: number;

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

    @BelongsTo(() => User, 'idAuthor')
    public author: User;
}