import { PixKeyModel } from '../../domain/pix-key-model'

export interface FindPixKeyModel{
    id?: 'uuid'
    key?: string
    userId?: 'uuid'
}

export interface FindPixKeyRepository{
    find (findPixKeyModel?: FindPixKeyModel): Promise<PixKeyModel[]>
}
