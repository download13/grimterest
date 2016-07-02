exports.up = knex => {
	return knex.schema
		.createTable('users', table => {
			table.uuid('id');
			table.string('name');
			table.string('email');
			table.string('avatarUrl');
		})
		.createTable('pins', table => {
			table.uuid('id');
			table.uuid('posterId');
			table.uuid('poster').references('users.id');
			table.text('imageUrl');
			table.text('thumbUrl');
			table.text('text');
			table.timestamp('postTime');
		});
};

exports.down = knex => {};
