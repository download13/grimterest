const users = [
	{
		id: 'bab2a452-6179-4914-87a8-f5169e42b729',
		email: 'download333@gmail.com',
		name: 'Erin',
		avatarUrl: 'https://www.gravatar.com/avatar/d859dbbfbcf31ca5d3a3aa975f8e7898'
	},
	{
		id: 'a0d0e4e4-019d-45a0-9648-8efe17400c53',
		name: 'Shane',
		email: 'test@example.org',
		avatarUrl: 'https://www.gravatar.com/avatar/0c17bf66e649070167701d2d3cd71711'
	}
];

const pins = [
	{
		id: 'ee284203-5723-4acf-acd7-92bd2562beec',
		"imageUrl": "https://s-media-cache-ak0.pinimg.com/236x/82/8f/db/828fdb9ef3de927ea879a53c03145ab0.jpg",
		"thumbUrl": "https://s-media-cache-ak0.pinimg.com/236x/82/8f/db/828fdb9ef3de927ea879a53c03145ab0.jpg",
		"text": "fish from spoons - so cool for a lake or ocean house as decor for curtain hooks, lots of things.",
		"postTime": 1452414557965
	},
	{
		id: '89f43854-1306-4e7e-8d7b-29e0cd4b2951',
		"imageUrl": "https://s-media-cache-ak0.pinimg.com/236x/5d/b8/ab/5db8ab59d570a9fed1dad229207fb9e0.jpg",
		"thumbUrl": "https://s-media-cache-ak0.pinimg.com/236x/5d/b8/ab/5db8ab59d570a9fed1dad229207fb9e0.jpg",
		"text": "Salvaged Leather and Lace pirate Key Steampunk Wrist Cuff",
		"postTime": 1452401265228
	},
	{
		id: 'eb9b0256-c500-47f3-a00d-ffff5fc1ad0d',
		"imageUrl": "https://s-media-cache-ak0.pinimg.com/236x/2f/8f/02/2f8f02eddddce5eda175190567dabff4.jpg",
		"thumbUrl": "https://s-media-cache-ak0.pinimg.com/236x/2f/8f/02/2f8f02eddddce5eda175190567dabff4.jpg",
		"text": "good idea for the leaning shelves - could use ikea frames",
		"postTime": 1452185933634
	},
	{
		id: 'e36f11c4-4cbb-4006-a94f-e410bd6bdb13',
		"imageUrl": "https://s-media-cache-ak0.pinimg.com/736x/34/82/db/3482dbd1de7acc01a9e5412311d427b7.jpg",
		"thumbUrl": "https://s-media-cache-ak0.pinimg.com/736x/34/82/db/3482dbd1de7acc01a9e5412311d427b7.jpg",
		"text": "Wizard of Oz - blue - Yellow Brick Road - 16\" Decorative Pillow Cushion Cover",
		"postTime": 1452617220864
	},
	{
		id: 'fa45ccd2-2995-4e0f-8f90-7d75eed50b1f',
		"imageUrl": "https://s-media-cache-ak0.pinimg.com/236x/18/46/f2/1846f2d8ddda359d6afb2c4b45e8cf9b.jpg",
		"thumbUrl": "https://s-media-cache-ak0.pinimg.com/236x/18/46/f2/1846f2d8ddda359d6afb2c4b45e8cf9b.jpg",
		"text": "Immune-Boosting Paleo Blueberry Smoothie- it is packed with protein from chia seeds and walnuts",
		"postTime": 1452116223567
	},
	{
		id: '8bc55fb7-6793-4595-8dfe-8996efaf5297',
		"imageUrl": "https://s-media-cache-ak0.pinimg.com/236x/5d/ed/33/5ded3390bc626be195761027da22e02b.jpg",
		"thumbUrl": "https://s-media-cache-ak0.pinimg.com/236x/5d/ed/33/5ded3390bc626be195761027da22e02b.jpg",
		"text": "This is a beautiful use of a tree trunk. Tree Trunk Planter",
		"postTime": 1452539941682
	},
	{
		id: '7fb083ea-6cf7-49aa-9b66-e528105a94c2',
		"imageUrl": "https://s-media-cache-ak0.pinimg.com/236x/7a/ee/89/7aee89a951fc3de41dad4430040a3fdc.jpg",
		"thumbUrl": "https://s-media-cache-ak0.pinimg.com/236x/7a/ee/89/7aee89a951fc3de41dad4430040a3fdc.jpg",
		"text": "Garlickly Kale Salad with Crispy Chick Peas by minimalistbaker: A simple, 30-minute kale salad with a creamy, roasted garlic dressing and tandoori roasted chickpeas. A healthy, hearty entree or side salad. #Salad #Kale #Chickpeas #Healthy",
		"postTime": 1452205239712
	},
	{
		id: '5fa94eec-fb8a-43ad-908d-ce9c597bf40a',
		"imageUrl": "https://s-media-cache-ak0.pinimg.com/236x/ff/69/c7/ff69c7317938ed6c84f7378163e5eec6.jpg",
		"thumbUrl": "https://s-media-cache-ak0.pinimg.com/236x/ff/69/c7/ff69c7317938ed6c84f7378163e5eec6.jpg",
		"text": "Woodland wedding decor, mason jar butterfly & moss lantern We can take out the butterfly for Kris' sake",
		"postTime": 1452378735179
	},
	{
		id: 'd5ed685f-a15e-499e-88dc-3cc9b2f31e05',
		"imageUrl": "https://s-media-cache-ak0.pinimg.com/236x/63/54/07/63540734063ab2d645140349b520de41.jpg",
		"thumbUrl": "https://s-media-cache-ak0.pinimg.com/236x/63/54/07/63540734063ab2d645140349b520de41.jpg",
		"text": "Blueberry banana bread - double the fruit and double the deliciousness! All the sweet slices will be gone before you know it.",
		"postTime": 1452395623814
	},
	{
		id: '801f4f0b-30b9-4bf2-b446-62c86a8b8e9b',
		"imageUrl": "https://s-media-cache-ak0.pinimg.com/236x/30/00/f9/3000f9417c6bf3c8303c3b63752b11fd.jpg",
		"thumbUrl": "https://s-media-cache-ak0.pinimg.com/236x/30/00/f9/3000f9417c6bf3c8303c3b63752b11fd.jpg",
		"text": "Creamy Pesto Pasta Recipe",
		"postTime": 1452118107077
	},
	{
		id: '5a861c10-4b27-4260-ae19-a6fd14856aad',
		"imageUrl": "https://s-media-cache-ak0.pinimg.com/236x/0b/ce/8a/0bce8af1757187e0055930400bec455a.jpg",
		"thumbUrl": "https://s-media-cache-ak0.pinimg.com/236x/0b/ce/8a/0bce8af1757187e0055930400bec455a.jpg",
		"text": "Turn your spice rack into a beautiful feature in your kitchen with these 10 DIY tutorials. #KitchenIdeas",
		"postTime": 1452553767488
	},
	{
		id: 'f2d1441c-e59c-4af6-9d8c-3fcc7cf650c9',
		"imageUrl": "https://s-media-cache-ak0.pinimg.com/236x/99/54/8d/99548defcec4e323da4fb1bed6c112bf.jpg",
		"thumbUrl": "https://s-media-cache-ak0.pinimg.com/236x/99/54/8d/99548defcec4e323da4fb1bed6c112bf.jpg",
		"text": "Love this. If I ever move to a Red Wood forrest, Amazing Tree House...wow!",
		"postTime": 1452280578466
	},
	{
		id: '53512e39-e620-4add-981f-feb695f9459a',
		"imageUrl": "https://s-media-cache-ak0.pinimg.com/236x/2b/c1/bb/2bc1bbbe47e06e6996a427102edb9d25.jpg",
		"thumbUrl": "https://s-media-cache-ak0.pinimg.com/236x/2b/c1/bb/2bc1bbbe47e06e6996a427102edb9d25.jpg",
		"text": "Armorama :: Modeling Flame for Flame Throwers by Don Franklin",
		"postTime": 1452410811810
	},
	{
		id: '5a49aac4-b2ff-4e46-a571-f35c712ce5e8',
		"imageUrl": "https://s-media-cache-ak0.pinimg.com/236x/2b/51/66/2b5166a3142fd7eb8e4d7a748e3e0723.jpg",
		"thumbUrl": "https://s-media-cache-ak0.pinimg.com/236x/2b/51/66/2b5166a3142fd7eb8e4d7a748e3e0723.jpg",
		"text": "Containing all shades of the rainbow, (and all the personalities) find your true hair color based on this quiz!",
		"postTime": 1452599663785
	},
	{
		id: '2d504e9e-11ee-4665-9d43-52fc53d35f0d',
		"imageUrl": "https://s-media-cache-ak0.pinimg.com/236x/01/a9/b6/01a9b62cfb087a58132b7f35648a1d79.jpg",
		"thumbUrl": "https://s-media-cache-ak0.pinimg.com/236x/01/a9/b6/01a9b62cfb087a58132b7f35648a1d79.jpg",
		"text": "Deep South Dish: Southern Cornmeal Hoe Cakes",
		"postTime": 1452619252684
	},
	{
		id: '4d6a02c2-75ed-4eeb-846f-5b4f7d849e13',
		"imageUrl": "https://s-media-cache-ak0.pinimg.com/236x/f1/f9/3b/f1f93b009722f4ce203042acc5cfa37c.jpg",
		"thumbUrl": "https://s-media-cache-ak0.pinimg.com/236x/f1/f9/3b/f1f93b009722f4ce203042acc5cfa37c.jpg",
		"text": "Shut up, Stuart!!",
		"postTime": 1452547874013
	},
	{
		id: '9fe0c1c0-7811-4c84-9ba0-6ad0e8f6f733',
		"imageUrl": "https://s-media-cache-ak0.pinimg.com/236x/f0/b8/3f/f0b83ff75c048a25507ba01994147efa.jpg",
		"thumbUrl": "https://s-media-cache-ak0.pinimg.com/236x/f0/b8/3f/f0b83ff75c048a25507ba01994147efa.jpg",
		"text": "The wonders of western inspired interiors........ - The Enchanted Home",
		"postTime": 1452101547468
	},
	{
		id: '1f0c9592-613f-46ab-ae6a-586b11f9773e',
		"imageUrl": "https://s-media-cache-ak0.pinimg.com/236x/e4/26/72/e426729fcfb61f1ccfb908f683c36957.jpg",
		"thumbUrl": "https://s-media-cache-ak0.pinimg.com/236x/e4/26/72/e426729fcfb61f1ccfb908f683c36957.jpg",
		"text": "Adrienne Kress's Blog - So You Want To Dress Steampunk... - November 26, 2012 10:59",
		"postTime": 1452258147840
	},
	{
		id: 'f884232d-5020-4d60-b6c4-e40ac222cb2f',
		"imageUrl": "https://s-media-cache-ak0.pinimg.com/236x/b6/91/81/b69181d6fdcbe79b24801a2efbf8a47f.jpg",
		"thumbUrl": "https://s-media-cache-ak0.pinimg.com/236x/b6/91/81/b69181d6fdcbe79b24801a2efbf8a47f.jpg",
		"text": "Blue Jay",
		"postTime": 1452403182036
	},
	{
		id: 'd7d96197-4668-4c7a-bbc3-325d2cdbb1b2',
		"imageUrl": "https://s-media-cache-ak0.pinimg.com/236x/69/7b/ac/697bacea3c071439f4e946173536b282.jpg",
		"thumbUrl": "https://s-media-cache-ak0.pinimg.com/236x/69/7b/ac/697bacea3c071439f4e946173536b282.jpg",
		"text": "15 Life-Changing Camping Hacks",
		"postTime": 1452278447326
	},
	{
		id: '19fdaac1-d60b-4a12-8cb8-1fb897c89632',
		"imageUrl": "https://s-media-cache-ak0.pinimg.com/236x/84/81/4f/84814f3ceb4032c9a26667e7715c12f3.jpg",
		"thumbUrl": "https://s-media-cache-ak0.pinimg.com/236x/84/81/4f/84814f3ceb4032c9a26667e7715c12f3.jpg",
		"text": "spooky atmospheric chilling surreal photographic art print , reminiscent of the art of magritte burt with a scarey feeling of bodies being taken away abduction against their will halloween art",
		"postTime": 1452035668618
	},
	{
		id: '0f7a869f-0c8b-448d-9a66-236ecc89d44f',
		"imageUrl": "https://s-media-cache-ak0.pinimg.com/236x/ee/c2/ac/eec2ac6979e583bb981c7b4d23396b09.jpg",
		"thumbUrl": "https://s-media-cache-ak0.pinimg.com/236x/ee/c2/ac/eec2ac6979e583bb981c7b4d23396b09.jpg",
		"text": "Check out my new place!",
		"postTime": 1452152039599
	}
];

const userPins = pins.map(item => {
	const user = users[Math.floor(Math.random() * users.length)];
	return {
		id: item.id,
		imageUrl: item.imageUrl,
		thumbUrl: item.thumbUrl,
		text: item.text,
		postTime: item.postTime,
		posterId: user.id
	};
});

exports.seed = knex =>
	knex('users')
		.del()
		.then(() => knex('users').insert(users))
		.then(() => knex('pins').del())
		.then(() => knex('pins').insert(userPins))
;
