import React, { useState, useEffect } from 'react';
import api from '../api';
import toast from 'react-hot-toast';
import SummaryCards from '../components/SummaryCards';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import ExpenseChart from '../components/ExpenseChart';



const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [editingExpense, setEditingExpense] = useState(null);

    const fetchExpenses = async () => {
        try {
            const { data } = await api.get(`/getExpenses`);
            setExpenses(data);
        } catch (error) {
            toast.error('Failed to fetch expenses');
            console.error(error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleAddExpense = async (expense) => {
        try {
            if (editingExpense) {
                // Update
                const { data } = await api.put(`/updateExpense/${editingExpense._id}`, expense);
                setExpenses(expenses.map((e) => (e._id === editingExpense._id ? data : e)));
                toast.success('Expense updated successfully');
                setEditingExpense(null);
            } else {
                // Add
                const { data } = await api.post(`/addExpense`, expense);
                setExpenses([data, ...expenses]);
                toast.success('Expense added successfully');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleDeleteExpense = async (id) => {
        if (window.confirm('Are you sure you want to delete this expense?')) {
            try {
                await api.delete(`/deleteExpense/${id}`);
                setExpenses(expenses.filter((e) => e._id !== id));
                toast.success('Expense deleted gracefully');
            } catch (error) {
                toast.error('Failed to delete expense');
            }
        }
    };

    return (
        <div className="space-y-8">
            <SummaryCards expenses={expenses} onAddMoney={handleAddExpense} />
            <ExpenseChart expenses={expenses} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 fade-in">
                    <ExpenseForm
                        onSubmit={handleAddExpense}
                        editingExpense={editingExpense}
                        onCancelEdit={() => setEditingExpense(null)}
                    />
                </div>
                <div className="lg:col-span-2 fade-in">
                    <ExpenseTable
                        expenses={expenses}
                        onEdit={setEditingExpense}
                        onDelete={handleDeleteExpense}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
