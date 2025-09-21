const Stock = require('../model/mongoStock');

exports.index = async (req,res)=>{
    const stocks = await Stock.find();
    res.render('stocks/index', { stocks });
}

exports.createForm = (req, res) => {
    res.render('stocks/create');
}


exports.create = async (req, res) => {
    const { itemName, itemType ,thickness, quantity } = req.body;
    await Stock.create({itemName, itemType ,thickness, quantity});
    res.redirect('/stock/index');
}

exports.show = async (req,res)=>{
    const stock = await Stock.findById(req.params.id);
    res.render('stocks/show', { stock });
}

exports.editForm = async (req, res) => {
    const stock = await Stock.findById(req.params.id);
    res.render('stocks/edit', { stock });
}
exports.edit = async (req, res) => {
         const { itemName, itemType, thickness, quantity } = req.body;
         const stock = await Stock.findByIdAndUpdate(req.params.id,
        {itemName, itemType ,thickness, quantity}
    );
    res.redirect('/stock/index');
}
exports.destroy = async (req, res) => {
    const stock = await Stock.findByIdAndDelete(req.params.id);
    res.redirect('/stock/index');
}