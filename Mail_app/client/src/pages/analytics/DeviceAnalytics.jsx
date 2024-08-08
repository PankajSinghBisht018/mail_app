import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { API_URL } from '@/services/helper';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '@/components/ThemeProvider';

const fetchEmailOpenStats = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/api/email-open-stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching email open stats:', error);
    return [];
  }
};

const DeviceAnalytics = () => {
  const [data, setData] = useState([]);
  const { getToken } = useAuth();
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStats = async () => {
      const token = await getToken();
      const stats = await fetchEmailOpenStats(token);
      setData(stats);
      setLoading(false);
    };

    getStats();
  }, [getToken]);

  const chartConfig = {
    count: {
      label: 'Email Opens',
      color: isDarkTheme ? 'blue' : 'orange', 
    },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Helmet>
        <title>Device Analytics</title>
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/666/666162.png" type="image/png" />
      </Helmet>
      <Card className={`relative z-10 w-full max-w-4xl ${isDarkTheme ? 'bg-[#111827]' : 'bg-white'} rounded-lg shadow-lg`}>
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center mb-8">Device Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className={`bg-${isDarkTheme ? 'bg-[#111827]' : 'bg-white'}`}
          >
            {loading ? (
              <Skeleton className="h-[400px] w-full bg-gray-400" />
            ) : (
              <AreaChart
                data={data.map(stat => ({
                  date: stat._id, 
                  count: stat.count
                }))}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value} 
                />
                <YAxis 
                  label={{ value: 'Counts of Email Opens', angle: -90, position: 'insideLeft' }}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <defs>
                  <linearGradient id="fillColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartConfig.count.color} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={chartConfig.count.color} stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="count"
                  type="monotone"
                  fill="url(#fillColor)"
                  stroke={chartConfig.count.color}
                  stackId="a"
                />
              </AreaChart>
            )}
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                Email Opened by Date <TrendingUp className="h-4 w-4" />
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DeviceAnalytics;
