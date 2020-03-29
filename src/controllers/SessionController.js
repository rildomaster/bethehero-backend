const connection = require('../database/connection');
const tableName = 'ongs';

module.exports = {

    async create(request, response) {

        try {
            
            const { id } = request.body;

            //Data validate
            if (id == null) response.status(400).json({ error: 'the [id] must be informed' })

            const ong = await connection(tableName).where({ id }).select('name').first();
            if (ong == null) {
                return response.status(404).json({ error: 'no ONG found with this ID.' });
            }
    
            return response.json(ong);

        } catch (error) {
            return response.status(500).json({ error });
        }

    }

};