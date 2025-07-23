import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API do Departamento de Polícia',
            version: '1.0.0',
            contact: {
                name: 'Matheus Alencar da Silva',
                email: 'matheusalencar6942@gmail.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desenvolvimento',
            },
        ],
        components: {
            schemas: {
                Caso: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            example: 'a4e517b1-06f0-41d5-b65c-8989cea53db9',
                        },
                        titulo: {
                            type: 'string',
                            example: 'Homicídio',
                        },
                        descricao: {
                            type: 'string',
                            example:
                                'Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos',
                        },
                        status: {
                            type: 'string',
                            enum: ['aberto', 'fechado'],
                            example: 'aberto',
                        },
                        agente_id: {
                            type: 'string',
                            format: 'uuid',
                            example: '85db22b5-d93f-40f2-aade-229ff6096657',
                        },
                    },
                },
                NovoCaso: {
                    type: 'object',
                    properties: {
                        titulo: {
                            type: 'string',
                            example: 'Homicídio',
                        },
                        descricao: {
                            type: 'string',
                            example:
                                'Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos',
                        },
                        status: {
                            type: 'string',
                            enum: ['aberto', 'fechado'],
                            example: 'aberto',
                        },
                        agente_id: {
                            type: 'string',
                            format: 'uuid',
                            example: '85db22b5-d93f-40f2-aade-229ff6096657',
                        },
                    },
                },
                Agente: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            example: 'a4e517b1-06f0-41d5-b65c-8989cea53db9',
                        },
                        nome: {
                            type: 'string',
                            example: 'Carlos Meireles',
                        },
                        dataDeIncorporacao: {
                            type: 'string',
                            format: 'date',
                            example: '2025-07-22',
                        },
                        cargo: {
                            type: 'string',
                            example: 'delegado',
                        },
                    },
                },
                NovoAgente: {
                    type: 'object',
                    properties: {
                        nome: {
                            type: 'string',
                            example: 'Carlos Meireles',
                        },
                        dataDeIncorporacao: {
                            type: 'string',
                            format: 'date',
                            example: '2025-07-22',
                        },
                        cargo: {
                            type: 'string',
                            example: 'delegado',
                        },
                    },
                },
            },
        },
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default (app) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
