import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class PixKey {
    @PrimaryColumn()
    id: string;

    @Column()
    key: string;

    @Column()
    userId: string;
}
