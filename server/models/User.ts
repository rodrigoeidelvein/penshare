'use strict';
import {BelongsToMany, Column, DataType, HasMany, Model, Scopes, Table} from "sequelize-typescript";
import {Pad} from "./Pad";
import {LikePad} from "./LikePad";
import {MemberPad} from "./MemberPad";

@Scopes(() => ({
    pads: {
        include: [{model: Pad, as: 'pads'}]
    },
    likePads: {
        include: [{
            model: Pad,
            as: 'likePads'
        }]
    },
    memberPads: {
        include: [{ model: MemberPad, as: 'memberPads' }]
    },
}))
@Table({modelName: 'user'})
export class User extends Model<User> {

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
        field: 'first_name',
        allowNull: false
    })
    public firstName: string;

    @Column({
        type: DataType.STRING,
        field: 'full_name',
        allowNull: false
    })
    public fullName: string;

    @Column({
        type: DataType.STRING,
        field: 'photo',
    })
    public photo: string;

    @Column({
        type: DataType.STRING,
        field: 'email',
        allowNull: false
    })
    public email: string;

    @Column({
        type: DataType.STRING,
        field: 'id_google'
    })
    public idGoogle?: string;

    @Column({
        type: DataType.STRING,
        field: 'id_outlook'
    })
    public idOutlook?: string;

    @Column({
        type: DataType.STRING,
        field: 'created_date'
    })
    public createdAt: Date;

    @Column({
        type: DataType.STRING,
        field: 'updated_date'
    })
    public updatedAt: Date;

    @HasMany(() => Pad, 'idAuthor')
    public pads?: Pad[];

    @BelongsToMany(() => Pad, () => LikePad)
    public likePad?: Pad[];

    @HasMany(() => MemberPad, 'idUser')
    public memberPads?: MemberPad[];
}
