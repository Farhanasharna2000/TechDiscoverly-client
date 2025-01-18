import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from './../../../hooks/useAxiosSecure';
import LoadingSpinner from './../../LoadingSpinner';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Statistics = () => {
  const axiosSecure = UseAxiosSecure();
  const {
    data: stats = {},
    isLoading,
  } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const { data } = await axiosSecure('/stats');
      return data;
    },
  });

  const { users = 0, reviews = 0, totalProducts = 0 } = stats;

  if (isLoading) return <LoadingSpinner />;

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const pieChartData = [
    { name: 'Users', value: users },
    { name: 'Reviews', value: reviews },
    { name: 'Total Products', value: totalProducts },
  ];

  return (
    <div className="container mx-auto md:pt-12 pt-3 md:px-5">
      <div className="stats text-center w-full mx-auto bg-gray-50 shadow">
        <div className="stat">
          <div className="stat-figure text-primary">
            <img src="https://img.icons8.com/?size=100&id=TPdSVOWCsXJx&format=png&color=000000" alt="" />
          </div>
          <div className="stat-title text-[#8D0B41] font-bold md:text-3xl">Total Reviews</div>
          <div className="stat-value text-primary">{reviews}</div>
          <div className="stat-desc">31% more than last month</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <img src="https://img.icons8.com/?size=100&id=13023&format=png&color=000000" alt="" />
          </div>
          <div className="stat-title text-[#8D0B41] font-bold md:text-3xl">Total Products</div>
          <div className="stat-value text-secondary">{totalProducts}</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar online">
              <img src="https://img.icons8.com/?size=100&id=117505&format=png&color=000000" alt="" />
            </div>
          </div>
          <div className="stat-title text-[#8D0B41] font-bold md:text-3xl">Total Users</div>
          <div className="stat-value text-primary">{users}</div>
          <div className="stat-desc">Users registered till now</div>
        </div>
      </div>
      <div>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistics;
