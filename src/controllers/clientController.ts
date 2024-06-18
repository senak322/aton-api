import { Request, Response } from 'express';
import { Client } from '../models/Client';

interface CustomRequest extends Request {
    user?: { fullName: string }; // Define the user property with its expected structure
}

export const getClients = async (req: CustomRequest, res: Response) => {
    try {
        const clients = await Client.find({ responsiblePerson: req.user!.fullName });
        res.status(200).json(clients);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateClientStatus = async (req: CustomRequest, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const client = await Client.findByIdAndUpdate(id, { status }, { new: true });
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.status(200).json(client);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
