import { PixKeyModel } from '../pix-key-model'

export interface AddPixKeyModel{
    key: string
    userId: string
}

export interface AddPixKey {
    add (addPixKeyModel: AddPixKeyModel): Promise<PixKeyModel>
}
