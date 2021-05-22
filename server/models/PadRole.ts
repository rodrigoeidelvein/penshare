import {Column, CreatedAt, DataType, Model, Table, UpdatedAt} from "sequelize-typescript";

@Table({ modelName: 'pad_role'})
export class PadRole extends Model<PadRole> {

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
        field: 'name',
        allowNull: false
    })
    public name: string;

    @Column({
        type: DataType.BOOLEAN,
        field: 'read'
    })
    public read: boolean;

    @Column({
        type: DataType.BOOLEAN,
        field: 'write'
    })
    public write: boolean;

    @Column({
        type: DataType.BOOLEAN,
        field: 'edit'
    })
    public edit: boolean;

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

}