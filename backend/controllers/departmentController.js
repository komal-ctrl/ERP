import Department from "../models/Department.js";
import connectToDatabase from "../db/db.js";
const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get departments server error" });
  }
};

const addDepartment = async (req, res) => {
  connectToDatabase();
  try {
    const { dep_name, description } = req.body;
    const newDepartment = new Department({
      dep_name,
      description,
    });
    await newDepartment.save();
    return res.status(200).json({ success: true, department: newDepartment });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "add department server error" });
  }
};
const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById({ _id: id });
    console.log(department);

    return res.status(200).json({ success: true, department: department });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
const editDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;
    const updateDep = await Department.findByIdAndUpdate(
      { _id: id },
      {
        dep_name: dep_name,
        description: description,
      }
    );
    return res.status(200).json({ success: true, updateDep });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "edit department server error" });
  }
};
const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteDep = await Department.findById({ _id: id });
    await deleteDep.deleteOne();
    return res.status(200).json({ success: true, deleteDep });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
export {
  addDepartment,
  getDepartments,
  editDepartment,
  getDepartment,
  deleteDepartment,
};
