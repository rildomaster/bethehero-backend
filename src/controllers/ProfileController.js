const connection = require('../database/connection');
const tableName = 'incidents';

module.exports = {

    async index(request, response) {

        try {
            
            const { authorization } = request.headers;

            const incidents = await connection(tableName).where({ ong_id: authorization });
    
            return response.json(incidents);

        } catch (error) {
            return response.status(500).json({ message: error });
        }
    }

};