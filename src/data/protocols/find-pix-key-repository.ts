import { PixKeyModel } from '../../domain/pix-key-model'

export interface FindPixKeyModel{
    id?: string
    key?: string
    userId?: string
}

export interface FindPixKeyRepository{
    find (findPixKeyModel: FindPixKeyModel): Promise<PixKeyModel[]>
}
