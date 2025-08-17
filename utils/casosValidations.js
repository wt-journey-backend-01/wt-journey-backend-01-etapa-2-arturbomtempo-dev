const z = require('zod');
const { validate } = require('./errorHandler');

const newCasoValidation = (req, res, next) => {
    const newCaso = z.object({
        body: z.object({
            titulo: z.string({ error: 'Título obrigatório.' }).min(1, 'Título obrigatório.'),
            descricao: z.string({ error: 'Descrição obrigatória.' }).min(1, 'Descrição obrigatória.'),
            status: z.enum(['aberto', 'solucionado'], {
                error: (issue) =>
                    issue.input === undefined
                        ? 'Status obrigatório.'
                        : 'Status deve ser "aberto" ou "solucionado".',
            }),
            agente_id: z.string({ error: 'Agente responsável obrigatório.' }).min(1, 'Agente responsável obrigatório.'),
        }),
    });

    validate(newCaso, req);
    next();
};

const updateCasoValidation = (req, res, next) => {
    const updateCaso = z.object({
        body: z
            .looseObject({
                titulo: z.string({ error: 'Título obrigatório.' }).min(1, 'Título obrigatório.'),
                descricao: z.string({ error: 'Descrição obrigatória.' }).min(1, 'Descrição obrigatória.'),
                status: z.enum(['aberto', 'solucionado'], {
                    error: (issue) =>
                        issue.input === undefined
                            ? 'Status obrigatório.'
                            : 'Status deve ser "aberto" ou "solucionado".',
                }),
                agente_id: z.string({ error: 'Agente responsável obrigatório.' }).min(1, 'Agente responsável obrigatório.'),
            })
            .refine((data) => data.id === undefined, {
                error: 'Id não pode ser atualizado.',
            }),
    });

    validate(updateCaso, req);
    next();
};

const partialUpdateCasoValidation = (req, res, next) => {
    const updateCaso = z.object({
        body: z
            .strictObject(
                {
                    titulo: z.optional(z.string().min(1, 'Título não pode ser vazio.')),
                    descricao: z.optional(z.string().min(1, 'Descrição não pode ser vazia.')),
                    status: z.optional(
                        z.enum(['aberto', 'solucionado'], {
                            error: 'Status deve ser "aberto" ou "solucionado".',
                        })
                    ),
                    agente_id: z.optional(
                        z.string().min(1, 'Agente responsável não pode ser vazio.')
                    ),
                },
                {
                    error: (err) => {
                        if (err.keys.length > 0) {
                            return `Campos inválidos para a entidade caso: ${err.keys.join(', ')}.`;
                        }
                        return err;
                    },
                }
            )
            .refine((data) => data.id === undefined, {
                error: 'Id não pode ser atualizado.',
            }),
    });

    validate(updateCaso, req);
    next();
};

module.exports = {
    newCasoValidation,
    updateCasoValidation,
    partialUpdateCasoValidation,
};
