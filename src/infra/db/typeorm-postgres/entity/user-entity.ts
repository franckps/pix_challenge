import { Entity, Column, OneToMany, Generated, PrimaryGeneratedColumn } from 'typeorm'
import { PixKey } from './pix-key-entity'
import { Transaction } from './transaction-entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    id: 'uuid';

    @Column()
    name: string;

    @Column()
    phone: string;

    @OneToMany(() => Transaction, transaction => transaction.debitor)
    debitorTransactions: Transaction[];

    @OneToMany(() => Transaction, transaction => transaction.creditor)
    creditorTransactions: Transaction[];

    @OneToMany(() => PixKey, pixKey => pixKey.user)
    pixKeys: PixKey[];
}
