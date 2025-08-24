import Department from "../models/Department.js";
import Program from "../models/Program.js";

// Add a program to department
export const addProgramToDepartment = async (req, res) => {
  const { id } = req.params; // department ID
  const { program_name, description } = req.body;

  try {
    const department = await Department.findById(id);
    if (!department)
      return res
        .status(404)
        .json({ success: false, message: "Department not found" });

    const program = new Program({ program_name, description, department: id });
    await program.save();

    return res.status(201).json({ success: true, program });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
// Get all programs
export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find().populate("department");

    return res.status(200).json({ success: true, programs });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
// Get all programs by department
export const getProgramsByDepartment = async (req, res) => {
  const { id } = req.params; // department ID
  try {
    const programs = await Program.find({ department: id });
    return res.status(200).json({ success: true, programs });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
// Get  programs by id
export const getProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const program = await Program.findById({ _id: id }).populate("department");
    return res.status(200).json({ success: true, program: program });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get Program server error" });
  }
};
// Edit program
export const editProgram = async (req, res) => {
  const { programId } = req.params;
  const { program_name, description, department } = req.body;

  try {
    const program = await Program.findByIdAndUpdate(
      programId,
      { program_name, description, department },
      { new: true }
    );
    if (!program)
      return res
        .status(404)
        .json({ success: false, message: "Program not found" });

    return res.status(200).json({ success: true, program });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Delete program
export const deleteProgram = async (req, res) => {
  try {
    const { programId } = req.params;

    const deleteProgm = await Program.findById({ _id: programId });
    await deleteProgm.deleteOne();
    return res.status(200).json({ success: true, deleteProgm });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
