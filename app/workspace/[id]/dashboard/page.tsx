// "use client";

// import { use, useEffect, useState } from "react";
// import StatsCard from "@/components/dashboard/StatsCard";
// import TaskChart from "@/components/dashboard/TaskChart";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Loader2 } from "lucide-react";

// export default function WorkspaceDashboard({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = use(params);
//   const [stats, setStats] = useState<any>(null);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await fetch(`/api/workspaces/${id}/stats`); 
//         const data = await res.json();
//         setStats(data);
//       } catch (error) {
//         console.error("Failed to fetch stats", error);
//       }
//     };

//     fetchStats();
//   }, [id]);

//   if (!stats) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <Loader2 className="animate-spin text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-semibold text-slate-900">Workspace Insights</h1>
//         <p className="text-sm text-muted-foreground">Track productivity</p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <StatsCard title="Total Tasks" value={stats.totalTasks} />
//         <StatsCard title="Completed" value={stats.completedTasks} />
//         <StatsCard title="Pending" value={stats.pendingTasks} />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader><CardTitle>Task Distribution</CardTitle></CardHeader>
//           <CardContent className="flex justify-center">
//             <TaskChart completed={stats.completedTasks} pending={stats.pendingTasks} />
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader><CardTitle>Completion Rate</CardTitle></CardHeader>
//           <CardContent className="flex items-center justify-center h-40">
//             <div className="text-5xl font-bold text-primary">{stats.completionRate}%</div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

"use client";

import { use, useEffect, useState } from "react";
import StatsCard from "@/components/dashboard/StatsCard";
import TaskChart from "@/components/dashboard/TaskChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function WorkspaceDashboard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [stats, setStats] = useState<any>(null);
  const [workspace, setWorkspace] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, workspaceRes] = await Promise.all([
          fetch(`/api/workspaces/${id}/stats`),   
          fetch(`/api/workspaces/${id}`),         
        ]);

        const statsData = await statsRes.json();
        const workspaceData = await workspaceRes.json();

        setStats(statsData);
        setWorkspace(workspaceData.data); 
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };

    fetchData();
  }, [id]);

  if (!stats || !workspace) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

     
      <Link
        href={`/workspace/${id}`}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-black"
      >
        <ArrowLeft size={16} />
        Back to Workspace
      </Link>

      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          {workspace.name} Insights
        </h1>
        <p className="text-sm text-muted-foreground">
          Owner: {workspace.createdBy?.name || "Unknown"}
        </p>
      </div>

    
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard title="Total Tasks" value={stats.totalTasks} />
        <StatsCard title="Completed" value={stats.completedTasks} />
        <StatsCard title="Pending" value={stats.pendingTasks} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Task Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <TaskChart
              completed={stats.completedTasks}
              pending={stats.pendingTasks}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completion Rate</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-40">
            <div className="text-5xl font-bold text-primary">
              {stats.completionRate}%
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}