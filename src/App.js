import { useState, useEffect } from 'react';
import './index.css';

const dataClass = [
  { id: 1, name: "Math 101", teacher: "Mr. Smith" },
  { id: 2, name: "English 202", teacher: "Ms. Johnson" },
  { id: 3, name: "Physics 303", teacher: "Dr. Brown" },
  { id: 4, name: "Chemistry 404", teacher: "Ms. Davis" },
];

const dataStudent = [
  { id: 1, name: "Alice", classId: 1, age: 18, score: 8.2 },
  { id: 2, name: "Bob", classId: 2, age: 19, score: 7.5 },
  { id: 3, name: "Charlie", classId: 3, age: 18, score: 6.8 },
  { id: 4, name: "David", classId: 4, age: 20, score: 8.0 },
  { id: 5, name: "Eve", classId: 1, age: 18, score: 9.1 },
  { id: 6, name: "Frank", classId: 2, age: 19, score: 7.0 },
  { id: 7, name: "Grace", classId: 3, age: 21, score: 8.5 },
  { id: 8, name: "Hannah", classId: 4, age: 20, score: 6.4 },
  { id: 9, name: "Isaac", classId: 1, age: 18, score: 7.2 },
  { id: 10, name: "Jack", classId: 2, age: 19, score: 8.8 },
];

function App() {
  const [classes, setClasses] = useState(() => JSON.parse(localStorage.getItem("classes")) || dataClass);
  const [students, setStudents] = useState(() => JSON.parse(localStorage.getItem("students")) || dataStudent);
  const [sortAsc, setSortAsc] = useState(true);
  const [searchedStudent, setSearchedStudent] = useState('');
  const [searchedClass, setSearchedClass] = useState('');
  const [topStudents, setTopStudents] = useState([]);

  useEffect(() => {
    localStorage.setItem("classes", JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const handleAdd = (type, data) => {
    if (type === "class") {
      const newId = Math.max(0, ...classes.map(c => c.id)) + 1;
      setClasses([...classes, { ...data, id: newId }]);
    } else if (type === "student") {
      const newId = Math.max(0, ...students.map(s => s.id)) + 1;
      setStudents([...students, { ...data, id: newId }]);
    }
  };

  const handleEdit = (type, index, data) => {
    const updated = type === "class" ? [...classes] : [...students];
    updated[index] = data;
    type === "class" ? setClasses(updated) : setStudents(updated);
  };

  const handleDelete = (type, index) => {
    const updated = type === "class" ? [...classes] : [...students];
    updated.splice(index, 1);
    type === "class" ? setClasses(updated) : setStudents(updated);
  };

  const handleSort = () => {
    const sorted = [...students].sort((a, b) => sortAsc ? a.score - b.score : b.score - a.score);
    setSortAsc(!sortAsc);
    setStudents(sorted);
  };

  const handleBestStudents = () => {
    if (topStudents.length > 0) setTopStudents([]);
    else setTopStudents([...students].sort((a, b) => b.score - a.score).slice(0, 3));
  };

  const filteredStudents = students.filter(s => s.name.toLowerCase().includes(searchedStudent.toLowerCase()));
  const filteredClasses = classes.filter(c => c.name.toLowerCase().includes(searchedClass.toLowerCase()));

  return (
    <div>
      <h2>Danh sách lớp học</h2>
      <div className="controls-wrapper">
        <SearchClass searched={searchedClass} setSearched={setSearchedClass} />
      </div>
      <ClassList {...{ classes: filteredClasses, handleAdd, handleEdit, handleDelete }} />

      <h2>Danh sách học sinh</h2>
      <div className="controls-wrapper">
        <div style={{ flexGrow: 1 }}>
          <SortScore {...{ handleSort, sortAsc }} /> 
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <SearchStudent {...{ searched: searchedStudent, setSearched: setSearchedStudent }} />
         <BestStudents {...{ topStudents, handleBestStudents }} />
        </div>
      </div>
      <StudentList
        students={topStudents.length > 0 ? topStudents : filteredStudents}
        {...{ classes, handleAdd, handleEdit, handleDelete }}
      />
    </div>
  );
}

function ClassList({ classes, handleAdd, handleEdit, handleDelete }) {
  const [newClass, setNewClass] = useState({ name: "", teacher: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({ name: "", teacher: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd("class", newClass);
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
                  <button onClick={() => { handleEdit("class", index, { ...cls, ...editData }); setEditIndex(null); }}>Lưu</button>
                ) : (
                  <button onClick={() => { setEditIndex(index); setEditData({ name: cls.name, teacher: cls.teacher }); }}>Sửa</button>
                )}
                <button onClick={() => handleDelete("class", index)}>Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function StudentList({ students, classes, handleAdd, handleEdit, handleDelete }) {
  const [newStudent, setNewStudent] = useState({ name: "", age: "", score: "", classId: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({ name: "", age: "", score: "", classId: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, age, score, classId } = newStudent;
    if (!name || !age || !score || !classId) return;

    handleAdd("student", {
      ...newStudent,
      age: parseInt(age),
      score: parseFloat(score),
      classId: parseInt(classId)
    });
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
                    <button type="button" onClick={() => {
                      handleEdit("student", index, { ...student, ...editData });
                      setEditIndex(null);
                    }}>Lưu</button>
                  ) : (
                    <button type="button" onClick={() => {
                      setEditIndex(index);
                      setEditData({
                        name: student.name,
                        age: student.age,
                        score: student.score,
                        classId: student.classId
                      });
                    }}>Sửa</button>
                  )}
                  <button type="button" onClick={() => handleDelete("student", index)}>Xoá</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}


function BestStudents({ topStudents, handleBestStudents }) {
  return (
    <button onClick={handleBestStudents} className="btn-add">
      {topStudents.length > 0 ? "Hiện tất cả học sinh" : "3 học sinh có điểm cao nhất"}
    </button>
  );
}

function SortScore({ handleSort, sortAsc }) {
  return (
    <button onClick={handleSort} className="btn-add">
      Sắp xếp theo điểm {sortAsc ? '↑' : '↓'}
    </button>
  );
}

function SearchStudent({ searched, setSearched }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Tìm học sinh"
        value={searched}
        onChange={(e) => setSearched(e.target.value)}
      />
    </div>
  );
}

function SearchClass({ searched, setSearched }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Tìm lớp học"
        value={searched}
        onChange={(e) => setSearched(e.target.value)}
      />
    </div>
  );
}

export default App;
