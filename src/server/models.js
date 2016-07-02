import * as knexConfig from '../../knexfile';
import createKnex from 'knex';
import {Model} from 'objection';


const DEV = process.env.NODE_ENV !== 'production';

Model.knex(createKnex(DEV ? knexConfig.development : knexConfig.production));

export class User extends Model {
	static tableName = 'users';

	static jsonSchema = {
		type: 'object',
		required: ['id', 'email'],
		properties: {
			id: {type: 'string'},
			name: {type: 'string'},
			email: {type: 'email'},
			avatarUrl: {type: 'uri'}
		}
	};

	static relationMappings = {
		posts: {
			relation: Model.HasManyRelation,
			modelClass: Pin,
			join: {
				from: 'users.id',
				to: 'pins.poster'
			}
		}
	};
}

export class Pin extends Model {
	static tableName = 'pins';

	static jsonSchema = {
		type: 'object',
		required: ['id', 'postTime'],
		properties: {
			id: {type: 'string'},
			imageUrl: {type: 'uri'},
			text: {type: 'string'},
			postTime: {type: 'integer'},
			posterId: {type: 'string'}
		}
	};

	static relationMappings = {
		poster: {
			relation: Model.BelongsToOneRelation,
			modelClass: User,
			join: {
				from: 'pins.posterId',
				to: 'users.id'
			}
		}
	};

	poster() {
		return this.belongsTo(User, 'poster');
	}
}

User.relationMappings.posts.modelClass = Pin;
