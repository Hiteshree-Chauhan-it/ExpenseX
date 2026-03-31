import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#64748b'];

const ExpenseChart = ({ expenses }) => {
    // Process data for Pie Chart (Category-wise)
    const categoryData = expenses.reduce((acc, expense) => {
        if (expense.type === 'added_money') return acc;
        
        const existingCategory = acc.find(item => item.name === expense.category);
        if (existingCategory) {
            existingCategory.value += expense.amount;
        } else {
            acc.push({ name: expense.category, value: expense.amount });
        }
        return acc;
    }, []);

    // Process data for Bar Chart (Expenses over time / daily)
    const dateDataMap = expenses.reduce((acc, expense) => {
        if (expense.type === 'added_money') return acc;
        
        const formattedDate = new Date(expense.date).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric'
        });
        if (acc[formattedDate]) {
            acc[formattedDate] += expense.amount;
        } else {
            acc[formattedDate] = expense.amount;
        }
        return acc;
    }, {});

    const dateData = Object.keys(dateDataMap)
        .map(date => ({ date, amount: dateDataMap[date] }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (expenses.length === 0 || categoryData.length === 0) {
        return null;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Pie Chart: Category wise */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">Expenses by Category</h3>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <RechartsTooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Bar Chart: Expenses over time */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">Expenses Over Time</h3>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dateData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" opacity={0.3} />
                            <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val}`} />
                            <RechartsTooltip
                                cursor={{ fill: '#cbd5e1', opacity: 0.2 }}
                                formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']}
                                labelStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                            />
                            <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ExpenseChart;
