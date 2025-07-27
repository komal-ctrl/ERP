const AdminSidebar = () => {
  const menu = ["Dashboard", "Students", "Faculty", "Courses", "Attendance", "Fees", "Reports"];
  return (
    <aside className="w-64 bg-indigo-900 text-white hidden md:block">
      <div className="p-6 text-2xl font-bold border-b border-indigo-700">Admin Panel</div>
      <nav className="p-4 space-y-3">
        {menu.map((item, i) => (
          <a key={i} href="#" className="block px-3 py-2 rounded hover:bg-indigo-700">{item}</a>
        ))}
      </nav>
    </aside>
  );
};
export default AdminSidebar;
