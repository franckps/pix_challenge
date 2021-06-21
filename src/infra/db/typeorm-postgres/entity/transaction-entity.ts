import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne, Generated } from 'typeorm'
import { User } from './user-entity'

@Entity()
export class Transaction {
    @PrimaryColumn()
    @Generated('uuid')
    id: 'uuid';

    @Column()
    amount: number;

    @Column({ type: 'uuid' })
    creditorId: 'uuid';

    @Column({ type: 'uuid' })
    debitorId: 'uuid';

    @ManyToOne(() => User, user => user.creditorTransactions)
    creditor: User;

    @ManyToOne(() => User, user => user.debitorTransactions)
    debitor: User;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: string;
}
