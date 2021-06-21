import { Entity, Column, PrimaryColumn, ManyToOne, Generated, JoinColumn } from 'typeorm'
import { User } from './user-entity'

@Entity()
export class PixKey {
    @PrimaryColumn()
    @Generated('uuid')
    id: 'uuid';

    @Column()
    key: string;

    @Column({ type: 'uuid' })
    userId: 'uuid';

    @ManyToOne(type => User, { nullable: true })
    @JoinColumn({ name: 'userId' })
    user: User;
}
