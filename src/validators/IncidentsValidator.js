const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {

    create() {
        return celebrate({
            [Segments.HEADERS]: Joi.object({
                authorization: Joi.string().required()
            }).unknown(),
            [Segments.BODY]: Joi.object().keys({
                title: Joi.string().required(),
                description: Joi.string().required(),
                value: Joi.number().required()
            })
        });
    },

    update() {
        return celebrate({
            [Segments.HEADERS]: Joi.object({
                authorization: Joi.string().required()
            }).unknown(),
            [Segments.BODY]: Joi.object().keys({
                title: Joi.string().allow(''),
                description: Joi.string().allow(''),
                value: Joi.number()
            })
        });
    },

    delete() {
        return celebrate({
            [Segments.HEADERS]: Joi.object({
                authorization: Joi.string().required()
            }).unknown()
        });
    }

};