const Account = require("../../models/account.model");
const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");
const md5 = require('md5');



//[GET] /admin/accounts

module.exports.index = async (req, res) => {
	let find = {
		deleted: false
	};

	const records = await Account.find(find).select("-password -token");

	for (const record of records) {
		const role = await Role.findOne({
			_id: record.role_id,
			deleted: false
		});
		record.role = role;
	}


	res.render("admin/pages/accounts/index.pug", {
		pageTitle: "Danh sách tài khoản",
		records: records,
	});
}

//[GET] /admin/accounts/create

module.exports.create = async (req, res) => {
	const roles = await Role.find({
		deleted: false
	});

	res.render("admin/pages/accounts/create.pug", {
		pageTitle: "Tạo mới tài khoản",
		roles: roles
	});
}

//[POST] /admin/accounts/create

module.exports.createPost = async (req, res) => {
	const emailExist = await Account.findOne({
		email: req.body.email,
		deleted: false
	});

	if (emailExist) {
		req.flash('error', `Email đã tồn tại!`);
		res.redirect(req.get('referer') || '/');
	} else {
		req.body.password = md5(req.body.password);

		const record = new Account(req.body);
		await record.save();

		res.redirect(`${systemConfig.prefixAdmin}/accounts`);
	}
}

//[GET] /admin/accounts/edit/:id

module.exports.edit = async (req, res) => {
	let find = {
		_id: req.params.id,
		deleted: false,
	};

	try {
		const data = await Account.findOne(find);

		const roles = await Role.find({
			deleted: false
		});

		res.render("admin/pages/accounts/edit.pug", {
			pageTitle: "Chỉnh sửa tài khoản",
			data: data,
			roles: roles
		});
	} catch (error) {
		res.redirect(`${systemConfig.prefixAdmin}/accounts`);
	}
};


//[PATCH] /admin/accounts/edit/:id

module.exports.editPatch = async (req, res) => {
	const id = req.params.id;

	const emailExist = await Account.findOne({
		_id: { $ne: id },
		email: req.body.email,
		deleted: false
	});

	if (emailExist) {
		req.flash('error', `Email đã tồn tại!`);
	} else {
		if (req.body.password) {
			req.body.password = md5(req.body.password);
		} else {
			delete req.body.password;
		}

		await Account.updateOne({ _id: id }, req.body);

		req.flash('success', `Cập nhật thành công!`);
	}

	res.redirect(req.get('referer') || '/');
}

// [DELETE] /admin/products/delete/:id

module.exports.deleteItem = async (req, res) => {
	const id = req.params.id;

	// await Product.deleteOne({ _id: id });
	await Account.updateOne(
		{ _id: id },
		{
			deleted: true,
			deletedAt: new Date(),
		});

	res.redirect(req.get('referer') || '/');
};


// [PATCH] /admin/products/change-status/:status/:id

module.exports.changeStatus = async (req, res) => {
	const status = req.params.status;
	const id = req.params.id;

	// const updatedBy = {
	// 	account_id: res.locals.user.id,
	// 	updatedAt: new Date()
	// }

	await Account.updateOne({ _id: id }, {
		status: status,
		// $push: { updatedBy: updatedBy }
	});

	req.flash('success', 'Cập nhật trạng thái thành công!');

	res.redirect(req.get('referer') || '/');
};

// [GET] /admin/products/detail/:id

module.exports.detail = async (req, res) => {
	try {
		const find = {
			deleted: false,
			_id: req.params.id
		};

		const account = await Account.findOne(find).select("-password -token");

		const role = await Role.findOne({
			_id: account.role_id,
			deleted: false
		});
		account.role = role;



		res.render("admin/pages/accounts/detail", {
			pageTitle: account.title,
			account: account,
		});

	} catch (error) {
		req.flash('error', `Không tồn tại sản phẩm này!`);
		res.redirect(`${systemConfig.prefixAdmin}/accounts`);
	}
};