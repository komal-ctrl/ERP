const StudentSidebar = () => {
  const menu = ["Dashboard", "My Profile", "Attendance", "Courses", "Exams", "Fees"];
  return (
    <aside className="w-64 bg-green-900 text-white hidden md:block">
      <div className="p-6 text-2xl font-bold border-b border-green-800">Student Panel</div>
      <nav className="p-4 space-y-3">
        {menu.map((item, i) => (
          <a key={i} href="#" className="block px-3 py-2 rounded hover:bg-green-700">{item}</a>
        ))}
      </nav>
    </aside>
  );
};
export default StudentSidebar;
