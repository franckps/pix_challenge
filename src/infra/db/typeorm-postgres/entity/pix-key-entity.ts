import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm'
import { User } from './user-entity'

@Entity()
export class PixKey {
    @PrimaryColumn()
    id: string;

    @Column()
    key: string;

    @Column()
    userId: string;

    @ManyToOne(() => User, user => user.pixKeys)
    user: User;
}
