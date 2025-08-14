exports.up = function(knex) {
  return knex.schema
    .createTable('agentes', function (table) {
      table.increments('id').primary();
      table.string('nome', 255).notNullable();
      table.date('dataDeIncorporacao').notNullable();
      table.string('cargo', 100).notNullable();
    })
    .then(() => {
      return knex.schema.createTable('casos', function (table) {
        table.increments('id').primary();
        table.string('titulo', 255).notNullable();
        table.text('descricao').notNullable();
        table.enu('status', ['aberto', 'solucionado', 'arquivado']).defaultTo('aberto');
        table.date('data_abertura').defaultTo(knex.fn.now());
        table.integer('agente_id').unsigned().references('id').inTable('agentes').onDelete('CASCADE');
        ('CASCADE');
      });
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('casos')
    .dropTableIfExists('agentes');
};