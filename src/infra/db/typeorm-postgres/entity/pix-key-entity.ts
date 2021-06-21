import { Entity, Column, PrimaryColumn, ManyToOne, Generated } from 'typeorm'
import { User } from './user-entity'

@Entity()
export class PixKey {
    @PrimaryColumn()
    @Generated('uuid')
    id: string;

    @Column()
    key: string;

    @Column({ type: 'uuid' })
    userId: string;

    @ManyToOne(() => User, user => user.pixKeys)
    user: User;
}
