import { PixKeyModel } from '../../domain/pix-key-model'

export interface AddPixKeyModel{
    userId: string
    key: string
}

export interface AddPixKeyRepository{
    add (addPixKeyModel: AddPixKeyModel): Promise<PixKeyModel>
}
