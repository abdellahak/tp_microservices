import Absence from "../models/absence.js";

export const create_absence = (req, res) => {
  const { studentId, date, comment, status } = req.body;
  const absence = new Absence({
    studentId,
    date,
    comment,
    status,
  });

  absence
    .save()
    .then((abs) =>
      res.status(201).json({ message: "Absence created successfully!" })
    )
    .catch((error) =>
      res.status(500).json({ message: "Error : can not add this absence "+ error.message})
    );
};

export const getAbsences = (req, res) => {
  Absence.find()
    .then((absences) => {
      if (absences.length === 0) {
        return res.status(404).json({ message: "No absences found" });
      }
      res.status(200).json(absences);
    })
    .catch((error) =>
      res.status(500).json({ message: "Error : can not get absences "+ error.message})
    );
}

