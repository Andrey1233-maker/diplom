import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Property } from './property.type';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PropertyService {

    constructor(
        @InjectRepository(Property)
        private propertyRepository: Repository<Property>,
    ) {}


    async createProperty() {
        try {
            const newProperty = await this.propertyRepository.create()
            await this.propertyRepository.save(newProperty)
            return newProperty
        }
        catch(e) {
            throw new Error(`createProperty: invalid request ~ ${e}`)
        }
    }

    async deleteProperty(id: string) {
        try {
            await this.propertyRepository.delete({ id })
            return {
                message: 'deleted',
                error: false,
            }
        }
        catch(e) {
            throw new Error(`deleteProperty: invalid request ~ ${e}`)
        }
    }

    async getPropertyById(id: string) {
        try {

        }
        catch(e) {
            throw new Error(`getPropertyById: invalid request ~ ${e}`)
        }
    }
}
