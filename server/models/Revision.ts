import {BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt} from "sequelize-typescript";
import {User} from "./User";
import {Branch} from "./Branch";

@Table({ modelName: 'revision'})
export class Revision extends Model<Revision> {

    @Column({
        type: DataType.INTEGER,
        field: 'id',
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    })
    public id: number;

    @Column({
        type: DataType.STRING,
        field: 'changeset'
    })
    public changeSet: string;

    @Column({
        type: DataType.INTEGER,
        field: 'id_author'
    })
    @ForeignKey(() => User)
    public idAuthor: number;

    @Column({
        type: DataType.STRING,
        field: 'id_branch'
    })
    @ForeignKey(() => Branch)
    public idBranch: string;

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

    @BelongsTo(() => Branch, 'idBranch')
    public branch: Branch;

    @BelongsTo(() => User, 'idAuthor')
    public user: User;
}