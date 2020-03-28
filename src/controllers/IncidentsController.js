const connection = require('../database/connection');
const tableName = 'incidents';

module.exports = {

    async index(request, response) {

        try {
            
            const { page = 1 } = request.params;

            const [{ count }] = await connection(tableName).count({count: '*'});

            const result = await connection(tableName)
                                 .join('ongs','ongs.id', '=', `${tableName}.ong_id`)
                                 .limit(5)
                                 .offset((page - 1) * 5)
                                 .select([ 
                                     `${tableName}.*`, 
                                     'ongs.name',
                                     'ongs.email',
                                     'ongs.whatsapp',
                                     'ongs.city',
                                     'ongs.uf'
                                    ]);
    
            response.header('X-Total-Count', count);

            return response.json(result);

        } catch (error) {
            return response.status(500).json({ error });
        }

    },

    async create(request, response) {

        try {

            const { title, description, value } = request.body;
            //const ong_id = request.headers.authorization;
            const { authorization } = request.headers;
    
            //Data validate
            if (authorization == null) response.status(400).json({ error: 'the headers.authorization be informed' })
            if (title == null) response.status(400).json({ error: 'the title must be informed' })
            if (description == null) response.status(400).json({ error: 'the description must be informed' })
            if (value == null) response.status(400).json({ error: 'the value must be informed' })

            const [ id ] = await connection(tableName).insert({
                title, 
                description, 
                value, 
                ong_id: authorization 
            });
            
            return response.json({ id });
            
        } catch (error) {
            return response.status(500).json({ error });
        }

    },

    async update(request, response) {

        try {
            
            var { title, description, value } = request.body;
            const { id } = request.params;
            const { authorization } = request.headers;
            
            //Data validate
            if (authorization == null) response.status(400).json({ error: 'the headers.authorization be informed' })

            const incidentFind = await connection(tableName).where({ id })
                                                            .andWhere({ ong_id: authorization })
                                                            .first();
            
            if (incidentFind == null){
                return response.status(404).json({ error: 'not found' });
            }
            
            //Verificando quais campos devem ser atualizados :)
            title = (title == null) ? incidentFind.title : title;
            description = (description == null) ? incidentFind.description : description;
            value = (value == null) ? incidentFind.value : value;
    
            await connection(tableName).where({ id: incidentFind.id }).update({
                title, 
                description, 
                value
            });
            
            return response.status(204).send();

        } catch (error) {
            return response.status(500).json({ error });
        }

    },

    async delete(request, response) {

        try {
            
            const { id } = request.params;
            const { authorization } = request.headers;

            //Data validate
            if (authorization == null) response.status(400).json({ error: 'the headers.authorization be informed' })
            
            const incidentFind = await connection(tableName).where({ id })
                                                            .andWhere({ ong_id: authorization })
                                                            .first();
            
            if (incidentFind == null){
                return response.status(404).json({ error: 'not found' });
            }
    
            await connection(tableName).where({ id: incidentFind.id }).delete();
            
            return response.status(204).send();

        } catch (error) {
            return response.status(500).json({ error });
        }

    }

};