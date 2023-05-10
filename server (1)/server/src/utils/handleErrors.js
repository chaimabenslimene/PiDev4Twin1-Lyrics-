function handleErrors(err, res) {
  // console.log(err.message);
  switch (err.name) {
    case 'ValidationError':
      return res.status(422).send(err.message);
    case 'CastError' || 'ValidationError':
      return res.status(422).send(err.message);

    default:
      return res.sendStatus(500);
  }
}

module.exports = handleErrors;
