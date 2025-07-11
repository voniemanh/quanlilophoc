import { useState, useEffect } from 'react';
import './index.css';

const dataClass = [
  { id: 1, name: "Math 101", teacher: "Mr. Smith" },
  { id: 2, name: "English 202", teacher: "Ms. Johnson" },
  { id: 3, name: "Physics 303", teacher: "Dr. Brown" },
  { id: 4, name: "Chemistry 404", teacher: "Ms. Davis" },
  { id: 5, name: "Biology 505", teacher: "Mr. Miller" },
  { id: 6, name: "History 101", teacher: "Mrs. Wilson" },
  { id: 7, name: "Geography 202", teacher: "Mr. Moore" },
  { id: 8, name: "Computer Science", teacher: "Dr. Taylor" },
  { id: 9, name: "Art & Design", teacher: "Ms. Anderson" },
  { id: 10, name: "Music 101", teacher: "Mr. Thomas" },
];

const dataStudent = [
  { id: 1, name: "Alice", classId: 1, age: 18, score: 8.2 },
  { id: 2, name: "Bob", classId: 2, age: 19, score: 7.5 },
  { id: 3, name: "Charlie", classId: 3, age: 18, score: 6.8 },
  { id: 4, name: "David", classId: 4, age: 20, score: 8.0 },
  { id: 5, name: "Eve", classId: 5, age: 18, score: 9.1 },
  { id: 6, name: "Frank", classId: 6, age: 19, score: 7.0 },
  { id: 7, name: "Grace", classId: 7, age: 21, score: 8.5 },
  { id: 8, name: "Hannah", classId: 8, age: 20, score: 6.4 },
  { id: 9, name: "Isaac", classId: 9, age: 18, score: 7.2 },
  { id: 10, name: "Jack", classId: 10, age: 19, score: 8.8 },
];

function App() {
  const [classes, setClasses] = useState(() => {
  const stored = localStorage.getItem("classes");
  return stored ? JSON.parse(stored) : dataClass;
  });
  const [students, setStudents] = useState(() => {
    const stored = localStorage.getItem("students");
    return stored ? JSON.parse(stored) : dataStudent;
  });

  useEffect(() => {
  localStorage.setItem("classes", JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const handleAdd = (type, data) => {
    if (type === "class") {
      setClasses([...classes, { ...data, id: (classes.length+1)}]);
    } else if (type === "student") {
      setStudents([...students, { ...data, id:(students.length+1) }]);
    }
  };

  const handleEdit = (type, index, data) => {
    if (type === "class") {
      const updated = [...classes];
      updated[index] = data;
      setClasses(updated);
    } else if (type === "student") {
      const updated = [...students];
      updated[index] = data;
      setStudents(updated);
    }
  };

  const handleDelete = (type, index) => {
    if (type === "class") {
      const updated = [...classes];
      updated.splice(index, 1);
      setClasses(updated);
    } else if (type === "student") {
      const updated = [...students];
      updated.splice(index, 1);
      setStudents(updated);
    }
  };

  return (
    <div>
      <h1>Danh sách lớp học</h1>
      <ClassList classes={classes} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
      <h2>Danh sách học sinh</h2>
      <StudentList students={students} classes={classes} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

function ClassList({ classes, onAdd, onEdit, onDelete }) {
  const [newClass, setNewClass] = useState({ name: "", teacher: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({ name: "", teacher: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd("class", newClass);
    setNewClass({ name: "", teacher: "" });
  };

  return (
    <>
      <form className="input-group" onSubmit={handleSubmit}>
        <input value={newClass.name} onChange={(e) => setNewClass({ ...newClass, name: e.target.value })} placeholder="Tên lớp" />
        <input value={newClass.teacher} onChange={(e) => setNewClass({ ...newClass, teacher: e.target.value })} placeholder="Giáo viên" />
        <button className='btn-add' type="submit">Thêm</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên lớp</th>
            <th>Giáo viên</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls, index) => (
            <tr key={cls.id}>
              <td>{cls.id}</td>
              <td>
                {editIndex === index ? (
                  <input value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                ) : (
                  cls.name
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input value={editData.teacher} onChange={(e) => setEditData({ ...editData, teacher: e.target.value })} />
                ) : (
                  cls.teacher
                )}
              </td>
              <td className='btn-group'>
                {editIndex === index ? (
                  <button onClick={() => { onEdit("class", index, { ...cls, ...editData }); setEditIndex(null); }}>Lưu</button>
                ) : (
                  <button onClick={() => { setEditIndex(index); setEditData({ name: cls.name, teacher: cls.teacher }); }}>Sửa</button>
                )}
                <button onClick={() => onDelete("class", index)}>Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function StudentList({ students, classes, onAdd, onEdit, onDelete }) {
  const [newStudent, setNewStudent] = useState({ name: "", age: "", score: "", classId: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({ name: "", age: "", score: "", classId: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd("student", { ...newStudent, classId: parseInt(newStudent.classId) });
    setNewStudent({ name: "", age: "", score: "", classId: "" });
  };

  return (
    <>
      <form className="input-group" onSubmit={handleSubmit}>
        <input type="text" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} placeholder="Tên học sinh" />
        <input type="number" value={newStudent.age} onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })} placeholder="Tuổi" />
        <input type="number" value={newStudent.score} onChange={(e) => setNewStudent({ ...newStudent, score: e.target.value })} placeholder="Điểm" />
        <select value={newStudent.classId} onChange={(e) => setNewStudent({ ...newStudent, classId: e.target.value })}>
          <option value="">Chọn lớp</option>
          {classes.map((cls) => <option key={cls.id} value={cls.id}>{cls.name}</option>)}
        </select>
        <button className='btn-add' type="submit">Thêm</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên học sinh</th>
            <th>Tuổi</th>
            <th>Điểm</th>
            <th>Lớp</th>
            <th>Giáo viên</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => {
            const classInfo = classes.find((cls) => cls.id === student.classId);
            return (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>
                  {editIndex === index ? (
                    <input value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                  ) : (
                    student.name
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input value={editData.age} onChange={(e) => setEditData({ ...editData, age: e.target.value })} />
                  ) : (
                    student.age
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input value={editData.score} onChange={(e) => setEditData({ ...editData, score: e.target.value })} />
                  ) : (
                    student.score
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <select value={editData.classId} onChange={(e) => setEditData({ ...editData, classId: parseInt(e.target.value) })}>
                      {classes.map((cls) => <option key={cls.id} value={cls.id}>{cls.name}</option>)}
                    </select>
                  ) : (
                    classInfo?.name || "Unknown"
                  )}
                </td>
                <td>{classInfo?.teacher || "Unknown"}</td>
                <td className='btn-group'>
                  {editIndex === index ? (
                    <button onClick={() => { onEdit("student", index, { ...student, ...editData }); setEditIndex(null); }}>Lưu</button>
                  ) : (
                    <button onClick={() => {
                      setEditIndex(index);
                      setEditData({
                        name: student.name,
                        age: student.age,
                        score: student.score,
                        classId: student.classId
                      });
                    }}>Sửa</button>
                  )}
                  <button onClick={() => onDelete("student", index)}>Xoá</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
