import react from "react";
import { useState } from "react";

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
  { id: 11, name: "PE 101", teacher: "Coach Lee" },
  { id: 12, name: "Literature", teacher: "Mrs. Harris" },
  { id: 13, name: "Philosophy", teacher: "Dr. Clark" },
  { id: 14, name: "Economics", teacher: "Mr. Lewis" },
  { id: 15, name: "Psychology", teacher: "Dr. Young" },
  { id: 16, name: "Sociology", teacher: "Ms. Hall" },
  { id: 17, name: "Business", teacher: "Mr. Allen" },
  { id: 18, name: "Law", teacher: "Mrs. King" },
  { id: 19, name: "Statistics", teacher: "Dr. Wright" },
  { id: 20, name: "Environmental Science", teacher: "Ms. Scott" }
];

const dataStudent = [
  { id: 1, name: "Alice", classId: 1 },
  { id: 2, name: "Bob", classId: 2 },
  { id: 3, name: "Charlie", classId: 3 },
  { id: 4, name: "David", classId: 4 },
  { id: 5, name: "Eve", classId: 5 },
  { id: 6, name: "Frank", classId: 6 },
  { id: 7, name: "Grace", classId: 7 },
  { id: 8, name: "Hannah", classId: 8 },
  { id: 9, name: "Isaac", classId: 9 },
  { id: 10, name: "Jack", classId: 10 },
  { id: 11, name: "Karen", classId: 11 },
  { id: 12, name: "Leo", classId: 12 },
  { id: 13, name: "Mia", classId: 13 },
  { id: 14, name: "Nathan", classId: 14 },
  { id: 15, name: "Olivia", classId: 15 },
  { id: 16, name: "Paul", classId: 16 },
  { id: 17, name: "Quinn", classId: 17 },
  { id: 18, name: "Rachel", classId: 18 },
  { id: 19, name: "Sam", classId: 19 },
  { id: 20, name: "Tina", classId: 20 }
];

function App() {
  return (
    <h1>Danh sách lớp học</h1>
    <ClassList/>
    <h2>Danh sách học sinh</h2>
    <StudentList/>
  )
}

function ClassList(){

}
function StudentList(){

}

export default App;
