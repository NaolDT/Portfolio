
const createSingletonController = (Model) => {
  const get = async (req, res) => {
    try {
      let doc = await Model.findOne();
      if (!doc) doc = await Model.create({});
      res.json(doc);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const update = async (req, res) => {
    try {
      let doc = await Model.findOne();
      if (!doc) {
        doc = await Model.create(req.body);
      } else {
        Object.assign(doc, req.body);
        await doc.save();
      }
      res.json(doc);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  return { get, update };
};

module.exports = createSingletonController;