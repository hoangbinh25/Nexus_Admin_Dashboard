import { Users, FileText, Files } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/admin/StatCard";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const areaData = [
  { month: "Jul", value: 2000 },
  { month: "Aug", value: 1800 },
  { month: "Sep", value: 2500 },
  { month: "Oct", value: 9500 },
  { month: "Nov", value: 6000 },
  { month: "Dec", value: 4500 },
  { month: "Jan", value: 5200 },
];

const pieData = [
  { name: "Electronics", value: 124, color: "hsl(239, 84%, 67%)" },
  { name: "Accessories", value: 56, color: "hsl(142, 71%, 45%)" },
  { name: "Audio", value: 89, color: "hsl(38, 92%, 50%)" },
];

export default function Overview() {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Dashboard Overview"
        description="System management and detailed overview."
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Platform Users"
          value={4}
          icon={Users}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatCard
          title="Published Pages"
          value={1}
          icon={FileText}
          trend={{ value: 4.3, isPositive: true }}
        />
        <StatCard
          title="Stored Documents"
          value={2}
          icon={Files}
          trend={{ value: 1.2, isPositive: false }}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Chart */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground">Platform Growth</h3>
            <p className="text-sm text-muted-foreground">
              User engagement and activity trends over the last 7 months.
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(239, 84%, 67%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(239, 84%, 67%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(220, 13%, 91%)",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(239, 84%, 67%)"
                strokeWidth={3}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground">Category Split</h3>
            <p className="text-sm text-muted-foreground">
              Distribution of products across main categories.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center -mt-[120px] mb-16">
              <p className="text-3xl font-bold text-foreground">3</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Items</p>
            </div>
            <div className="space-y-3 w-full mt-4">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
