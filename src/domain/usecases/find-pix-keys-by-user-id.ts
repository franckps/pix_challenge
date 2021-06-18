import { PixKeyModel } from '../pix-key-model'

export interface AddPixKey {
    find (userId: string): Promise<PixKeyModel[]>
}
