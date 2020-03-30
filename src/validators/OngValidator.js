const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {

    create() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().required().email(),
                whatsapp: Joi.string().required(),
                city: Joi.string().required().error(new Error('cidade is required')),
                uf: Joi.string().required().length(2)
            })
        });
    },

    update() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                name: Joi.string().allow(''),
                email: Joi.string().allow('').email(),
                whatsapp: Joi.string().allow(''),
                city: Joi.string().allow(''),
                uf: Joi.string().allow('').length(2)
            })
        });
    }

};