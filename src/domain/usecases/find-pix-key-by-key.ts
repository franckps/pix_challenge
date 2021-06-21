import { PixKeyModel } from '../pix-key-model'

export interface FindPixKeyByKey {
    find (key: string): Promise<PixKeyModel>
}
