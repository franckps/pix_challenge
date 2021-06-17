import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'
import { PixKey } from './pix-key-entity'
import { Transaction } from './transaction-entity'

@Entity()
export class User {
    @PrimaryColumn()
    id: string;

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
