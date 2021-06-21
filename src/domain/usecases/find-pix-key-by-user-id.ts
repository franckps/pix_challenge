import { PixKeyModel } from '../pix-key-model'

export interface FindPixKeyByUserId {
    find (userId: 'uuid'): Promise<PixKeyModel[]>
}
