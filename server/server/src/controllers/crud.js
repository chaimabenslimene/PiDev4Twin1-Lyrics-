const handleErrors = require('../utils/handleErrors');

async function del(req, res, Collection) {
  const { id } = req.params;
  try {
    (await Collection.findByIdAndDelete(id))
      ? res.send(200)
      : res.sendStatus(204);
  } catch (err) {
    handleErrors(err, res);
  }
}

async function getAll(req, res, Collection) {
  try {
    res.send(await Collection.find());
  } catch (err) {
    handleErrors(err, res);
  }
}

async function getOne(req, res, Collection) {
  const { id } = req.params;
  try {
    res.send(await Collection.findById(id));
  } catch (err) {
    handleErrors(err, res);
  }
}

async function update(req, res, Collection) {
 // const { id } = req.body.id;
  try {
    (await Collection.findByIdAndUpdate({_id:req.body.id}, req.body, {new:true}))
      ? res.send('updated')
      : res.sendStatus(204);
  } catch (err) {
    handleErrors(err, res);
  }
}

async function create(req, res, Collection, criteria) {
  try {
    criteria && (await Collection.findOne(criteria))
      ? res.sendStatus(409)
      : (await Collection.create(req.body)) && res.sendStatus(201);
  } catch (err) {
    handleErrors(err, res);
  }
}

module.exports = {
  delete: del,
  getOne,
  getAll,
  update,
  create,
};
