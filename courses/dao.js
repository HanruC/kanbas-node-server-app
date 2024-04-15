import courseModel from "./model.js";
export const findAllCourses = () => courseModel.find();
export const findCourseById = (id) => courseModel.findById(id);
export const findCourseByDepartment = (department) => 
    courseModel.find({ department });
export const findCourseByInstructor = (instructor) =>
    courseModel.find({ instructor });
export const createCourse = (course) => 
    courseModel.create(course);
export const updateCourse = (id, course) =>
    courseModel.updateOne({ _id: id }, { $set: course });
export const deleteCourse = (id) =>
    courseModel.deleteOne({ _id: id });