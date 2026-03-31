import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const categories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Health', 'Other'];

const ExpenseForm = ({ onSubmit, editingExpense, onCancelEdit }) => {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: categories[0],
        date: new Date().toISOString().split('T')[0],
        type: 'expense'
    });

    useEffect(() => {
        if (editingExpense) {
            setFormData({
                title: editingExpense.title || '',
                amount: editingExpense.amount || '',
                category: editingExpense.category || categories[0],
                date: new Date(editingExpense.date).toISOString().split('T')[0],
                type: editingExpense.type || 'expense'
            });
        }
    }, [editingExpense]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.amount) {
            toast.error('Please fill out all required fields');
            return;
        }

        onSubmit({
            ...formData,
            amount: Number(formData.amount),
        });

        if (!editingExpense) {
            setFormData({
                title: '',
                amount: '',
                category: categories[0],
                date: new Date().toISOString().split('T')[0],
                type: 'expense'
            });
        }
    };

    const isEditingAddedMoney = formData.type === 'added_money';

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md">
            <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700 pb-4">
                {editingExpense ? (isEditingAddedMoney ? 'Edit Money Added' : 'Edit Expense') : 'Add New Expense'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:text-gray-100 placeholder-gray-400 outline-none transition-all duration-200"
                        placeholder="e.g. Lunch"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount (₹)</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        min="1"
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:text-gray-100 placeholder-gray-400 outline-none transition-all duration-200"
                        placeholder="0.00"
                    />
                </div>

                {!isEditingAddedMoney && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:text-gray-100 outline-none transition-all duration-200"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:text-gray-100 outline-none transition-all duration-200"
                        style={{ colorScheme: 'dark light' }}
                    />
                </div>

                <div className="pt-4 flex gap-3">
                    <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all active:scale-95 duration-200"
                    >
                        {editingExpense ? 'Update Entry' : 'Add Expense'}
                    </button>

                    {editingExpense && (
                        <button
                            type="button"
                            onClick={() => {
                                onCancelEdit();
                                setFormData({
                                    title: '',
                                    amount: '',
                                    category: categories[0],
                                    date: new Date().toISOString().split('T')[0],
                                    type: 'expense'
                                });
                            }}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-2.5 px-4 rounded-xl transition-all active:scale-95 duration-200"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ExpenseForm;
