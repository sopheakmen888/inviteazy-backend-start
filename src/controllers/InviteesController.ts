import { NextFunction, Request, Response } from "express";
import { IInvitee, IInviteeWithoutId, IInviteeService } from "../interfaces/InviteesInterface";

export class InviteesController {
    constructor(private inviteesService: IInviteeService) {}

    async getAllInvitees(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.inviteesService.findAll();
            res.json({ message: "Get all invitees", data: result });
        } catch (error) {
            next(error);
        }
    }

    async getInviteeById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const result = await this.inviteesService.findById(id);
            res.json({ message: "Get invitee by Id", data: result });
        } catch (error) {
            next(error);
        }
    }

    async createInvitee(req: Request, res: Response, next: NextFunction) {
        try {
            const invitee: IInviteeWithoutId = req.body;
            const newInvitee = await this.inviteesService.create(invitee);
            res.status(201).json({ message: "New invitee created", data: newInvitee });
        } catch (error) {
            next(error);
        }
    }

    async updateInvitee(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const invitee: Partial<IInviteeWithoutId> = req.body;
            const updatedInvitee = await this.inviteesService.update(id, invitee);
            res.json({ message: "Invitee updated successfully", data: updatedInvitee });
        } catch (error) {
            next(error);
        }
    }

    async deleteInvitee(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await this.inviteesService.delete(id);
            res.status(200).json({ message: "Invitee deleted successfully" });
        } catch (error) {
            next(error);
        }
    }
}
