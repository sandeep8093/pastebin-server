const Pastes=require("../models/Paste");

exports.getPaste = async (req, res) => {
  try {
    const pasteMessages = await Pastes.findOne({ idx: req.params.idx,user:req.user });
    res.status(200).json(pasteMessages);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.getPastes = async (req, res) => {
  try {
    const pasteMessages = await Pastes.find({ user:req.user });
    res.status(200).json(pasteMessages);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.getAllPastes = async (req, res) => {
  try {
    const pasteMessages = await Pastes.find();
    res.status(200).json(pasteMessages);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.createPaste = async (req, res) => {
  
 // console.log(newPaste);
  try {
    const newPaste = Pastes(req.body);
    // Check if ID already exists
    newPaste.userId=req.user.id
    const pasteMessages = await Pastes.findOne({ idx: req.body.idx ,userId:req.user.id});

    if (pasteMessages) {
      console.log("Exists");
      throw new Error("pasteid-exists");
    } else {
      await newPaste.save();
      res.status(201).json(newPaste);
    }
  } catch (error) {
    console.log(error);
    res.status(409).send(error.message);
  }
};

exports.editPaste = async (req, res) => {

  try {
    const editedPaste = req.body;
    Pastes.findOneAndUpdate({ idx: req.params.idx ,userId:req.user.id}, editedPaste, function (err, doc) {
      if (err) return res.status(500).send({ error: err });

      if (doc) return res.status(200).send('Succesfully saved.');
      return res.status(404).send('Document not found.');
    });

  } catch (error) {
    res.status(409).send(error.message);
  }
};

exports.deletePaste = (req, res) => {
  try {
    Pastes.findOneAndDelete({ idx: req.params.idx,userId:req.user.id }, function (err, doc) {
      if (err) return res.status(500).send({ error: err });

      if (doc) return res.status(202).json("Successfully deleted");
      return res.status(404).send('Document not found.');
    });
  } catch (error) {
    res.status(409).send(error.message);
  }
};
