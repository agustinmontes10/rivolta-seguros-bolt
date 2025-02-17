import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const data = req.body;
            // Procesa los datos del webhook aquí
            console.log('Webhook recibido:', data);

            res.status(200).json({ message: 'Webhook recibido correctamente' });
        } catch (error) {
            console.error('Error procesando el webhook:', error);
            res.status(500).json({ message: 'Error procesando el webhook' });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}