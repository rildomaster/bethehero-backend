const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {

    create() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().required().email(),
                whatsapp: Joi.number().required(),
                city: Joi.string().required(),
                uf: Joi.string().required().length(2)
            })
        });
    },

    update() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                name: Joi.string().allow(''),
                email: Joi.string().allow('').email(),
                whatsapp: Joi.number().allow(''),
                city: Joi.string().allow(''),
                uf: Joi.string().allow('').length(2)
            })
        });
    }

};