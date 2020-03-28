const connection = require('../database/connection');
const tableName = 'incidents';

module.exports = {

    async index(request, response) {

        try {
            
            const { authorization } = request.headers;
            
            //Data validate
            if (authorization == null) response.status(400).json({ error: 'the headers.authorization must be informed' })

            const incidents = await connection(tableName).where({ ong_id: authorization });
    
            return response.json(incidents);

        } catch (error) {
            return response.status(500).json({ error });
        }
    }

};