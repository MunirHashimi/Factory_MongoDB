const ExpressError = require('../error/error');
const Ledger = require('../model/MongoLedger');

exports.index = async (req,res,next)=>{
    try {
        const ledgers = await Ledger.find();
        res.render('ledgers/index', { ledgers });
    } catch (error) {
        next(new ExpressError("Error happend in : ledgerController.index function"));  // Pass the error to your error middleware
    }
}

exports.createForm = (req, res,next) => {
    try {
        res.render('ledgers/create');
    } catch (error) {
        next(new ExpressError("Error happend in : ledgerController.createForm function"));  // Pass the error to your error middleware
    }
}

exports.create = async (req, res,next) => {
    try{
        const { customerName, phone , address } = req.body;
        await Ledger.create({customerName, phone , address});
        res.redirect('/ledger/index');
    }
    catch(error){
        next(new ExpressError("Error happend in : ledgerController.create function"));
    }
}

exports.show = async (req,res,next)=>{
    try{
        const ledger = await Ledger.findById(req.params.id);
        res.render('ledgers/show', { ledger });
    }
    catch(error){
        next(new ExpressError("Error happend in : ledgerController.show function"));  // Pass the error to your error middleware
}
}
exports.editForm = async (req, res,next) => {
    try {
        const ledger = await Ledger.findById(req.params.id);
        res.render('ledgers/edit', { ledger });
        
    } catch (error) {
        next(new ExpressError("Error happend in : ledgerController.editForm function"));  // Pass the error to your error middleware
    }
}
exports.edit = async (req, res,next) => {
    try {
        const { customerName, phone, address } = req.body;
        await Ledger.findByIdAndUpdate(
         req.params.id, { customerName, phone, address } 
    );
        res.redirect('/ledger/index');
    } catch (error) {
        next(new ExpressError("Error happend in : ledgerController.edit function"));  // Pass the error to your error middleware
    }
}
exports.destroy = async (req, res,next) => {
    try {
        await Ledger.findByIdAndDelete(req.params.id);
        res.redirect('/ledger/index');
    } catch (error) {
        next(new ExpressError("Error happend in : ledgerController.destroy function"));  // Pass the error to your error middleware
    }
}