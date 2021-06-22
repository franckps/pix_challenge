import { PixKeyModel } from '../pix-key-model'

export interface FindAllPixKey {
    find (): Promise<PixKeyModel[]>
}
