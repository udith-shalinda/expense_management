'use client';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@/hooks/useQuery';
import { withAuth } from '@/hoc/withAuth/withAuth';
import { API_ROUTES } from '@/utils/constants';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { IType } from '@/store/types';

export type TGroupedByType = {
  groupedExpenses: {
    _id: string;
    type: IType;
    percentage: string;
    totalAmount: number;
  }[];
  totalAmount: number;
};

Chart.register(ArcElement, Tooltip, Legend);

const DashboardPage = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString().split('T')[0],
  );
  const [isShowPopup, setIsShowPopup] = useState(false);

  const { data, loading, retry } = useQuery<TGroupedByType>({
    notFetchOnLoad: true,
    url: API_ROUTES.EXPENSES.GROUPED_SUM_BY_TYPE.replace('[startDate]', startDate).replace(
      '[endDate]',
      endDate,
    ),
  });

  const generateRandomColors = (numColors: number) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      colors.push(color);
    }
    return colors;
  };

  const totalPercentage = useMemo(() => {
    return data?.totalAmount && data?.totalAmount > 0 ? data?.totalAmount / 100 : 0;
  }, [data]);

  useEffect(() => {
    if (data) {
      const expenseTypes =
        (data as TGroupedByType)?.groupedExpenses.map((expense) => expense.type.name) ?? [];
      const percentages =
        (data as TGroupedByType)?.groupedExpenses.map((expense) =>
          parseFloat(expense.percentage),
        ) ?? [];
      const colors = generateRandomColors(expenseTypes.length);

      setChartData({
        labels: expenseTypes as string[],
        datasets: [
          {
            data: percentages,
            backgroundColor: colors,
            hoverBackgroundColor: colors,
          },
        ],
      });
    }

    if (totalPercentage >= 90) {
      setIsShowPopup(true);
    }

    setTimeout(() => {
      closePopup();
    }, 5000);
  }, [data]);

  useEffect(() => {
    if (startDate && endDate) {
      const timeOut = setTimeout(() => {
        retry();
      }, 1000);

      return () => {
        timeOut && clearTimeout(timeOut);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  const closePopup = () => {
    setIsShowPopup(false);
  };

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-center text-lg font-semibold mb-4'>Expense Breakdown</h2>
      {isShowPopup && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div
            className={`bg-white p-4 rounded shadow-md relative border-red-500
            border-l-4`}
          >
            <p className={`text-lg font-semibold text-orange-500`}>
              {`Total expenses reached ${totalPercentage.toLocaleString()}%`}
            </p>
            <button
              onClick={closePopup}
              className='absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none'
            >
              &#x2715;
            </button>
          </div>
        </div>
      )}
      <div className='flex justify-center space-x-4 mb-4'>
        <div>
          <label htmlFor='startDate' className='block text-sm font-medium text-gray-700'>
            Start Date
          </label>
          <input
            type='date'
            id='startDate'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>

        <div>
          <label htmlFor='endDate' className='block text-sm font-medium text-gray-700'>
            End Date
          </label>
          <input
            type='date'
            id='endDate'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
      </div>
      {loading ? (
        <p>Loading chart...</p>
      ) : !chartData ? (
        <p>No Data found for the selected date range...</p>
      ) : (
        <div className='w-2/3 m-auto'>
          <Pie
            data={chartData}
            options={{
              plugins: {
                legend: {
                  display: true,
                  position: 'right',
                },
                tooltip: {
                  callbacks: {
                    label: function (tooltipItem) {
                      return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                    },
                  },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default withAuth(DashboardPage);
