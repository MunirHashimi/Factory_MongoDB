const ExpressError = require('../error/error');
const Bill = require('../model/MongoBill');
const Ledger = require('../model/MongoLedger');
const Stock = require('../model/MongoStock');
const BillItem = require('../model/MongoBillitems');



exports.index = async (req, res,next) => {
  try {
   const bills = await Bill.find()
  .populate('ledger')
  .populate({ path: 'items', populate: { path: 'stock' }
  })
   res.render('bill/index', { bills }); 
  } catch (error) {
    next(new ExpressError("Error happend in : billController.index function"));  // Pass the error to your error middleware
  }
};

exports.createForm = async (req, res, next) => {
  try {
    const ledgers = await Ledger.find();
    const stocks = await Stock.find();  // make sure Stock is imported
    res.render('bill/create', { ledgers, stocks });
  } catch (error) {
    next(new ExpressError("Error happend in : billController.createForm function"));  // Pass the error to your error middleware
  }
};


exports.create = async (req, res, next) => {
  try {
    const { date, ledgerId, items } = req.body;
    const parsedItems = JSON.parse(items);

    // Create bill
    const bill = new Bill({ date, ledgerId });
    await bill.save();

    for (const item of parsedItems) {
      // Find stock
      const stock = await Stock.findOne({ 
        _id: item.stockId, 
        itemType: item.type, 
        thickness: item.size 
      });

      if (stock) {
        stock.quantity -= Number(item.quantity);
        await stock.save();
      }

      // Create BillItem
      const billItem = new BillItem({
        billId: bill._id,
        stockId: item.stockId,
        type: item.type,
        size: item.size,
        quantity: Number(item.quantity),
        bundle: Number(item.bundle),
        price: Number(item.price),
      });
      await billItem.save();
    }

    res.redirect("/bill/index");
  } catch (error) {
    console.error(error);
    next(new ExpressError("Error happened in : billController.create function"));
  }
};


exports.show = async (req, res, next) => {
  try {
    const billId = req.params.id;

    // Find bill and populate ledger and items
    const bill = await Bill.findById(billId)
      .populate('ledger')       // Ledger / Customer info
      .populate({
        path: 'items',          // Bill items
        populate: { path: 'stock' } // Optional: populate stock info inside each item
      });

    if (!bill) {
      return next(new ExpressError("Bill not found", 404));
    }

    res.render('bill/show', { bill });
  } catch (error) {
    console.error(error);
    next(new ExpressError("Error happened in : billController.show function"));
  }
};

exports.editForm = async (req, res,next) => {
  try {
    const bill = await Bill.findByPk(req.params.id, {
      include: [{ model: BillItem, as: 'items' }]
    });
    const ledgers = await Ledger.findAll();
    res.render('bill/edit', { bill, ledgers });
    
  } catch (error) {
      next(new ExpressError("Error happend in : billController.editForm function "));  // Pass the error to your error middleware

  }
};

exports.edit = async (req, res, next) => {
  try {
    const bill = await Bill.findByPk(req.params.id);
    await bill.update({
      date: req.body.date,
      ledgerId: req.body.ledgerId
    });

    // Optional: Update items (you can replace old items with new ones)
    await BillItem.destroy({ where: { billId: bill.id } });
    await BillItem.bulkCreate(
      req.body.items.map(item => ({ ...item, billId: bill.id }))
    );

    res.redirect('/bill/index');
  } catch (err) {
       next(new ExpressError("Error happend in : billController.edit function "));  // Pass the error to your error middleware
  }
};

exports.destroy = async (req, res) => {
  try {
    await Bill.destroy({ where: { id: req.params.id } });
    res.redirect('/bill/index');
  } catch (error) {
    next(new ExpressError("Error happend in : billController.destroy function "));  // Pass the error to your error middleware
  }
};
