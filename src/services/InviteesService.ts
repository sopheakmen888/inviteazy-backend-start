import { IInvitee, IInviteeService, IInviteeWithoutId } from '../interfaces/InviteesInterface';
import jwt from 'jsonwebtoken';

export class InviteeService implements IInviteeService {
    constructor(private inviteeRepository: IInviteeService) {}

    async findAll(): Promise<IInvitee[]> {
        return await this.inviteeRepository.findAll();
    }

    async findById(id: string): Promise<IInvitee | null> {
        const invitee = await this.inviteeRepository.findById(id);
        if (!invitee) throw Object.assign(new Error('Invitee not found'), { status: 404 });
        return invitee;
    }

    async findByEventId(event_id: string): Promise<IInvitee[]> {
        return await this.inviteeRepository.findByEventId(event_id);
    }

    async findByUserId(user_id: string): Promise<IInvitee[]> {
        return await this.inviteeRepository.findByUserId(user_id);
    }

    async create(invitee: IInviteeWithoutId): Promise<IInvitee> {
        const existingInvitees = await this.inviteeRepository.findByUserId(invitee.user_id);
        if (existingInvitees.length > 0) {
            throw Object.assign(new Error('Invitee already exists'), { status: 400 });
        }

        return await this.inviteeRepository.create(invitee);
    }

    async update(id: string, invitee: Partial<IInviteeWithoutId>): Promise<IInvitee | null> {
        return await this.inviteeRepository.update(id, invitee);
    }

    delete(id: string): Promise<void> {
        return this.inviteeRepository.delete(id);
    }
}
