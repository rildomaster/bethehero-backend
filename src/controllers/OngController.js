const connection = require('../database/connection');
const crypto = require('crypto');
const tableName = 'ongs';

module.exports = {

    async index(request, response) {

        try {
            
            const result = await connection(tableName);
            //const result = await connection(tableName).select('*');
        
            return response.json(result);

        } catch (error) {
            return response.status(500).json({ error });
        }

    },

    async create(request, response) {

        try {
            
            //const data = request.body;
            const { name, email, whatsapp, city, uf } = request.body;
            const id = crypto.randomBytes(4).toString('HEX');
        
            //Data validate
            if (name == null) response.status(400).json({ error: 'the name must be informed' })
            if (email == null) response.status(400).json({ error: 'the email must be informed' })
            if (whatsapp == null) response.status(400).json({ error: 'the whatsapp must be informed' })
            if (city == null) response.status(400).json({ error: 'the name city be informed' })
            if (uf == null) response.status(400).json({ uf: 'the name city be informed' })

            await connection(tableName).insert({
                id,
                name,
                email,
                whatsapp,
                city,
                uf
            });
        
            return response.json({ id });

        } catch (error) {
            return response.status(500).json({ error });
        }
    },

    async update(request, response) {
        
        try {
            
            var { name, email, whatsapp, city, uf } = request.body;
            const { id } = request.params;
    
            const ongFind = await connection(tableName).where({ id }).first();
            if (ongFind == null) {
                return response.status(404).json({ error: 'not found' });
            }
    
            name = (name == null) ? ongFind.name : name;
            email = (email == null) ? ongFind.email : email;
            whatsapp = (whatsapp == null) ? ongFind.whatsapp : whatsapp;
            city = (city == null) ? ongFind.city : city;
            uf = (uf == null) ? ongFind.uf : uf;
        
            await connection(tableName).where({ id: ongFind.id }).update({
                name,
                email,
                whatsapp,
                city,
                uf
            });
        
            return response.status(204).send();

        } catch (error) {
            return response.status(500).json({ error });
        }

    },

    async delete(request, response) {

        try {
            
            const { id } = request.params;
    
            const ongFind = await connection(tableName).where({ id }).first();
            if (ongFind == null) {
                return response.status(404).json({ error: 'not found' });
            }
    
            await connection(tableName).where({ id: ongFind.id }).delete();
        
            return response.status(204).send();

        } catch (error) {
            return response.status(500).json({ error });
        }
    }

};