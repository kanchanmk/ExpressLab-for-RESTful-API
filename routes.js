"use strict";

const express = require("express");
const routes = express.Router();

const cart_items = [
	{
		id: 1,
		product: "Fancy crayons",
		price: 0.99,
		quantity: 1,
	},
	{
		id: 2,
		product: "A 2inch binder",
		price: 1.99,
		quantity: 2,
	},
	{
		id: 3,
		product: "Fancy college ruled notebooks",
		price: 14.99,
		quantity: 8,
	},
	{
		id: 4,
		product: "Fancy file folders",
		price: 0.99,
		quantity: 5,
	},
	{
		id: 5,
		product: "A twistable crayons set",
		price: 8.99,
		quantity: 1,
	},
	{
		id: 6,
		product: "A 3 inch binder",
		price: 25.99,
		quantity: 2,
	},
	{
		id: 7,
		product: "Fancy graph notebooks",
		price: 14.99,
		quantity: 8,
	},
	{
		id: 8,
		product: "Fancy 3 pocket file folders",
		price: 10.99,
		quantity: 5,
	},
];

const getCartItemAt = (index) => {
	return cart_items[index];
};

let nextId = 5;

routes.get("/cart-items", (req, res) => {
	let maxprice = parseFloat(req.query.maxPrice);
	let prefix = req.query.prefix;
	let pageSize = parseInt(req.query.pageSize);
	let filterredArray = cart_items;

	console.log(
		"maxprice:" + maxprice + " prefix:" + prefix + " pageSize:" + pageSize
	);

	if (maxprice) {
		if (prefix) {
			filterredArray = cart_items.filter(
				(item) => item.product.startsWith(prefix) && item.price <= maxprice
			);
		} else {
			filterredArray = cart_items.filter((item) => item.price <= maxprice);
		}
	} else {
		if (prefix) {
			filterredArray = cart_items.filter((item) =>
				item.product.startsWith(prefix)
			);
		}
	}

	if (pageSize > 0) {
		filterredArray = filterredArray.slice(0, pageSize);
	}

	res.status(200);
	res.json(filterredArray);
});

routes.get("/cart-items/:id", (req, res) => {
	let id = parseInt(req.params.id);

	let found = cart_items.find((item) => item.id === id);
	if (found) {
		res.status(200);
		res.json(found);
	} else {
		res.status(404);
		res.send(`ID ${id} not found`);
	}
});

routes.post("/cart-items", (req, res) => {
	let item = req.body;
	item.id = nextId++;
	cart_items.push(item);

	res.status(201);
	res.json(item);
});

routes.put("/cart-items/:id", (req, res) => {
	let id = parseInt(req.params.id);

	let index = cart_items.findIndex((item) => item.id === id);

	// cart_items[index].product = req.body.product;
	// cart_items[index].price = Number(req.body.price);
	// cart_items[index].quantity = Number(req.body.quantity);

	cart_items[index] = req.body;
	cart_items[index].id = id;
	res.status(200);
	res.json(cart_items);
});

routes.delete("/cart-items/:id", (req, res) => {
	let id = req.params.id;

	let index = cart_items.findIndex((item) => {
		return item.id === parseInt(id);
	});

	cart_items.splice(index, 1);
	res.status(204);
	res.json();
});

module.exports = { routes };
