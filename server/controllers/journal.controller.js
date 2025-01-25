const { Journal } = require("../schemas/routine.schema");
const User = require("../schemas/user.schema");
const generateDate = require("../lib/utils");

const addJournal = async (req, res) => {
  const { userId } = req.userData;
  const { title, description, mood } = req.body;
  const date = generateDate();
    const journals = await Journal.create({
    title: title,
    description: description,
    createdAt: date,
    mood:mood,
    user: userId,
  });
  await User.findByIdAndUpdate(
    userId,
    { $push: { journals: journals._id } },
    { new: true }
  )

  return res.status(201).json({
    journal: journals,
    message: "Journal created successfully",
  });
};

const getJournals = async (req, res) => {
  const { userId } = req.userData;
  const populateJournals = await User.findById(userId).populate("journals");
  if (populateJournals.journals.length == 0)
    return res.json({ message: "No Journals are added yet" });
  res.json({ journals: populateJournals.journals });
};

const updateJournal = async (req, res) => {
  const id = req.query.id;
  const data = req.body;
  const updatedJournal = await Journal.findByIdAndUpdate(
    id,
    { ...data },
    { new: true }
  );
  res.json(updatedJournal);
};

const deleteJournal = async (req, res) => {
  const id = req.query.id;
  const { userId } = req.userData;
  const updated = await User.findByIdAndUpdate(
    userId,
    { $pull: { journals: id } },
    { new: true }
  );
  const deletedJournal = await Journal.findByIdAndDelete(id);
  res.status(200).json({ updated, deletedJournal,"message":"Journal Deleted" });
};

module.exports = { addJournal,getJournals,updateJournal,deleteJournal };
