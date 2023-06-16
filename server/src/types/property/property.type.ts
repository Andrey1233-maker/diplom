import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { IPlayer, Player } from "../player/player.type"


export interface IProperty {
    id: string
    name: string
    isPledge: boolean
    cost: number
    color: string
}

export class Property implements IProperty {

    @PrimaryGeneratedColumn()
    id: string

    @Column({default: 'Без названия'})
    name: string

    @Column({default: false})
    isPledge: boolean

    @Column({default: 0})
    cost: number

    @Column({default: '#a7a7a7'})
    color: string
}