export function getDueLabelAndStyle(dueDate: string, status: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  const diffDays = Math.ceil(
    (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (status === "DONE") {
    return { label: `Due in ${diffDays} days`, style: "bg-gray-100 text-gray-500" };
  }

  if (diffDays < 0) {
    return { label: `Overdue by ${Math.abs(diffDays)} days`, style: "bg-red-100 text-red-600" };
  }

  if (diffDays === 0) {
    return { label: "Due today", style: "bg-yellow-100 text-yellow-600" };
  }

  if (diffDays === 1) {
    return { label: "Due tomorrow", style: "bg-yellow-100 text-yellow-600" };
  }

  return { label: `Due in ${diffDays} days`, style: "bg-gray-100 text-gray-700" };
}