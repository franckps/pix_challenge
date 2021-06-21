import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne, Generated } from 'typeorm'
import { User } from './user-entity'

@Entity()
export class Transaction {
    @PrimaryColumn()
    @Generated('uuid')
    id: string;

    @Column()
    amount: number;

    @Column()
    creditorId: string;

    @Column()
    debitorId: string;

    @ManyToOne(() => User, user => user.creditorTransactions)
    creditor: User;

    @ManyToOne(() => User, user => user.debitorTransactions)
    debitor: User;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: string;
}
