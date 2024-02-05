import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from './request.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RequestService {
    constructor(@InjectRepository(Request) private repo: Repository<Request>) { }

    create(ticket_name: string, quantity: number) {
        const request = this.repo.create({ ticket_name, quantity });

        return this.repo.save(request);
    }

    findOne(id: number) {
        return this.repo.findOneBy({ id });
    }

    find(ticket_name: string) {
        return this.repo.find({ where: { ticket_name } });
    }

    async update(id: number, attrs: Partial<Request>) {
        const request = await this.findOne(id);
        if (!request) {
            throw new NotFoundException('user not found');
        }
        Object.assign(request, attrs);
        if ((attrs.ticket_name != null || attrs.quantity != null)
            && attrs.request_status == null) {

            return this.repo.save(request);

        }
        else if (attrs.request_status != null
            && (attrs.ticket_name == null && attrs.quantity == null)) {

            if (attrs.request_status == 'VERIFIED' || attrs.request_status == 'REJECTED') {
                return this.repo.save(request);

            } else {
                throw new NotFoundException('request status can only accept "VERIFIED" or "REJECTED" status');

            }

        } else {
            throw new NotFoundException('invalid request');
        }



    }

    async remove(id: number) {
        const request = await this.findOne(id);
        if (!request) {
            throw new NotFoundException('user not found');
        }
        return this.repo.remove(request);
    }

}
