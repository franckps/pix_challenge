import { PixKeyModel } from '../../domain/pix-key-model'

export interface AddPixKeyModel{
    userId: 'uuid'
    key: string
}

export interface AddPixKeyRepository{
    add (addPixKeyModel: AddPixKeyModel): Promise<PixKeyModel>
}
