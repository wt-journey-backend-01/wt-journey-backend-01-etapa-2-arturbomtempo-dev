const { z } = require('zod');

const agenteSchema = z.object({
  nome: z.string({ required_error: "Campo 'nome' é obrigatório." }),
  dataDeIncorporacao: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Campo dataDeIncorporacao deve seguir a formatação 'YYYY-MM-DD' ",
  }),
  cargo: z.enum(["inspetor", "delegado"], {
    errorMap: () => ({ message: "Campo 'cargo' deve ser 'inspetor' ou 'delegado'" }),
  }),
});

const casoSchema = z.object({
  titulo: z.string({ required_error: "Campo 'titulo' é obrigatório." }),
  descricao: z.string({ required_error: "Campo 'descricao' é obrigatório." }),
  status: z.enum(["aberto", "solucionado"], {
    errorMap: () => ({
      message: "O campo 'status' pode ser somente 'aberto' ou 'solucionado' ",
    }),
  }),
  agente_id: z.string().uuid({ message: "Campo 'agente_id' deve ser um UUID válido" }),
});

module.exports = { agenteSchema, casoSchema };